import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProjectsService } from '../../core/services/projects.service';

@Component({
  selector: 'app-hero-page',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="relative min-h-screen flex items-center justify-center overflow-hidden">
      <!-- Gradient Background -->
      <div class="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50"></div>

      <!-- Decorative gradient blobs -->
      <div class="absolute top-1/4 -left-32 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl"></div>
      <div class="absolute bottom-1/4 -right-32 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl"></div>

      <!-- Content -->
      <div class="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
          Eduardo Marcelo<br />
          <span class="text-blue-600">Garay Aguayo</span>
        </h1>

        <p class="mt-6 text-xl sm:text-2xl text-gray-600 font-light">
          Ingeniero Civil en Computación e Informática
        </p>

        <p class="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
          Fullstack Developer · Python & Django · React & Angular
        </p>

        <!-- CTA Buttons -->
        <div class="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            routerLink="/proyectos"
            class="inline-flex items-center px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/25"
          >
            Ver Proyectos
            <svg xmlns="http://www.w3.org/2000/svg" class="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>

          <a
            routerLink="/contacto"
            class="inline-flex items-center px-8 py-3 border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-colors"
          >
            Contacto
          </a>
        </div>

        <!-- GitHub Stats Strip -->
        @if (projects.loaded() && projects.repoCount() > 0) {
          <div class="mt-12 inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gray-900/5 backdrop-blur-sm border border-gray-200">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
            </svg>
            <span class="text-sm text-gray-700">
              <strong class="font-semibold">{{ projects.repoCount() }}</strong> repositorios en GitHub
            </span>
            <a routerLink="/proyectos" class="text-sm text-blue-600 hover:text-blue-800 font-medium hover:underline ml-2">
              Ver todos →
            </a>
          </div>
        }
      </div>

      <!-- Scroll indicator -->
      <div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  `,
  styles: [`
    :host {
      display: block;
    }
  `],
})
export class HeroPageComponent {
  protected readonly projects = inject(ProjectsService);
}
