import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { computed } from '@angular/core';
import { AboutPageComponent } from './about.page';
import { ProfileService } from '../../core/services/profile.service';
import { Profile } from '../../core/models';
import { NO_ERRORS_SCHEMA } from '@angular/core';

const mockProfile: Profile = {
  fullName: 'Eduardo Marcelo Garay Aguayo',
  title: 'Ingeniero Civil en Computación e Informática',
  tagline: 'Fullstack Developer',
  bio: 'Bio de prueba para testing',
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

function createMockProfileService(overrides?: Partial<{
  data: Profile | null;
  loading: boolean;
  loaded: boolean;
  error: string | null;
}>) {
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

describe('AboutPageComponent', () => {
  let fixture: ComponentFixture<AboutPageComponent>;

  function createComponent(mockService: ProfileService) {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [AboutPageComponent],
      providers: [
        provideRouter([]),
        { provide: ProfileService, useValue: mockService },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    });
    fixture = TestBed.createComponent(AboutPageComponent);
    fixture.detectChanges();
  }

  it('should create', () => {
    createComponent(createMockProfileService());
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should display loading spinner when loading', () => {
    createComponent(createMockProfileService({ loading: true, loaded: false }));
    const el = fixture.nativeElement as HTMLElement;
    expect(el.textContent).toContain('Cargando perfil...');
  });

  it('should display error state when error', () => {
    createComponent(createMockProfileService({ error: 'Error de carga' }));
    const el = fixture.nativeElement as HTMLElement;
    expect(el.textContent).toContain('Error al cargar perfil');
  });

  it('should display profile data when loaded', () => {
    createComponent(createMockProfileService());
    const el = fixture.nativeElement as HTMLElement;
    expect(el.textContent).toContain('Eduardo Marcelo Garay Aguayo');
    expect(el.textContent).toContain('Ingeniero Civil en Computación e Informática');
  });

  it('should display bio text', () => {
    createComponent(createMockProfileService());
    const el = fixture.nativeElement as HTMLElement;
    expect(el.textContent).toContain('Bio de prueba para testing');
  });

  it('should display distinction badge when graduatedWithDistinction is true', () => {
    createComponent(createMockProfileService());
    const el = fixture.nativeElement as HTMLElement;
    expect(el.textContent).toContain('Distinción');
    expect(el.textContent).toContain('Nota 5.3');
  });

  it('should NOT display distinction badge when graduatedWithDistinction is false', () => {
    const noDistinction = { ...mockProfile, graduatedWithDistinction: false };
    createComponent(createMockProfileService({ data: noDistinction }));
    const el = fixture.nativeElement as HTMLElement;
    expect(el.textContent).not.toContain('Distinción');
  });

  it('should display university name', () => {
    createComponent(createMockProfileService());
    const el = fixture.nativeElement as HTMLElement;
    expect(el.textContent).toContain('Universidad Central de Chile');
  });

  it('should have CV download link with correct path', () => {
    createComponent(createMockProfileService());
    const downloadLink = fixture.nativeElement.querySelector('a[download]');
    expect(downloadLink).toBeTruthy();
    expect(downloadLink.getAttribute('href')).toBe('assets/docs/CV_Eduardo_Garay.pdf');
  });

  it('should have Contactarme link', () => {
    createComponent(createMockProfileService());
    const el = fixture.nativeElement as HTMLElement;
    expect(el.textContent).toContain('Contactarme');
  });

  it('should compute initials correctly', () => {
    createComponent(createMockProfileService());
    const component = fixture.componentInstance;
    expect(component['getInitials']('Eduardo Marcelo Garay Aguayo')).toBe('EA');
    expect(component['getInitials']('John Doe')).toBe('JD');
    expect(component['getInitials']('Alice')).toBe('A');
  });

  it('should render initials in avatar placeholder', () => {
    createComponent(createMockProfileService());
    const avatarText = fixture.nativeElement.querySelector('.select-none');
    expect(avatarText).toBeTruthy();
    expect(avatarText.textContent?.trim()).toBe('EA');
  });
});
