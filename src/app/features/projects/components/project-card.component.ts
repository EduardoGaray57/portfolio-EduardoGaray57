import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GitHubRepo } from '../../../core/models';

const LANGUAGE_CLASSES: Record<string, string> = {
  TypeScript: 'bg-blue-100 text-blue-800',
  JavaScript: 'bg-yellow-100 text-yellow-800',
  Python: 'bg-green-100 text-green-800',
  HTML: 'bg-orange-100 text-orange-800',
  CSS: 'bg-purple-100 text-purple-800',
  Go: 'bg-cyan-100 text-cyan-800',
  Rust: 'bg-red-100 text-red-800',
  Java: 'bg-amber-100 text-amber-800',
  Ruby: 'bg-rose-100 text-rose-800',
  Shell: 'bg-gray-100 text-gray-800',
  Dockerfile: 'bg-sky-100 text-sky-800',
  Kotlin: 'bg-violet-100 text-violet-800',
  C: 'bg-stone-100 text-stone-800',
  'C++': 'bg-pink-100 text-pink-800',
  Dart: 'bg-teal-100 text-teal-800',
};

function languageClass(language: string | null): string {
  if (!language) return 'bg-gray-100 text-gray-500';
  return LANGUAGE_CLASSES[language] ?? 'bg-gray-100 text-gray-700';
}

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [RouterLink],
  template: `
    <a
      [routerLink]="'/proyectos/' + repo().name"
      class="group block rounded-xl border border-gray-200 bg-white p-6 transition-all duration-200 hover:shadow-lg hover:border-blue-200 hover:-translate-y-0.5"
    >
      <!-- Header: Name + Fork badge -->
      <div class="flex items-start justify-between gap-2 mb-3">
        <h3 class="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors truncate">
          {{ repo().name }}
        </h3>
        @if (repo().fork) {
          <span class="shrink-0 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7v8m0 0l4-4m-4 4l-4-4m8-4V5m0 0l4 4m-4-4l-4 4" />
            </svg>
            Fork
          </span>
        }
      </div>

      <!-- Description -->
      <p class="text-sm text-gray-600 line-clamp-2 mb-4 min-h-[2.5rem]">
        {{ repo().description || 'Sin descripción' }}
      </p>

      <!-- Footer: Language + Stars + Forks -->
      <div class="flex items-center gap-4 text-sm">
        @if (repo().language; as lang) {
          <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium" [class]="languageClass(lang)">
            <span class="w-1.5 h-1.5 rounded-full bg-current"></span>
            {{ lang }}
          </span>
        }

        <span class="inline-flex items-center gap-1 text-gray-500" title="Estrellas">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
          {{ repo().stargazers_count }}
        </span>

        <span class="inline-flex items-center gap-1 text-gray-500" title="Forks">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7v8m0 0l4-4m-4 4l-4-4m8-4V5m0 0l4 4m-4-4l-4 4" />
          </svg>
          {{ repo().forks_count }}
        </span>
      </div>
    </a>
  `,
  styles: [`
    :host { display: block; }
  `],
})
export class ProjectCardComponent {
  readonly repo = input.required<GitHubRepo>();
  protected readonly languageClass = languageClass;
}
