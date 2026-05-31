import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProfileService } from '../../core/services/profile.service';
import { SectionHeadingComponent } from '../../shared/components/section-heading/section-heading.component';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';
import { ErrorStateComponent } from '../../shared/components/error-state/error-state.component';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [
    FormsModule,
    SectionHeadingComponent,
    LoadingSpinnerComponent,
    ErrorStateComponent,
  ],
  template: `
    <section class="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <app-section-heading
        title="Contacto"
        subtitle="Ponte en contacto conmigo"
      />

      @if (profile.loading()) {
        <app-loading-spinner message="Cargando información de contacto..." />
      } @else if (profile.error(); as err) {
        <app-error-state title="Error al cargar contacto" [message]="err" />
      } @else if (profile.data(); as p) {
        <div class="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          <!-- Contact Info -->
          <div>
            <h2 class="text-xl font-semibold text-gray-900 mb-6">
              Información de Contacto
            </h2>

            <div class="space-y-5">
              <!-- Email -->
              <a
                [href]="'mailto:' + p.contacts.email"
                class="flex items-center gap-4 p-4 rounded-xl border border-gray-200 hover:border-blue-200 hover:bg-blue-50/50 transition-colors group"
              >
                <div class="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div class="min-w-0">
                  <p class="text-sm text-gray-500">Email</p>
                  <p class="text-gray-900 font-medium truncate">{{ p.contacts.email }}</p>
                </div>
              </a>

              <!-- Phone -->
              <a
                [href]="'tel:' + p.contacts.phone.replace(/\s/g, '')"
                class="flex items-center gap-4 p-4 rounded-xl border border-gray-200 hover:border-green-200 hover:bg-green-50/50 transition-colors group"
              >
                <div class="flex-shrink-0 w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center group-hover:bg-green-200 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div class="min-w-0">
                  <p class="text-sm text-gray-500">Teléfono</p>
                  <p class="text-gray-900 font-medium">{{ p.contacts.phone }}</p>
                </div>
              </a>

              <!-- Location -->
              <div class="flex items-center gap-4 p-4 rounded-xl border border-gray-200">
                <div class="flex-shrink-0 w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p class="text-sm text-gray-500">Ubicación</p>
                  <p class="text-gray-900 font-medium">{{ p.contacts.location }}</p>
                </div>
              </div>
            </div>

            <!-- Social Links -->
            <h2 class="text-xl font-semibold text-gray-900 mt-10 mb-4">
              Redes Sociales
            </h2>
            <div class="flex flex-wrap gap-3">
              <!-- LinkedIn -->
              <a
                [href]="p.contacts.linkedin"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-gray-200 hover:border-blue-200 hover:bg-blue-50/50 text-gray-700 hover:text-blue-700 transition-colors font-medium"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                LinkedIn
              </a>

              <!-- GitHub -->
              <a
                [href]="p.contacts.github"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-gray-200 hover:border-gray-400 hover:bg-gray-50 text-gray-700 hover:text-gray-900 transition-colors font-medium"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub
              </a>
            </div>
          </div>

          <!-- Contact Form -->
          <div>
            <h2 class="text-xl font-semibold text-gray-900 mb-6">
              Envíame un Mensaje
            </h2>

            <form
              #contactForm="ngForm"
              (ngSubmit)="onSubmit()"
              class="space-y-5"
            >
              <div>
                <label for="name" class="block text-sm font-medium text-gray-700 mb-1">
                  Nombre
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  minlength="2"
                  maxlength="100"
                  placeholder="Tu nombre"
                  [(ngModel)]="name"
                  class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-colors text-gray-900 placeholder-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                  [disabled]="status() === 'loading'"
                />
              </div>

              <div>
                <label for="email" class="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  email
                  maxlength="200"
                  placeholder="tu@email.com"
                  [(ngModel)]="email"
                  class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-colors text-gray-900 placeholder-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                  [disabled]="status() === 'loading'"
                />
              </div>

              <div>
                <label for="message" class="block text-sm font-medium text-gray-700 mb-1">
                  Mensaje
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  minlength="10"
                  maxlength="5000"
                  rows="5"
                  placeholder="Escribe tu mensaje aquí..."
                  [(ngModel)]="message"
                  class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-colors text-gray-900 placeholder-gray-400 resize-y min-h-[120px] disabled:opacity-50 disabled:cursor-not-allowed"
                  [disabled]="status() === 'loading'"
                ></textarea>
              </div>

              <!-- Submit button -->
              <button
                type="submit"
                [disabled]="status() === 'loading' || contactForm.invalid"
                class="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors shadow-lg shadow-blue-600/25 disabled:shadow-none"
              >
                @if (status() === 'loading') {
                  <svg class="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Enviando...
                } @else {
                  <svg xmlns="http://www.w3.org/2000/svg" class="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  Enviar Mensaje
                }
              </button>

              <!-- Success message -->
              @if (status() === 'success') {
                <div class="p-4 rounded-lg bg-green-50 border border-green-200 text-green-800 text-sm">
                  <p class="font-medium">✅ Mensaje enviado correctamente</p>
                  <p class="mt-1">Gracias por contactarme. Te responderé a la brevedad.</p>
                </div>
              }

              <!-- Error message -->
              @if (status() === 'error') {
                <div class="p-4 rounded-lg bg-red-50 border border-red-200 text-red-800 text-sm">
                  <p class="font-medium">❌ {{ errorMessage() }}</p>
                  <p class="mt-1">Podés escribirme directamente a
                    <a [href]="'mailto:' + p.contacts.email" class="underline font-medium">{{ p.contacts.email }}</a>
                  </p>
                </div>
              }
            </form>
          </div>
        </div>
      }
    </section>
  `,
  styles: [`
    :host {
      display: block;
    }
  `],
})
export class ContactPageComponent {
  protected readonly profile = inject(ProfileService);

  readonly name = signal('');
  readonly email = signal('');
  readonly message = signal('');
  readonly status = signal<'idle' | 'loading' | 'success' | 'error'>('idle');
  readonly errorMessage = signal('');

  async onSubmit(): Promise<void> {
    if (this.status() === 'loading') return;

    this.status.set('loading');
    this.errorMessage.set('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: this.name(),
          email: this.email(),
          message: this.message(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        this.errorMessage.set(data.error ?? 'Error al enviar el mensaje.');
        this.status.set('error');
        return;
      }

      this.status.set('success');
      this.name.set('');
      this.email.set('');
      this.message.set('');

      // Reset success message after 8 seconds
      setTimeout(() => {
        this.status.set('idle');
      }, 8000);
    } catch {
      this.errorMessage.set('Error de conexión. Verifica tu internet e intenta de nuevo.');
      this.status.set('error');
    }
  }
}
