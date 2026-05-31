import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProfileService } from '../../core/services/profile.service';
import { SectionHeadingComponent } from '../../shared/components/section-heading/section-heading.component';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';
import { ErrorStateComponent } from '../../shared/components/error-state/error-state.component';

@Component({
  selector: 'app-about-page',
  standalone: true,
  imports: [
    RouterLink,
    SectionHeadingComponent,
    LoadingSpinnerComponent,
    ErrorStateComponent,
  ],
  template: `
    <section class="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <app-section-heading title="Sobre Mí" subtitle="Conoce mi perfil profesional" />

      @if (profile.loading()) {
        <app-loading-spinner message="Cargando perfil..." />
      } @else if (profile.error(); as err) {
        <app-error-state title="Error al cargar perfil" [message]="err" />
      } @else if (profile.data(); as p) {
        <div class="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
          <!-- Photo / Avatar placeholder -->
          <div class="flex-shrink-0 w-full md:w-64">
            <div class="aspect-square rounded-2xl bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
              <span class="text-5xl font-bold text-blue-600 select-none">
                {{ getInitials(p.fullName) }}
              </span>
            </div>
          </div>

          <!-- Info -->
          <div class="flex-1 min-w-0">
            <h1 class="text-3xl sm:text-4xl font-bold text-gray-900">
              {{ p.fullName }}
            </h1>
            <p class="mt-2 text-xl text-blue-600 font-medium">
              {{ p.title }}
            </p>

            <!-- Distinction badge -->
            @if (p.graduatedWithDistinction) {
              <div class="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-amber-50 text-amber-800 rounded-lg border border-amber-200 text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
                <span>
                  Titulado con <strong>Distinción</strong> · Nota {{ p.graduationNote }}
                </span>
              </div>
            }

            <!-- University -->
            <p class="mt-4 text-gray-500">
              <span class="font-medium text-gray-700">Universidad:</span>
              {{ p.university }}
            </p>

            <!-- Bio -->
            <div class="mt-6 prose prose-gray max-w-none">
              <p class="text-gray-700 leading-relaxed">
                {{ p.bio }}
              </p>
            </div>

            <!-- Actions -->
            <div class="mt-8 flex flex-col sm:flex-row gap-4">
              <a
                [href]="cvPath"
                download
                class="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/25"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Descargar CV
              </a>

              <a
                routerLink="/contacto"
                class="inline-flex items-center justify-center px-6 py-3 border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-colors"
              >
                Contactarme
              </a>
            </div>
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
export class AboutPageComponent {
  protected readonly profile = inject(ProfileService);
  protected readonly cvPath = 'assets/docs/CV_Eduardo_Garay.pdf';

  protected getInitials(fullName: string): string {
    return fullName
      .split(' ')
      .filter((_, i, arr) => i === 0 || i === arr.length - 1)
      .map((w) => w.charAt(0))
      .join('')
      .toUpperCase();
  }
}
