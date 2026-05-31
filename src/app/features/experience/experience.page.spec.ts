import { ComponentFixture, TestBed } from '@angular/core/testing';
import { computed } from '@angular/core';
import { ExperiencePageComponent } from './experience.page';
import { ExperienceService } from '../../core/services/experience.service';
import { ExperienceEntry } from '../../core/models';
import { NO_ERRORS_SCHEMA } from '@angular/core';

const mockWork: ExperienceEntry[] = [
  {
    id: 'tesis',
    type: 'work',
    role: 'Desarrollador Python',
    organization: 'Universidad Central de Chile',
    startDate: '2024-03',
    endDate: '2025-01',
    description: ['Desarrollo de proyecto de tesis'],
  },
];

const mockEducation: ExperienceEntry[] = [
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
];

function createMockService(overrides?: {
  work?: ExperienceEntry[];
  education?: ExperienceEntry[];
  loading?: boolean;
  loaded?: boolean;
  error?: string | null;
}) {
  const state = {
    work: mockWork,
    education: mockEducation,
    loading: false,
    loaded: true,
    error: null,
    ...overrides,
  };
  return {
    workEntries: computed(() => state.work),
    educationEntries: computed(() => state.education),
    loading: computed(() => state.loading),
    loaded: computed(() => state.loaded),
    error: computed(() => state.error),
    data: computed(() => ({ work: state.work, education: state.education })),
    load: () => {},
  } as unknown as ExperienceService;
}

describe('ExperiencePageComponent', () => {
  let fixture: ComponentFixture<ExperiencePageComponent>;

  function createComponent(mockService: ExperienceService) {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [ExperiencePageComponent],
      providers: [{ provide: ExperienceService, useValue: mockService }],
      schemas: [NO_ERRORS_SCHEMA],
    });
    fixture = TestBed.createComponent(ExperiencePageComponent);
    fixture.detectChanges();
  }

  it('should create', () => {
    createComponent(createMockService());
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should show loading spinner when loading', () => {
    createComponent(createMockService({ loading: true, loaded: false }));
    expect(fixture.nativeElement.textContent).toContain('Cargando experiencia...');
  });

  it('should show error state on error', () => {
    createComponent(createMockService({ error: 'Error!' }));
    expect(fixture.nativeElement.textContent).toContain('Error al cargar experiencia');
  });

  it('should show work section when work entries exist', () => {
    createComponent(createMockService());
    expect(fixture.nativeElement.textContent).toContain('Experiencia Laboral');
  });

  it('should show education section when education entries exist', () => {
    createComponent(createMockService());
    expect(fixture.nativeElement.textContent).toContain('Formación Académica');
  });

  it('should hide work section when no work entries', () => {
    createComponent(createMockService({ work: [] }));
    expect(fixture.nativeElement.textContent).not.toContain('Experiencia Laboral');
  });

  it('should hide education section when no education entries', () => {
    createComponent(createMockService({ education: [] }));
    expect(fixture.nativeElement.textContent).not.toContain('Formación Académica');
  });

  it('should show empty state when both arrays are empty', () => {
    createComponent(createMockService({ work: [], education: [] }));
    expect(fixture.nativeElement.textContent).toContain('No hay experiencia registrada');
  });
});
