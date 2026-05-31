import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { ExperienceService } from './experience.service';
import type { ExperienceData } from '../models';

describe('ExperienceService', () => {
  let httpMock: HttpTestingController;

  const mockData: ExperienceData = {
    work: [
      {
        id: 'tesis',
        type: 'work',
        role: 'Desarrollador Python',
        organization: 'Universidad Central de Chile',
        startDate: '2024-03',
        endDate: '2025-01',
        description: ['Desarrollo de proyecto de tesis'],
        highlights: [],
      },
    ],
    education: [
      {
        id: 'ucentral',
        type: 'education',
        degree: 'Ingeniería Civil en Computación e Informática',
        institution: 'Universidad Central de Chile',
        startDate: null,
        endDate: '2025-01',
        description: [],
        highlights: ['Distinción', 'Nota 5.3'],
      },
    ],
  };

  beforeEach(() => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), ExperienceService],
    });
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  function createService(): ExperienceService {
    return TestBed.inject(ExperienceService);
  }

  it('should be created', () => {
    const service = createService();
    httpMock.expectOne('assets/data/experience.json');
    expect(service).toBeTruthy();
  });

  it('should start in loading state', () => {
    const service = createService();
    expect(service.loading()).toBe(true);
    expect(service.workEntries()).toEqual([]);
    expect(service.educationEntries()).toEqual([]);
    httpMock.expectOne('assets/data/experience.json');
  });

  it('should load work and education entries on success', () => {
    const service = createService();
    const req = httpMock.expectOne('assets/data/experience.json');
    req.flush(mockData);
    expect(service.loading()).toBe(false);
    expect(service.loaded()).toBe(true);
    expect(service.workEntries().length).toBe(1);
    expect(service.workEntries()[0].role).toBe('Desarrollador Python');
    expect(service.educationEntries().length).toBe(1);
    expect(service.educationEntries()[0].degree).toContain('Ingeniería');
  });

  it('should handle empty arrays', () => {
    const service = createService();
    const req = httpMock.expectOne('assets/data/experience.json');
    req.flush({ work: [], education: [] });
    expect(service.loaded()).toBe(true);
    expect(service.workEntries()).toEqual([]);
    expect(service.educationEntries()).toEqual([]);
  });

  it('should handle HTTP error', () => {
    const service = createService();
    const req = httpMock.expectOne('assets/data/experience.json');
    req.flush('Error', { status: 500, statusText: 'Server Error' });
    expect(service.loading()).toBe(false);
    expect(service.error()).toBeTruthy();
    expect(service.workEntries()).toEqual([]);
    expect(service.educationEntries()).toEqual([]);
  });

  it('should reload data when load() is called', () => {
    const service = createService();
    httpMock.expectOne('assets/data/experience.json').flush(mockData);
    expect(service.loaded()).toBe(true);
    service.load();
    expect(service.loading()).toBe(true);
    httpMock.expectOne('assets/data/experience.json').flush({
      work: [{ id: 'new', type: 'work', role: 'New Role', organization: 'New Org', startDate: '2025-01', endDate: null, description: [], highlights: [] }],
      education: [],
    });
    expect(service.workEntries().length).toBe(1);
    expect(service.workEntries()[0].role).toBe('New Role');
  });
});
