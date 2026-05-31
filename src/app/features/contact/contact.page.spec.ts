import { ComponentFixture, TestBed } from '@angular/core/testing';
import { computed } from '@angular/core';
import { ContactPageComponent } from './contact.page';
import { ProfileService } from '../../core/services/profile.service';
import { Profile } from '../../core/models';
import { NO_ERRORS_SCHEMA } from '@angular/core';

const mockProfile: Profile = {
  fullName: 'Eduardo Marcelo Garay Aguayo',
  title: 'Ingeniero Civil en Computación e Informática',
  tagline: 'Fullstack Developer',
  bio: 'Test bio',
  graduationNote: 5.3,
  graduatedWithDistinction: true,
  university: 'Universidad Central de Chile',
  contacts: {
    email: 'eduardomarcelo03@gmail.com',
    phone: '+56 9 5414 2184',
    location: 'Quilicura, Santiago',
    linkedin: 'https://linkedin.com/in/eduardo-garay-9b067b16b',
    github: 'https://github.com/EduardoGaray57',
  },
};

function createMockService(overrides?: {
  data?: Profile | null;
  loading?: boolean;
  loaded?: boolean;
  error?: string | null;
}) {
  const state = {
    data: mockProfile,
    loading: false,
    loaded: true,
    error: null,
    ...overrides,
  };
  return {
    data: computed(() => state.data),
    loading: computed(() => state.loading),
    loaded: computed(() => state.loaded),
    error: computed(() => state.error),
    load: () => {},
  } as unknown as ProfileService;
}

describe('ContactPageComponent', () => {
  let fixture: ComponentFixture<ContactPageComponent>;

  function createComponent(mockService: ProfileService) {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [ContactPageComponent],
      providers: [{ provide: ProfileService, useValue: mockService }],
      schemas: [NO_ERRORS_SCHEMA],
    });
    fixture = TestBed.createComponent(ContactPageComponent);
    fixture.detectChanges();
  }

  it('should create', () => {
    createComponent(createMockService());
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should show loading spinner when loading', () => {
    createComponent(createMockService({ loading: true, loaded: false }));
    expect(fixture.nativeElement.textContent).toContain('Cargando información de contacto...');
  });

  it('should show error state on error', () => {
    createComponent(createMockService({ error: 'Contact error' }));
    expect(fixture.nativeElement.textContent).toContain('Error al cargar contacto');
  });

  it('should display email contact', () => {
    createComponent(createMockService());
    expect(fixture.nativeElement.textContent).toContain('eduardomarcelo03@gmail.com');
  });

  it('should display phone', () => {
    createComponent(createMockService());
    expect(fixture.nativeElement.textContent).toContain('+56 9 5414 2184');
  });

  it('should display location', () => {
    createComponent(createMockService());
    expect(fixture.nativeElement.textContent).toContain('Quilicura, Santiago');
  });

  it('should display field labels', () => {
    createComponent(createMockService());
    expect(fixture.nativeElement.textContent).toContain('Email');
    expect(fixture.nativeElement.textContent).toContain('Teléfono');
    expect(fixture.nativeElement.textContent).toContain('Ubicación');
  });

  it('should render LinkedIn button', () => {
    createComponent(createMockService());
    expect(fixture.nativeElement.textContent).toContain('LinkedIn');
  });

  it('should render GitHub button', () => {
    createComponent(createMockService());
    expect(fixture.nativeElement.textContent).toContain('GitHub');
  });

  it('should have mailto form', () => {
    createComponent(createMockService());
    expect(fixture.nativeElement.textContent).toContain('Envíame un Mensaje');
    expect(fixture.nativeElement.textContent).toContain('Enviar Mensaje');
  });

  it('should show mailto notice', () => {
    createComponent(createMockService());
    expect(fixture.nativeElement.textContent).toContain('Se abrirá tu cliente de correo');
  });

  it('should have section heading', () => {
    createComponent(createMockService());
    expect(fixture.nativeElement.textContent).toContain('Contacto');
  });
});
