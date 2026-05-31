interface Env {
  RESEND_API_KEY: string;
  CONTACT_EMAIL: string;
}

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

interface ContactBody {
  name?: string;
  email?: string;
  message?: string;
}

// Per-worker memory: rate limit by IP. Reset on deploy.
const rateLimit = new Map<string, RateLimitEntry>();
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const onRequest: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  // ── Allow POST only ──────────────────────────────────────────────
  if (request.method !== 'POST') {
    return json({ error: 'Method not allowed' }, 405);
  }

  // ── Rate limiting by connecting IP (Cloudflare edge) ─────────────
  const ip = request.headers.get('CF-Connecting-IP') ?? 'unknown';
  const now = Date.now();
  const entry = rateLimit.get(ip);

  if (entry && now < entry.resetAt) {
    entry.count++;
    if (entry.count > RATE_LIMIT_MAX) {
      return json({ error: 'Demasiadas solicitudes. Intenta de nuevo en un minuto.' }, 429);
    }
  } else {
    rateLimit.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
  }

  // ── Parse body ───────────────────────────────────────────────────
  let body: ContactBody;
  try {
    body = await request.json<ContactBody>();
  } catch {
    return json({ error: 'JSON inválido' }, 400);
  }

  // ── Validate fields ──────────────────────────────────────────────
  const name = body.name?.trim();
  const email = body.email?.trim().toLowerCase();
  const message = body.message?.trim();

  const errors: string[] = [];

  if (!name || name.length < 2) {
    errors.push('El nombre debe tener al menos 2 caracteres.');
  } else if (name.length > 100) {
    errors.push('El nombre no puede superar los 100 caracteres.');
  }

  if (!email || !EMAIL_REGEX.test(email)) {
    errors.push('El email no es válido.');
  } else if (email.length > 200) {
    errors.push('El email no puede superar los 200 caracteres.');
  }

  if (!message || message.length < 10) {
    errors.push('El mensaje debe tener al menos 10 caracteres.');
  } else if (message.length > 5000) {
    errors.push('El mensaje no puede superar los 5000 caracteres.');
  }

  if (errors.length > 0) {
    return json({ error: errors.join(' ') }, 400);
  }

  // ── Check environment configuration ──────────────────────────────
  if (!env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY is not configured');
    return json({ error: 'Error de configuración del servidor.' }, 500);
  }

  if (!env.CONTACT_EMAIL) {
    console.error('CONTACT_EMAIL is not configured');
    return json({ error: 'Error de configuración del servidor.' }, 500);
  }

  // ── Send email via Resend API ────────────────────────────────────
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Portfolio Contacto <onboarding@resend.dev>',
        to: env.CONTACT_EMAIL,
        replyTo: email,
        subject: `[Portfolio] Mensaje de ${name}`,
        html: `
          <h2>📩 Nuevo mensaje desde el portfolio</h2>
          <table style="border-collapse:collapse;width:100%;max-width:600px;font-family:sans-serif;">
            <tr>
              <td style="padding:8px 12px;background:#f3f4f6;font-weight:600;border:1px solid #d1d5db;">Nombre</td>
              <td style="padding:8px 12px;border:1px solid #d1d5db;">${escapeHtml(name)}</td>
            </tr>
            <tr>
              <td style="padding:8px 12px;background:#f3f4f6;font-weight:600;border:1px solid #d1d5db;">Email</td>
              <td style="padding:8px 12px;border:1px solid #d1d5db;">
                <a href="mailto:${escapeHtml(email!)}">${escapeHtml(email!)}</a>
              </td>
            </tr>
            <tr>
              <td style="padding:8px 12px;background:#f3f4f6;font-weight:600;border:1px solid #d1d5db;vertical-align:top;">Mensaje</td>
              <td style="padding:8px 12px;border:1px solid #d1d5db;white-space:pre-wrap;">${escapeHtml(message!)}</td>
            </tr>
          </table>
        `.trim(),
        text: [
          `Nuevo mensaje desde el portfolio`,
          `──────────────────────────────`,
          `Nombre:  ${name}`,
          `Email:   ${email}`,
          `──────────────────────────────`,
          `${message}`,
        ].join('\n'),
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error('Resend API error:', res.status, errText);
      return json({ error: 'Error al enviar el mensaje. Intenta de nuevo más tarde.' }, 500);
    }

    // Log the IP for audit (no PII beyond what's needed)
    console.info(`Contact message sent from IP: ${ip}`);

    return json({ success: true }, 200);
  } catch (err) {
    console.error('Resend connection error:', err);
    return json({ error: 'Error de conexión. Intenta de nuevo.' }, 500);
  }
};

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function json(data: unknown, status: number): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
