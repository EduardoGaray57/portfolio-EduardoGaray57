import { Component, input } from '@angular/core';

@Component({
  selector: 'app-skill-badge',
  standalone: true,
  template: `
    <span
      class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium transition-colors"
      [class]="colorClass()"
    >
      {{ name() }}
    </span>
  `,
  styles: [`
    :host {
      display: inline-block;
    }
  `],
})
export class SkillBadgeComponent {
  readonly name = input.required<string>();
  readonly colorClass = input('bg-blue-100 text-blue-700');
}
