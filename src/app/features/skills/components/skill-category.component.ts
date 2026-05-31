import { Component, input } from '@angular/core';
import { SkillBadgeComponent } from '../../../shared/components/skill-badge/skill-badge.component';
import { SkillCategory } from '../../../core/models';

/** Map category IDs to consistent Tailwind color schemes. */
const CATEGORY_COLORS: Record<string, string> = {
  languages: 'bg-blue-100 text-blue-700',
  frameworks: 'bg-green-100 text-green-700',
  databases: 'bg-purple-100 text-purple-700',
  apis: 'bg-orange-100 text-orange-700',
  devops: 'bg-teal-100 text-teal-700',
  methodologies: 'bg-pink-100 text-pink-700',
};

function resolveColor(category: SkillCategory): string {
  return CATEGORY_COLORS[category.id] ?? 'bg-gray-100 text-gray-700';
}

@Component({
  selector: 'app-skill-category',
  standalone: true,
  imports: [SkillBadgeComponent],
  template: `
    <div class="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">
        {{ category().label }}
      </h3>

      @if (category().skills.length > 0) {
        <div class="flex flex-wrap gap-2">
          @for (skill of category().skills; track skill) {
            <app-skill-badge [name]="skill" [colorClass]="color" />
          }
        </div>
      }
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `],
})
export class SkillCategoryComponent {
  readonly category = input.required<SkillCategory>();

  protected get color(): string {
    return resolveColor(this.category());
  }
}
