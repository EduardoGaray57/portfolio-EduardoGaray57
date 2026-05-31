import { Component, inject, computed } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { DatePipe } from '@angular/common';
import { ProjectsService } from '../../../core/services/projects.service';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { ErrorStateComponent } from '../../../shared/components/error-state/error-state.component';

@Component({
  selector: 'app-project-detail-page',
  standalone: true,
  imports: [RouterLink, DatePipe, LoadingSpinnerComponent, ErrorStateComponent],
  template: `
    @if (projects.loading()) {
      <div class="py-20">
        <app-loading-spinner message="Cargando proyecto..." />
      </div>
    } @else if (projects.error(); as err) {
      <app-error-state title="Error al cargar el proyecto" [message]="err" />
    } @else if (projects.loaded()) {
      @if (repo(); as r) {
        <article class="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <!-- Back button -->
          <a
            routerLink="/proyectos"
            class="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors mb-8"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Volver a proyectos
          </a>

          <!-- Title + external link -->
          <div class="flex items-start justify-between gap-4 mb-6">
            <h1 class="text-3xl sm:text-4xl font-bold text-gray-900 break-all">
              {{ r.name }}
            </h1>
            <a
              [href]="r.html_url"
              target="_blank"
              rel="noopener noreferrer"
              class="shrink-0 inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Ver en GitHub
            </a>
          </div>

          <!-- Fork badge -->
          @if (r.fork) {
            <div class="mb-4">
              <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7v8m0 0l4-4m-4 4l-4-4m8-4V5m0 0l4 4m-4-4l-4 4" />
                </svg>
                Fork — Este repositorio es un fork de otro proyecto
              </span>
            </div>
          }

          <!-- Description -->
          @if (r.description; as desc) {
            <p class="text-lg text-gray-700 leading-relaxed mb-8">
              {{ desc }}
            </p>
          }

          <!-- Metadata grid -->
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
            @if (r.language; as lang) {
              <div class="bg-gray-50 rounded-lg p-4">
                <p class="text-xs text-gray-500 uppercase tracking-wider mb-1">Lenguaje</p>
                <p class="font-semibold text-gray-900 flex items-center gap-2">
                  <span class="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                  {{ lang }}
                </p>
              </div>
            }

            <div class="bg-gray-50 rounded-lg p-4">
              <p class="text-xs text-gray-500 uppercase tracking-wider mb-1">Estrellas</p>
              <p class="font-semibold text-gray-900">{{ r.stargazers_count }}</p>
            </div>

            <div class="bg-gray-50 rounded-lg p-4">
              <p class="text-xs text-gray-500 uppercase tracking-wider mb-1">Forks</p>
              <p class="font-semibold text-gray-900">{{ r.forks_count }}</p>
            </div>

            @if (r.license; as lic) {
              <div class="bg-gray-50 rounded-lg p-4">
                <p class="text-xs text-gray-500 uppercase tracking-wider mb-1">Licencia</p>
                <p class="font-semibold text-gray-900">{{ lic.name }}</p>
              </div>
            }

            <div class="bg-gray-50 rounded-lg p-4">
              <p class="text-xs text-gray-500 uppercase tracking-wider mb-1">Actualizado</p>
              <p class="font-semibold text-gray-900 text-sm">{{ r.updated_at | date:'mediumDate' }}</p>
            </div>

            <div class="bg-gray-50 rounded-lg p-4">
              <p class="text-xs text-gray-500 uppercase tracking-wider mb-1">Creado</p>
              <p class="font-semibold text-gray-900 text-sm">{{ r.created_at | date:'mediumDate' }}</p>
            </div>
          </div>

          <!-- Topics / Tags -->
          @if (r.topics.length > 0) {
            <div class="mb-8">
              <h2 class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Tags</h2>
              <div class="flex flex-wrap gap-2">
                @for (topic of r.topics; track topic) {
                  <span class="px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                    {{ topic }}
                  </span>
                }
              </div>
            </div>
          }

          <!-- Homepage -->
          @if (r.homepage; as url) {
            <div class="mb-8">
              <h2 class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Sitio web</h2>
              <a
                [href]="url"
                target="_blank"
                rel="noopener noreferrer"
                class="text-blue-600 hover:text-blue-800 hover:underline break-all"
              >
                {{ url }}
              </a>
            </div>
          }
        </article>
      } @else {
        <!-- 404: Repo not found -->
        <div class="min-h-[60vh] flex items-center justify-center px-4">
          <div class="text-center max-w-md">
            <h1 class="text-6xl font-bold text-gray-200">404</h1>
            <h2 class="mt-4 text-xl font-semibold text-gray-900">Proyecto no encontrado</h2>
            <p class="mt-2 text-gray-500">
              El repositorio "{{ repoName() }}" no existe o no está disponible.
            </p>
            <a
              routerLink="/proyectos"
              class="mt-8 inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Volver a proyectos
            </a>
          </div>
        </div>
      }
    }
  `,
  styles: [`
    :host { display: block; }
  `],
})
export class ProjectDetailPageComponent {
  private route = inject(ActivatedRoute);
  private projectsService = inject(ProjectsService);

  protected readonly projects = this.projectsService;
  protected readonly repoName = toSignal(
    this.route.paramMap.pipe(map((params) => params.get('repoName') ?? '')),
    { initialValue: '' },
  );

  protected readonly repo = computed(() =>
    this.projectsService.getRepoByName(this.repoName()),
  );
}
