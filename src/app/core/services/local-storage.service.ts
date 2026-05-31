import { Injectable } from '@angular/core';
import type { CacheEntry } from '../models';

const STORAGE_PREFIX = 'portfolio-';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
  get<T>(key: string): T | null {
    try {
      const raw = localStorage.getItem(STORAGE_PREFIX + key);
      if (!raw) return null;

      const entry: CacheEntry<T> = JSON.parse(raw);

      // Check TTL expiry
      if (entry.ttl && Date.now() - entry.timestamp > entry.ttl) {
        localStorage.removeItem(STORAGE_PREFIX + key);
        return null;
      }

      return entry.data;
    } catch {
      return null;
    }
  }

  set<T>(key: string, data: T, ttlMs: number = 86_400_000): void {
    try {
      const entry: CacheEntry<T> = {
        data,
        timestamp: Date.now(),
        ttl: ttlMs,
      };
      localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(entry));
    } catch {
      console.warn('localStorage write failed for key:', key);
    }
  }

  remove(key: string): void {
    localStorage.removeItem(STORAGE_PREFIX + key);
  }
}
