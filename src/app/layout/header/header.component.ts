import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

export interface NavLink {
  label: string;
  path: string;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header class="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <!-- Logo -->
          <a routerLink="/" class="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
            EG
          </a>

          <!-- Desktop Nav -->
          <nav class="hidden md:flex items-center gap-1">
            @for (link of navLinks; track link.path) {
              <a
                [routerLink]="link.path"
                routerLinkActive="text-blue-600 font-semibold"
                [routerLinkActiveOptions]="{ exact: link.path === '/' }"
                class="px-3 py-2 rounded-lg text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
              >
                {{ link.label }}
              </a>
            }
          </nav>

          <!-- Mobile Hamburger -->
          <button
            (click)="toggleMobileMenu()"
            class="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
            aria-label="Toggle navigation menu"
          >
            @if (!mobileMenuOpen()) {
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            } @else {
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            }
          </button>
        </div>

        <!-- Mobile Nav -->
        @if (mobileMenuOpen()) {
          <nav class="md:hidden pb-4 border-t border-gray-100 pt-2">
            @for (link of navLinks; track link.path) {
              <a
                [routerLink]="link.path"
                routerLinkActive="text-blue-600 font-semibold bg-blue-50"
                [routerLinkActiveOptions]="{ exact: link.path === '/' }"
                class="block px-3 py-2 rounded-lg text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                (click)="closeMobileMenu()"
              >
                {{ link.label }}
              </a>
            }
          </nav>
        }
      </div>
    </header>
  `,
  styles: [`
    :host {
      display: block;
    }
  `],
})
export class HeaderComponent {
  protected readonly mobileMenuOpen = signal(false);

  protected readonly navLinks: NavLink[] = [
    { label: 'Inicio', path: '/' },
    { label: 'Sobre Mí', path: '/about' },
    { label: 'Proyectos', path: '/proyectos' },
    { label: 'Experiencia', path: '/experiencia' },
    { label: 'Habilidades', path: '/habilidades' },
    { label: 'Contacto', path: '/contacto' },
  ];

  protected toggleMobileMenu(): void {
    this.mobileMenuOpen.update(open => !open);
  }

  protected closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
  }
}
