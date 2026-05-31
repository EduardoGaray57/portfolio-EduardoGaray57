import { Component, input } from '@angular/core';

@Component({
  selector: 'app-section-heading',
  standalone: true,
  template: `
    <div class="text-center mb-12">
      <h2 class="text-3xl sm:text-4xl font-bold text-gray-900">
        {{ title() }}
      </h2>
      @if (subtitle(); as sub) {
        <p class="mt-3 text-lg text-gray-600 max-w-2xl mx-auto">
          {{ sub }}
        </p>
      }
      <div class="mt-4 mx-auto w-16 h-1 bg-blue-600 rounded-full"></div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `],
})
export class SectionHeadingComponent {
  readonly title = input.required<string>();
  readonly subtitle = input<string>();
}
