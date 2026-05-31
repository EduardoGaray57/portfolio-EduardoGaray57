import { Component, input } from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  template: `
    <div class="flex items-center justify-center" [class]="'py-' + sizeClass()">
      <div
        class="border-current border-t-transparent rounded-full animate-spin"
        [class]="spinnerClass()"
        role="status"
        aria-label="Cargando"
      ></div>
      @if (message(); as msg) {
        <span class="ml-3 text-sm text-gray-500">{{ msg }}</span>
      }
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `],
})
export class LoadingSpinnerComponent {
  readonly size = input<'sm' | 'md' | 'lg'>('md');
  readonly message = input<string>();

  protected sizeClass(): string {
    switch (this.size()) {
      case 'sm': return '8';
      case 'md': return '12';
      case 'lg': return '20';
    }
  }

  protected spinnerClass(): string {
    switch (this.size()) {
      case 'sm': return 'h-5 w-5 border-2';
      case 'md': return 'h-8 w-8 border-2';
      case 'lg': return 'h-12 w-12 border-3';
    }
  }
}
