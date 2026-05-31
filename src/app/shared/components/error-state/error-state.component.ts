import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-error-state',
  standalone: true,
  template: `
    <div class="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div class="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
      </div>
      <h3 class="text-lg font-semibold text-gray-900 mb-1">
        {{ title() }}
      </h3>
      @if (message(); as msg) {
        <p class="text-sm text-gray-500 mb-4 max-w-md">{{ msg }}</p>
      }
      @if (showRetry()) {
        <button
          (click)="retry.emit()"
          class="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
        >
          Intentar de nuevo
        </button>
      }
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `],
})
export class ErrorStateComponent {
  readonly title = input('Algo salió mal');
  readonly message = input<string>();
  readonly showRetry = input(false);
  readonly retry = output<void>();
}
