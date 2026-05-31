import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ExperienceData, ExperienceEntry, DataState } from '../models';

@Injectable({ providedIn: 'root' })
export class ExperienceService {
  private http = inject(HttpClient);

  private state = signal<DataState<ExperienceData>>({
    data: null,
    state: 'idle',
    error: null,
  });

  readonly data = computed(() => this.state().data);
  readonly workEntries = computed(() => this.state().data?.work ?? []);
  readonly educationEntries = computed(() => this.state().data?.education ?? []);
  readonly loading = computed(() => this.state().state === 'loading');
  readonly loaded = computed(() => this.state().state === 'success');
  readonly error = computed(() => this.state().error);

  constructor() {
    this.load();
  }

  load(): void {
    this.state.set({ data: null, state: 'loading', error: null });
    this.http.get<ExperienceData>('assets/data/experience.json').subscribe({
      next: (data) => this.state.set({ data, state: 'success', error: null }),
      error: (err) =>
        this.state.set({
          data: null,
          state: 'error',
          error: err.message ?? 'Error al cargar experiencia',
        }),
    });
  }
}
