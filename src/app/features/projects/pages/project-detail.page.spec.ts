import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideLocationMocks } from '@angular/common/testing';
import { computed } from '@angular/core';
import { ProjectDetailPageComponent } from './project-detail.page';
import { ProjectsService } from '../../../core/services/projects.service';
import { GitHubRepo } from '../../../core/models';
import { NO_ERRORS_SCHEMA } from '@angular/core';

const mockRepo: GitHubRepo = {
  id: 1,
  name: 'test-repo',
  full_name: 'user/test-repo',
  html_url: 'https://github.com/user/test-repo',
  description: 'A detailed test repository',
  language: 'TypeScript',
  stargazers_count: 42,
  forks_count: 7,
  fork: false,
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-06-15T00:00:00Z',
  pushed_at: '2024-06-15T00:00:00Z',
  homepage: 'https://example.com',
  topics: ['angular', 'testing', 'portfolio'],
  license: { key: 'mit', name: 'MIT License' },
};

function createMockService(overrides?: {
  repos?: GitHubRepo[];
  loading?: boolean;
  loaded?: boolean;
  error?: string | null;
}) {
  const state = {
    repos: [mockRepo],
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

describe('ProjectDetailPageComponent', () => {
  let fixture: ComponentFixture<ProjectDetailPageComponent>;

  function createComponent(mockService: ProjectsService) {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [ProjectDetailPageComponent],
      providers: [
        provideRouter([]),
        provideLocationMocks(),
        { provide: ProjectsService, useValue: mockService },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    });
    fixture = TestBed.createComponent(ProjectDetailPageComponent);
    fixture.detectChanges();
  }

  it('should create', () => {
    createComponent(createMockService());
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should show loading spinner when loading', () => {
    createComponent(createMockService({ loading: true, loaded: false }));
    expect(fixture.nativeElement.textContent).toContain('Cargando proyecto...');
  });

  it('should show error state on error', () => {
    createComponent(createMockService({ error: 'Fetch error' }));
    expect(fixture.nativeElement.textContent).toContain('Error al cargar el proyecto');
  });

  it('should show 404 when repo not found', () => {
    createComponent(createMockService({ repos: [] }));
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Proyecto no encontrado');
    expect(fixture.nativeElement.textContent).toContain('Volver a proyectos');
  });

  it('should show 404 with empty repo name when no route param is set', () => {
    createComponent(createMockService());
    fixture.detectChanges();
    // Without navigating to a specific route, repoName is empty, so no repo matches
    expect(fixture.nativeElement.textContent).toContain('Proyecto no encontrado');
  });
});
