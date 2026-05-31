import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { SkillsService } from './skills.service';
import type { SkillsData } from '../models';

describe('SkillsService', () => {
  let httpMock: HttpTestingController;

  const mockData: SkillsData = {
    categories: [
      { id: 'languages', label: 'Lenguajes', colorClass: 'bg-blue-100 text-blue-700', skills: ['Python', 'JavaScript', 'Java', 'SQL'] },
      { id: 'frameworks', label: 'Frameworks', colorClass: 'bg-green-100 text-green-700', skills: ['Django', 'React', 'Angular'] },
      { id: 'databases', label: 'Bases de datos', colorClass: 'bg-purple-100 text-purple-700', skills: ['PostgreSQL'] },
    ],
  };

  beforeEach(() => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), SkillsService],
    });
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  function createService(): SkillsService {
    return TestBed.inject(SkillsService);
  }

  it('should be created', () => {
    const service = createService();
    httpMock.expectOne('assets/data/skills.json');
    expect(service).toBeTruthy();
  });

  it('should start in loading state', () => {
    const service = createService();
    expect(service.loading()).toBe(true);
    expect(service.categories()).toEqual([]);
    httpMock.expectOne('assets/data/skills.json');
  });

  it('should load categories on success', () => {
    const service = createService();
    const req = httpMock.expectOne('assets/data/skills.json');
    req.flush(mockData);
    expect(service.loading()).toBe(false);
    expect(service.loaded()).toBe(true);
    expect(service.categories().length).toBe(3);
    expect(service.categories()[0].label).toBe('Lenguajes');
    expect(service.categories()[0].skills).toContain('Python');
  });

  it('should handle empty categories array', () => {
    const service = createService();
    const req = httpMock.expectOne('assets/data/skills.json');
    req.flush({ categories: [] });
    expect(service.loaded()).toBe(true);
    expect(service.categories()).toEqual([]);
  });

  it('should handle category with empty skills array', () => {
    const service = createService();
    const req = httpMock.expectOne('assets/data/skills.json');
    req.flush({ categories: [{ id: 'empty', label: 'Empty', colorClass: 'bg-gray-100', skills: [] }] });
    expect(service.loaded()).toBe(true);
    expect(service.categories().length).toBe(1);
    expect(service.categories()[0].skills).toEqual([]);
  });

  it('should handle HTTP error', () => {
    const service = createService();
    const req = httpMock.expectOne('assets/data/skills.json');
    req.flush('Error', { status: 500, statusText: 'Server Error' });
    expect(service.loading()).toBe(false);
    expect(service.error()).toBeTruthy();
    expect(service.categories()).toEqual([]);
  });

  it('should reload when load() is called', () => {
    const service = createService();
    httpMock.expectOne('assets/data/skills.json').flush(mockData);
    expect(service.loaded()).toBe(true);
    service.load();
    httpMock.expectOne('assets/data/skills.json').flush({ categories: [] });
    expect(service.categories()).toEqual([]);
  });
});
