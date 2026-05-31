import { Routes } from '@angular/router';
import { ProjectsListPageComponent } from './pages/projects-list.page';
import { ProjectDetailPageComponent } from './pages/project-detail.page';

export const projectsRoutes: Routes = [
  {
    path: '',
    component: ProjectsListPageComponent,
  },
  {
    path: ':repoName',
    component: ProjectDetailPageComponent,
  },
];
