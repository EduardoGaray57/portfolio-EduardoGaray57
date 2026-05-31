import { Component, input } from '@angular/core';
import { ExperienceEntry } from '../../../core/models';

/**
 * Formats a date string (YYYY-MM or YYYY) to a Spanish locale label.
 * e.g. "2024-03" → "Mar 2024", "2017" → "2017"
 */
function formatDate(dateStr: string | null): string {
  if (!dateStr) return 'Presente';

  const months: Record<string, string> = {
    '01': 'Ene', '02': 'Feb', '03': 'Mar', '04': 'Abr',
    '05': 'May', '06': 'Jun', '07': 'Jul', '08': 'Ago',
    '09': 'Sep', '10': 'Oct', '11': 'Nov', '12': 'Dic',
  };

  if (/^\d{4}-\d{2}$/.test(dateStr)) {
    const [year, month] = dateStr.split('-');
    return `${months[month] ?? month} ${year}`;
  }

  return dateStr; // just year or raw
}

@Component({
  selector: 'app-timeline',
  standalone: true,
  template: `
    <div class="space-y-0">
        @for (item of entries(); track item.id; let last = $last) {
          <div class="flex gap-4 md:gap-6">
            <!-- Timeline column: dot + connector line -->
            <div class="flex flex-col items-center">
              <div
                class="w-4 h-4 rounded-full border-2 z-10 mt-1 ring-4 ring-white flex-shrink-0"
                [class]="item.type === 'work' ? 'bg-blue-500 border-blue-500' : 'bg-emerald-500 border-emerald-500'"
              ></div>
              @if (!last) {
                <div class="w-0.5 flex-1 min-h-8 bg-gray-200"></div>
              }
            </div>

            <!-- Content -->
            <div class="flex-1 pb-8 min-w-0">
              <div class="bg-white rounded-xl border border-gray-200 p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow">
              <!-- Header -->
              <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                <div>
                  <h3 class="text-lg font-semibold text-gray-900">
                    {{ item.type === 'work' ? item.role : item.degree }}
                  </h3>
                  <p class="text-blue-600 font-medium text-sm mt-0.5">
                    {{ item.type === 'work' ? item.organization : item.institution }}
                  </p>
                </div>
                <time class="text-sm text-gray-500 whitespace-nowrap flex-shrink-0">
                  {{ formatDateRange(item.startDate, item.endDate) }}
                </time>
              </div>

              <!-- Description bullets -->
              @if (item.description.length > 0) {
                <ul class="space-y-2">
                  @for (point of item.description; track point) {
                    <li class="text-sm text-gray-600 leading-relaxed flex gap-2.5 items-baseline">
                      <span class="text-blue-500 flex-shrink-0 select-none">•</span>
                      <span>{{ point }}</span>
                    </li>
                  }
                </ul>
              }

              <!-- Highlights -->
              @if (item.highlights && item.highlights.length > 0) {
                <div class="mt-3 flex flex-wrap gap-2">
                  @for (h of item.highlights; track h) {
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
                      {{ h }}
                    </span>
                  }
                </div>
              }
            </div>
            </div>
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
export class TimelineComponent {
  readonly entries = input.required<ExperienceEntry[]>();

  protected formatDateRange(start: string | null, end: string | null): string {
    return `${formatDate(start)} – ${formatDate(end)}`;
  }
}
