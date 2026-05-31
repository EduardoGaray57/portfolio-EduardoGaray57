export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  fork: boolean;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  homepage: string | null;
  topics: string[];
  license: { key: string; name: string } | null;
}

export interface ProjectsData {
  lastFetched: string;
  repos: GitHubRepo[];
}

export interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export interface DataState<T> {
  data: T | null;
  state: LoadingState;
  error: string | null;
}
