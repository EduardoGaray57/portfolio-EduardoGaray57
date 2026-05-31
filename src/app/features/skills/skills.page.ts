import { Component, inject } from '@angular/core';
import { SkillsService } from '../../core/services/skills.service';
import { SectionHeadingComponent } from '../../shared/components/section-heading/section-heading.component';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';
import { ErrorStateComponent } from '../../shared/components/error-state/error-state.component';
import { SkillCategoryComponent } from './components/skill-category.component';

@Component({
  selector: 'app-skills-page',
  standalone: true,
  imports: [
    SectionHeadingComponent,
    LoadingSpinnerComponent,
    ErrorStateComponent,
    SkillCategoryComponent,
  ],
  template: `
    <section class="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <app-section-heading
        title="Habilidades"
        subtitle="Tecnologías y herramientas con las que trabajo"
      />

      @if (skills.loading()) {
        <app-loading-spinner message="Cargando habilidades..." />
      } @else if (skills.error(); as err) {
        <app-error-state title="Error al cargar habilidades" [message]="err" />
      } @else if (skills.loaded()) {
        @if (skills.categories().length > 0) {
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            @for (cat of skills.categories(); track cat.id) {
              <app-skill-category [category]="cat" />
            }
          </div>
        } @else {
          <div class="text-center py-16">
            <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto h-12 w-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            <p class="mt-4 text-gray-500">No hay habilidades registradas</p>
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
export class SkillsPageComponent {
  protected readonly skills = inject(SkillsService);
}
