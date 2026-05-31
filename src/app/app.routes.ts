import { Routes } from '@angular/router';
import { HeroPageComponent } from './features/hero/hero.page';
import { NotFoundPageComponent } from './features/not-found/not-found.page';

export const routes: Routes = [
  {
    path: '',
    component: HeroPageComponent,
  },
  {
    path: 'about',
    loadChildren: () => import('./features/about/about.routes').then((m) => m.aboutRoutes),
  },
  {
    path: 'experiencia',
    loadChildren: () => import('./features/experience/experience.routes').then((m) => m.experienceRoutes),
  },
  {
    path: 'habilidades',
    loadChildren: () => import('./features/skills/skills.routes').then((m) => m.skillsRoutes),
  },
  {
    path: 'proyectos',
    loadChildren: () => import('./features/projects/projects.routes').then((m) => m.projectsRoutes),
  },
  {
    path: 'contacto',
    loadChildren: () => import('./features/contact/contact.routes').then((m) => m.contactRoutes),
  },
  {
    path: '**',
    component: NotFoundPageComponent,
  },
];
