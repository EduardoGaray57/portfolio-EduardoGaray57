import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { ProjectsService } from './projects.service';
import { LocalStorageService } from './local-storage.service';
import type { GitHubRepo } from '../models';

describe('ProjectsService', () => {
  let httpMock: HttpTestingController;
  let storage: LocalStorageService;

  const mockRepo: GitHubRepo = {
    id: 1,
    name: 'test-repo',
    full_name: 'EduardoGaray57/test-repo',
    html_url: 'https://github.com/EduardoGaray57/test-repo',
    description: 'A test repository',
    language: 'TypeScript',
    stargazers_count: 5,
    forks_count: 2,
    fork: false,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-06-01T00:00:00Z',
    pushed_at: '2024-06-01T00:00:00Z',
    homepage: null,
    topics: ['angular', 'testing'],
    license: { key: 'mit', name: 'MIT' },
  };

  const mockRepo2: GitHubRepo = {
    ...mockRepo,
    id: 2,
    name: 'another-repo',
    stargazers_count: 10,
    description: 'Another repo',
  };

  beforeEach(() => {
    localStorage.clear();
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), ProjectsService],
    });
    httpMock = TestBed.inject(HttpTestingController);
    storage = TestBed.inject(LocalStorageService);
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  function createService(): ProjectsService {
    return TestBed.inject(ProjectsService);
  }

  it('should be created', () => {
    const service = createService();
    httpMock.expectOne('assets/data/projects.json');
    expect(service).toBeTruthy();
  });

  it('should load from HTTP when cache is empty', () => {
    const service = createService();
    expect(service.loading()).toBe(true);
    const req = httpMock.expectOne('assets/data/projects.json');
    expect(req.request.method).toBe('GET');
    req.flush({ lastFetched: '2024-06-01T00:00:00Z', repos: [mockRepo] });
    expect(service.loading()).toBe(false);
    expect(service.loaded()).toBe(true);
    expect(service.repos().length).toBe(1);
    expect(service.repos()[0].name).toBe('test-repo');
    expect(service.repoCount()).toBe(1);
  });

  it('should use cached data when available (skip HTTP)', () => {
    storage.set('github-projects-cache', {
      lastFetched: new Date().toISOString(),
      repos: [mockRepo, mockRepo2],
    });
    const service = createService();
    httpMock.expectNone('assets/data/projects.json');
    expect(service.loaded()).toBe(true);
    expect(service.repos().length).toBe(2);
    expect(service.error()).toBeNull();
  });

  it('should fall back to HTTP when cache exists but is empty', () => {
    storage.set('github-projects-cache', {
      lastFetched: new Date().toISOString(),
      repos: [],
    });
    const service = createService();
    expect(service.loading()).toBe(true);
    const req = httpMock.expectOne('assets/data/projects.json');
    req.flush({ lastFetched: '2024-06-01T00:00:00Z', repos: [mockRepo] });
    expect(service.repos().length).toBe(1);
  });

  it('should preserve input order from build-time JSON (no sort on load)', () => {
    const service = createService();
    const req = httpMock.expectOne('assets/data/projects.json');
    req.flush({
      lastFetched: '2024-06-01T00:00:00Z',
      repos: [mockRepo2, mockRepo], // 10 stars first, 5 stars second
    });
    // load() does NOT sort repos — order should match the JSON
    expect(service.repos()[0].stargazers_count).toBe(10);
    expect(service.repos()[1].stargazers_count).toBe(5);
  });

  it('should handle HTTP error', () => {
    const service = createService();
    const req = httpMock.expectOne('assets/data/projects.json');
    req.error(new ProgressEvent('Network error'), {
      status: 0,
      statusText: 'Unknown Error',
    });
    expect(service.loading()).toBe(false);
    expect(service.error()).toBeTruthy();
    expect(service.repos()).toEqual([]);
  });

  it('should find repo by name', () => {
    const service = createService();
    httpMock.expectOne('assets/data/projects.json').flush({
      lastFetched: '2024-06-01T00:00:00Z',
      repos: [mockRepo, mockRepo2],
    });
    const found = service.getRepoByName('test-repo');
    expect(found).toBeTruthy();
    expect(found!.name).toBe('test-repo');
    const notFound = service.getRepoByName('nonexistent');
    expect(notFound).toBeUndefined();
  });

  it('should refresh from GitHub API', () => {
    const service = createService();
    httpMock.expectOne('assets/data/projects.json').flush({
      lastFetched: '2024-06-01T00:00:00Z',
      repos: [],
    });
    service.refreshFromApi();
    const apiReq = httpMock.expectOne(
      'https://api.github.com/users/EduardoGaray57/repos?per_page=30&sort=updated',
    );
    expect(apiReq.request.method).toBe('GET');
    apiReq.flush([
      {
        id: 10,
        name: 'api-repo',
        full_name: 'EduardoGaray57/api-repo',
        html_url: 'https://github.com/EduardoGaray57/api-repo',
        description: 'Fetched from API',
        language: 'Python',
        stargazers_count: 42,
        forks_count: 7,
        fork: false,
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-06-01T00:00:00Z',
        pushed_at: '2024-06-01T00:00:00Z',
        homepage: null,
        topics: [],
        license: { key: 'mit', name: 'MIT' },
      },
    ]);
    expect(service.repos().length).toBe(1);
    expect(service.repos()[0].name).toBe('api-repo');
    expect(service.error()).toBeNull();
  });

  it('should handle refresh API error', () => {
    const service = createService();
    httpMock.expectOne('assets/data/projects.json').flush({
      lastFetched: '2024-06-01T00:00:00Z',
      repos: [],
    });
    service.refreshFromApi();
    const apiReq = httpMock.expectOne(
      'https://api.github.com/users/EduardoGaray57/repos?per_page=30&sort=updated',
    );
    apiReq.error(new ProgressEvent('Rate limit'), {
      status: 403,
      statusText: 'Forbidden',
    });
    expect(service.loading()).toBe(false);
    expect(service.error()).toBeTruthy();
    expect(service.repos()).toEqual([]);
  });

  it('should handle empty repo list', () => {
    const service = createService();
    const req = httpMock.expectOne('assets/data/projects.json');
    req.flush({ lastFetched: '2024-06-01T00:00:00Z', repos: [] });
    expect(service.loaded()).toBe(true);
    expect(service.repos()).toEqual([]);
    expect(service.repoCount()).toBe(0);
  });
});
