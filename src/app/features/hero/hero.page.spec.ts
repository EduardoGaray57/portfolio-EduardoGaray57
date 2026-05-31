import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { computed } from '@angular/core';
import { HeroPageComponent } from './hero.page';
import { ProjectsService } from '../../core/services/projects.service';

describe('HeroPageComponent', () => {
  let fixture: ComponentFixture<HeroPageComponent>;

  function createMockProjectsService(repoCount: number, loaded: boolean) {
    return {
      loaded: computed(() => loaded),
      repoCount: computed(() => repoCount),
      repos: computed(() => []),
      loading: computed(() => false),
      error: computed(() => null),
      getRepoByName: () => undefined,
      refreshFromApi: () => {},
      load: () => {},
    } as unknown as ProjectsService;
  }

  function createComponent(mockService: ProjectsService) {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [HeroPageComponent],
      providers: [
        provideRouter([]),
        { provide: ProjectsService, useValue: mockService },
      ],
    });

    fixture = TestBed.createComponent(HeroPageComponent);
    fixture.detectChanges();
  }

  it('should create', () => {
    createComponent(createMockProjectsService(0, false));
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should display the full name', () => {
    createComponent(createMockProjectsService(0, false));
    const el = fixture.nativeElement as HTMLElement;
    expect(el.textContent).toContain('Eduardo Marcelo');
    expect(el.textContent).toContain('Garay Aguayo');
  });

  it('should display the professional title', () => {
    createComponent(createMockProjectsService(0, false));
    const el = fixture.nativeElement as HTMLElement;
    expect(el.textContent).toContain('Ingeniero Civil en Computación e Informática');
  });

  it('should display the tagline', () => {
    createComponent(createMockProjectsService(0, false));
    const el = fixture.nativeElement as HTMLElement;
    expect(el.textContent).toContain('Fullstack Developer');
  });

  it('should have CTA button linking to /proyectos', () => {
    createComponent(createMockProjectsService(0, false));
    // RouterLink renders as an <a> with an href in test mode
    const links: NodeListOf<HTMLAnchorElement> = fixture.nativeElement.querySelectorAll('a');
    const proyectoLink = Array.from(links).find((a) => a.textContent?.includes('Ver Proyectos'));
    expect(proyectoLink).toBeTruthy();
    expect(proyectoLink?.getAttribute('href')).toContain('/proyectos');
  });

  it('should have CTA button linking to /contacto', () => {
    createComponent(createMockProjectsService(0, false));
    const links: NodeListOf<HTMLAnchorElement> = fixture.nativeElement.querySelectorAll('a');
    const contactLink = Array.from(links).find((a) => a.textContent?.trim() === 'Contacto');
    expect(contactLink).toBeTruthy();
    expect(contactLink?.getAttribute('href')).toContain('/contacto');
  });

  it('should show GitHub stats strip when projects loaded', () => {
    createComponent(createMockProjectsService(5, true));
    const stripText = fixture.nativeElement.textContent;
    expect(stripText).toContain('5 repositorios en GitHub');
  });

  it('should NOT show GitHub stats strip when no repos', () => {
    createComponent(createMockProjectsService(0, true));
    const stripText = fixture.nativeElement.textContent;
    expect(stripText).not.toContain('repositorios en GitHub');
  });

  it('should NOT show GitHub stats strip when not loaded', () => {
    createComponent(createMockProjectsService(5, false));
    const stripText = fixture.nativeElement.textContent;
    expect(stripText).not.toContain('repositorios en GitHub');
  });

  it('should render scroll indicator', () => {
    createComponent(createMockProjectsService(0, false));
    const scrollIndicator = fixture.nativeElement.querySelector('.animate-bounce');
    expect(scrollIndicator).toBeTruthy();
  });
});
