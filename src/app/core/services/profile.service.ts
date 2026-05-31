import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Profile, DataState } from '../models';

@Injectable({ providedIn: 'root' })
export class ProfileService {
  private http = inject(HttpClient);

  private state = signal<DataState<Profile>>({
    data: null,
    state: 'idle',
    error: null,
  });

  readonly data = computed(() => this.state().data);
  readonly loading = computed(() => this.state().state === 'loading');
  readonly loaded = computed(() => this.state().state === 'success');
  readonly error = computed(() => this.state().error);

  constructor() {
    this.load();
  }

  load(): void {
    this.state.set({ data: null, state: 'loading', error: null });
    this.http.get<Profile>('assets/data/profile.json').subscribe({
      next: (data) => this.state.set({ data, state: 'success', error: null }),
      error: (err) =>
        this.state.set({
          data: null,
          state: 'error',
          error: err.message ?? 'Error al cargar perfil',
        }),
    });
  }
}
