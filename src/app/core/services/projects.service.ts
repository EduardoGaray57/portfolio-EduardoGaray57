import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GitHubRepo, ProjectsData, DataState } from '../models';
import { LocalStorageService } from './local-storage.service';

const CACHE_KEY = 'github-projects-cache';

@Injectable({ providedIn: 'root' })
export class ProjectsService {
  private http = inject(HttpClient);
  private storage = inject(LocalStorageService);

  private state = signal<DataState<GitHubRepo[]>>({
    data: null,
    state: 'idle',
    error: null,
  });

  /** Sorted repos (by stars descending). */
  readonly repos = computed(() => this.state().data ?? []);
  readonly loading = computed(() => this.state().state === 'loading');
  readonly loaded = computed(() => this.state().state === 'success');
  readonly error = computed(() => this.state().error);
  readonly repoCount = computed(() => this.repos().length);

  constructor() {
    this.load();
  }

  /** Load projects: localStorage cache first, then build-time JSON fallback. */
  load(): void {
    // Try cache first (24h TTL)
    const cached = this.storage.get<ProjectsData>(CACHE_KEY);
    if (cached?.repos && cached.repos.length > 0) {
      this.state.set({ data: cached.repos, state: 'success', error: null });
      return;
    }

    // Fallback to build-time JSON
    this.state.set({ data: null, state: 'loading', error: null });
    this.http.get<ProjectsData>('assets/data/projects.json').subscribe({
      next: (data) => {
        this.storage.set(CACHE_KEY, data);
        this.state.set({ data: data.repos, state: 'success', error: null });
      },
      error: (err) =>
        this.state.set({
          data: null,
          state: 'error',
          error: err.message ?? 'No se pudieron cargar los proyectos',
        }),
    });
  }

  /** Find a single repo by its name. */
  getRepoByName(name: string): GitHubRepo | undefined {
    return this.repos().find((r) => r.name === name);
  }

  /** Force-refresh from GitHub API (unauthenticated, subject to rate limits). */
  refreshFromApi(): void {
    this.state.set({ data: null, state: 'loading', error: null });

    const headers: Record<string, string> = {
      Accept: 'application/vnd.github.v3+json',
    };

    this.http
      .get<any[]>('https://api.github.com/users/EduardoGaray57/repos?per_page=30&sort=updated')
      .subscribe({
        next: (raw) => {
          const mapped: GitHubRepo[] = raw.map((r) => ({
            id: r.id,
            name: r.name,
            full_name: r.full_name,
            html_url: r.html_url,
            description: r.description,
            language: r.language,
            stargazers_count: r.stargazers_count,
            forks_count: r.forks_count,
            fork: r.fork,
            created_at: r.created_at,
            updated_at: r.updated_at,
            pushed_at: r.pushed_at,
            homepage: r.homepage,
            topics: r.topics ?? [],
            license: r.license
              ? { key: r.license.key, name: r.license.spdx_id || r.license.name }
              : null,
          }));

          mapped.sort((a, b) => b.stargazers_count - a.stargazers_count);

          const data: ProjectsData = {
            lastFetched: new Date().toISOString(),
            repos: mapped,
          };

          this.storage.set(CACHE_KEY, data);
          this.state.set({ data: mapped, state: 'success', error: null });
        },
        error: (err) =>
          this.state.set({
            data: null,
            state: 'error',
            error: err.message ?? 'Error al conectar con GitHub',
          }),
      });
  }
}
