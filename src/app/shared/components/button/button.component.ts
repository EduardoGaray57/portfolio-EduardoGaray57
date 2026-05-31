import { Component, input } from '@angular/core';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';

@Component({
  selector: 'app-button',
  standalone: true,
  template: `
    <button
      [attr.disabled]="disabled() ? true : null"
      class="inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
      [class]="variantClass()"
    >
      <ng-content />
    </button>
  `,
  styles: [`
    :host {
      display: inline-block;
    }
  `],
})
export class ButtonComponent {
  readonly variant = input<ButtonVariant>('primary');
  readonly disabled = input(false);

  protected variantClass(): string {
    switch (this.variant()) {
      case 'primary':
        return 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500';
      case 'secondary':
        return 'bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-400';
      case 'ghost':
        return 'bg-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:ring-gray-400';
    }
  }
}
