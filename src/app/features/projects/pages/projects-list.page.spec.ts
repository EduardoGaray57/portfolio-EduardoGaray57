import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { computed } from '@angular/core';
import { ProjectsListPageComponent } from './projects-list.page';
import { ProjectsService } from '../../../core/services/projects.service';
import { GitHubRepo } from '../../../core/models';
import { NO_ERRORS_SCHEMA } from '@angular/core';

const mockRepos: GitHubRepo[] = [
  {
    id: 1, name: 'repo-one', full_name: 'user/repo-one',
    html_url: 'https://github.com/user/repo-one', description: 'First repo',
    language: 'TypeScript', stargazers_count: 10, forks_count: 2,
    fork: false, created_at: '2024-01-01T00:00:00Z', updated_at: '2024-06-01T00:00:00Z',
    pushed_at: '2024-06-01T00:00:00Z', homepage: null, topics: [],
    license: null,
  },
  {
    id: 2, name: 'repo-two', full_name: 'user/repo-two',
    html_url: 'https://github.com/user/repo-two', description: 'Second repo',
    language: 'Python', stargazers_count: 5, forks_count: 1,
    fork: true, created_at: '2024-02-01T00:00:00Z', updated_at: '2024-06-01T00:00:00Z',
    pushed_at: '2024-06-01T00:00:00Z', homepage: null, topics: [],
    license: null,
  },
];

function createMockService(overrides?: {
  repos?: GitHubRepo[];
  loading?: boolean;
  loaded?: boolean;
  error?: string | null;
}) {
  const state = {
    repos: mockRepos,
    loading: false,
    loaded: true,
    error: null,
    ...overrides,
  };
  return {
    repos: computed(() => state.repos),
    loading: computed(() => state.loading),
    loaded: computed(() => state.loaded),
    error: computed(() => state.error),
    repoCount: computed(() => state.repos.length),
    getRepoByName: (name: string) => state.repos.find((r) => r.name === name),
    load: () => {},
    refreshFromApi: () => {},
  } as unknown as ProjectsService;
}

describe('ProjectsListPageComponent', () => {
  let fixture: ComponentFixture<ProjectsListPageComponent>;

  function createComponent(mockService: ProjectsService) {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [ProjectsListPageComponent],
      providers: [
        provideRouter([]),
        { provide: ProjectsService, useValue: mockService },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    });
    fixture = TestBed.createComponent(ProjectsListPageComponent);
    fixture.detectChanges();
  }

  it('should create', () => {
    createComponent(createMockService());
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should show skeleton loading when loading', () => {
    createComponent(createMockService({ loading: true, loaded: false }));
    const skeleton = fixture.nativeElement.querySelector('.animate-pulse');
    expect(skeleton).toBeTruthy();
  });

  it('should show error state on error', () => {
    createComponent(createMockService({ error: 'Failed to fetch' }));
    const el = fixture.nativeElement as HTMLElement;
    expect(el.textContent).toContain('No se pudieron cargar los proyectos');
  });

  it('should display repo count when loaded', () => {
    createComponent(createMockService());
    expect(fixture.nativeElement.textContent).toContain('2 repositorios');
  });

  it('should render project cards when repos exist', () => {
    createComponent(createMockService());
    expect(fixture.nativeElement.textContent).toContain('ordenados por estrellas');
    expect(fixture.componentInstance['projects'].repos().length).toBe(2);
  });

  it('should show empty state when no repos', () => {
    createComponent(createMockService({ repos: [] }));
    expect(fixture.nativeElement.textContent).toContain('No hay proyectos disponibles');
  });

  it('should have section heading', () => {
    createComponent(createMockService());
    expect(fixture.nativeElement.textContent).toContain('Proyectos');
  });

  it('should have 6 skeleton elements', () => {
    createComponent(createMockService({ loading: true, loaded: false }));
    const skeletons = fixture.nativeElement.querySelectorAll('.animate-pulse');
    expect(skeletons.length).toBe(6);
  });
});
