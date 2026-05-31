import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found-page',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="min-h-[70vh] flex items-center justify-center px-4">
      <div class="text-center max-w-md">
        <h1 class="text-8xl font-bold text-gray-200">404</h1>
        <h2 class="mt-4 text-2xl font-semibold text-gray-900">
          Página no encontrada
        </h2>
        <p class="mt-2 text-gray-500">
          La página que buscas no existe o ha sido movida.
        </p>
        <a
          routerLink="/"
          class="mt-8 inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Volver al Inicio
        </a>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `],
})
export class NotFoundPageComponent {}
