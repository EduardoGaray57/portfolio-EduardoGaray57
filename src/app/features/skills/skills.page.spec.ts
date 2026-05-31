import { ComponentFixture, TestBed } from '@angular/core/testing';
import { computed } from '@angular/core';
import { SkillsPageComponent } from './skills.page';
import { SkillsService } from '../../core/services/skills.service';
import { SkillCategory } from '../../core/models';
import { NO_ERRORS_SCHEMA } from '@angular/core';

const mockCategories: SkillCategory[] = [
  { id: 'languages', label: 'Lenguajes', colorClass: 'bg-blue-100 text-blue-700', skills: ['Python', 'JavaScript'] },
  { id: 'frameworks', label: 'Frameworks', colorClass: 'bg-green-100 text-green-700', skills: ['Django', 'React'] },
];

function createMockService(overrides?: {
  categories?: SkillCategory[];
  loading?: boolean;
  loaded?: boolean;
  error?: string | null;
}) {
  const state = {
    categories: mockCategories,
    loading: false,
    loaded: true,
    error: null,
    ...overrides,
  };
  return {
    categories: computed(() => state.categories),
    loading: computed(() => state.loading),
    loaded: computed(() => state.loaded),
    error: computed(() => state.error),
    data: computed(() => ({ categories: state.categories })),
    load: () => {},
  } as unknown as SkillsService;
}

describe('SkillsPageComponent', () => {
  let fixture: ComponentFixture<SkillsPageComponent>;

  function createComponent(mockService: SkillsService) {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [SkillsPageComponent],
      providers: [{ provide: SkillsService, useValue: mockService }],
      schemas: [NO_ERRORS_SCHEMA],
    });
    fixture = TestBed.createComponent(SkillsPageComponent);
    fixture.detectChanges();
  }

  it('should create', () => {
    createComponent(createMockService());
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should show loading spinner when loading', () => {
    createComponent(createMockService({ loading: true, loaded: false }));
    expect(fixture.nativeElement.textContent).toContain('Cargando habilidades...');
  });

  it('should show error state on error', () => {
    createComponent(createMockService({ error: 'Error!' }));
    expect(fixture.nativeElement.textContent).toContain('Error al cargar habilidades');
  });

  it('should have categories from service', () => {
    createComponent(createMockService());
    expect(fixture.componentInstance['skills'].categories().length).toBe(2);
  });

  it('should show empty state when no categories', () => {
    createComponent(createMockService({ categories: [] }));
    expect(fixture.nativeElement.textContent).toContain('No hay habilidades registradas');
  });

  it('should show section heading text', () => {
    createComponent(createMockService());
    expect(fixture.nativeElement.textContent).toContain('Habilidades');
    expect(fixture.nativeElement.textContent).toContain('Tecnologías y herramientas');
  });
});
