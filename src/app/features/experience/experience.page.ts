import { Component, inject } from '@angular/core';
import { ExperienceService } from '../../core/services/experience.service';
import { SectionHeadingComponent } from '../../shared/components/section-heading/section-heading.component';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';
import { ErrorStateComponent } from '../../shared/components/error-state/error-state.component';
import { TimelineComponent } from './components/timeline.component';

@Component({
  selector: 'app-experience-page',
  standalone: true,
  imports: [
    SectionHeadingComponent,
    LoadingSpinnerComponent,
    ErrorStateComponent,
    TimelineComponent,
  ],
  template: `
    <section class="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <app-section-heading
        title="Experiencia"
        subtitle="Mi trayectoria profesional y formación académica"
      />

      @if (experience.loading()) {
        <app-loading-spinner message="Cargando experiencia..." />
      } @else if (experience.error(); as err) {
        <app-error-state title="Error al cargar experiencia" [message]="err" />
      } @else if (experience.loaded()) {
        <!-- Work Experience -->
        @if (experience.workEntries().length > 0) {
          <div class="mb-16">
            <h3 class="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Experiencia Laboral
            </h3>
            <app-timeline [entries]="experience.workEntries()" />
          </div>
        }

        <!-- Education -->
        @if (experience.educationEntries().length > 0) {
          <div>
            <h3 class="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M12 14l9-5-9-5-9 5 9 5z" />
                <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
              </svg>
              Formación Académica
            </h3>
            <app-timeline [entries]="experience.educationEntries()" />
          </div>
        }

        <!-- Empty state -->
        @if (experience.workEntries().length === 0 && experience.educationEntries().length === 0) {
          <div class="text-center py-16">
            <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto h-12 w-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <p class="mt-4 text-gray-500">No hay experiencia registrada</p>
          </div>
        }
      }
    </section>
  `,
  styles: [`
    :host {
      display: block;
    }
  `],
})
export class ExperiencePageComponent {
  protected readonly experience = inject(ExperienceService);
}
