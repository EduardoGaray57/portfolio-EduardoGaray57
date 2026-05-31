# Deploy Guide — Eduardo Garay Portfolio

## Option 1: Cloudflare Pages Dashboard (recommended)

1. Go to [Cloudflare Pages](https://pages.cloudflare.com/) → Create a project
2. Connect your GitHub repository
3. Configure build settings:
   - **Build command**: `npm run build`
   - **Build output directory**: `dist/portfolio/browser`
   - **Environment variables** (optional):
     - `NODE_VERSION`: `22`
4. Deploy — Cloudflare auto-deploys on each push to the main branch.

## Option 2: CLI via Wrangler

Prerequisites: `wrangler.toml` at project root (already created).

```bash
# Install wrangler globally or use npx
npx wrangler pages deploy dist/portfolio/browser
```

You'll need to authenticate with Cloudflare first (`npx wrangler login`).

## Build Locally

```bash
npm install
npm run build    # or: ng build --configuration production
```

Output goes to `dist/portfolio/browser/`.

## Environment Variables

| Variable | Purpose |
|----------|---------|
| `GITHUB_TOKEN` | Increases GitHub API rate limit for prebuild fetch (optional) |

Set these in the Cloudflare Pages dashboard under your project → Settings → Environment variables.

## Post-Deploy Checklist

- [ ] All routes prerendered: `/`, `/about`, `/experiencia`, `/habilidades`, `/proyectos`, `/contacto`
- [ ] 404 page works for unknown routes
- [ ] Mobile responsive
- [ ] Social preview cards render (OG meta tags)
- [ ] Custom domain (if configured) has valid SSL
