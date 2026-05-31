import { Component, inject } from '@angular/core';
import { ProjectsService } from '../../../core/services/projects.service';
import { SectionHeadingComponent } from '../../../shared/components/section-heading/section-heading.component';
import { ErrorStateComponent } from '../../../shared/components/error-state/error-state.component';
import { ProjectCardComponent } from '../components/project-card.component';

@Component({
  selector: 'app-projects-list-page',
  standalone: true,
  imports: [
    SectionHeadingComponent,
    ErrorStateComponent,
    ProjectCardComponent,
  ],
  template: `
    <section class="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <app-section-heading
        title="Proyectos"
        subtitle="Mis proyectos de código abierto en GitHub"
      />

      @if (projects.loading()) {
        <!-- Loading skeleton grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          @for (_ of skeletonItems; track $index) {
            <div class="rounded-xl border border-gray-200 bg-white p-6 animate-pulse">
              <div class="h-5 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div class="space-y-2 mb-6">
                <div class="h-3 bg-gray-200 rounded w-full"></div>
                <div class="h-3 bg-gray-200 rounded w-5/6"></div>
              </div>
              <div class="flex gap-3">
                <div class="h-5 bg-gray-200 rounded-full w-16"></div>
                <div class="h-5 bg-gray-200 rounded w-12"></div>
                <div class="h-5 bg-gray-200 rounded w-12"></div>
              </div>
            </div>
          }
        </div>
      } @else if (projects.error(); as err) {
        <app-error-state
          title="No se pudieron cargar los proyectos"
          [message]="err"
          [showRetry]="true"
          (retry)="projects.load()"
        />
      } @else if (projects.loaded()) {
        @if (projects.repos().length > 0) {
          <!-- Sort info -->
          <p class="text-sm text-gray-500 mb-6 text-center">
            {{ projects.repoCount() }} repositorios · ordenados por estrellas
          </p>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            @for (repo of projects.repos(); track repo.id) {
              <app-project-card [repo]="repo" />
            }
          </div>
        } @else {
          <!-- Empty state -->
          <div class="text-center py-16">
            <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto h-16 w-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
            </svg>
            <p class="mt-4 text-lg text-gray-500">No hay proyectos disponibles</p>
            <p class="mt-1 text-sm text-gray-400">Los proyectos aparecerán aquí cuando estén disponibles.</p>
          </div>
        }
      }
    </section>
  `,
  styles: [`
    :host { display: block; }
  `],
})
export class ProjectsListPageComponent {
  protected readonly projects = inject(ProjectsService);
  protected readonly skeletonItems = Array.from({ length: 6 });
}
