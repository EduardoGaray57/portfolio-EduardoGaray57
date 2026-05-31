import { TestBed } from '@angular/core/testing';
import { LocalStorageService } from './local-storage.service';

describe('LocalStorageService', () => {
  let service: LocalStorageService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      providers: [LocalStorageService],
    });
    service = TestBed.inject(LocalStorageService);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should store and retrieve values', () => {
    const data = { name: 'test', count: 42 };
    service.set('test-key', data);
    expect(service.get<typeof data>('test-key')).toEqual(data);
  });

  it('should return null for missing keys', () => {
    expect(service.get('nonexistent')).toBeNull();
  });

  it('should return null after removing a key', () => {
    service.set('temp', 'value');
    service.remove('temp');
    expect(service.get('temp')).toBeNull();
  });

  it('should prefix keys with portfolio-', () => {
    service.set('key', 'stored');
    const raw = localStorage.getItem('portfolio-key');
    expect(raw).not.toBeNull();
    const parsed = JSON.parse(raw!);
    expect(parsed.data).toBe('stored');
  });

  it('should use default 24h TTL when none provided', () => {
    service.set('ttl-test', 'value');
    const raw = localStorage.getItem('portfolio-ttl-test');
    const parsed = JSON.parse(raw!);
    expect(parsed.ttl).toBe(86_400_000);
  });

  it('should use custom TTL when provided', () => {
    service.set('custom-ttl', 'value', 5000);
    const raw = localStorage.getItem('portfolio-custom-ttl');
    const parsed = JSON.parse(raw!);
    expect(parsed.ttl).toBe(5000);
  });

  it('should return null when TTL has expired', () => {
    // Set a value with expired TTL by manipulating localStorage directly
    const expired = JSON.stringify({
      data: 'old',
      timestamp: Date.now() - 10_000,
      ttl: 1,
    });
    localStorage.setItem('portfolio-expired', expired);

    expect(service.get('expired')).toBeNull();
    expect(localStorage.getItem('portfolio-expired')).toBeNull(); // cleaned up
  });

  it('should return null on corrupt JSON', () => {
    localStorage.setItem('portfolio-corrupt', 'not-json{');
    expect(service.get('corrupt')).toBeNull();
  });

  it('should store different data types', () => {
    service.set('str', 'hello');
    service.set('num', 42);
    service.set('arr', [1, 2, 3]);
    service.set('obj', { nested: { key: true } });

    expect(service.get<string>('str')).toBe('hello');
    expect(service.get<number>('num')).toBe(42);
    expect(service.get<number[]>('arr')).toEqual([1, 2, 3]);
    expect(service.get<Record<string, unknown>>('obj')).toEqual({ nested: { key: true } });
  });
});
