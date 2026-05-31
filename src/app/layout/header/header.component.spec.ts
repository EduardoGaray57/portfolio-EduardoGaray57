import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let fixture: ComponentFixture<HeaderComponent>;
  let component: HeaderComponent;

  beforeEach(() => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 6 nav links', () => {
    expect(component['navLinks'].length).toBe(6);
  });

  it('should include Inicio link', () => {
    const links = component['navLinks'];
    expect(links.some((l) => l.label === 'Inicio' && l.path === '/')).toBe(true);
  });

  it('should include Contacto link', () => {
    const links = component['navLinks'];
    expect(links.some((l) => l.label === 'Contacto' && l.path === '/contacto')).toBe(true);
  });

  it('should include all expected nav links', () => {
    const labels = component['navLinks'].map((l) => l.label);
    expect(labels).toEqual([
      'Inicio',
      'Sobre Mí',
      'Proyectos',
      'Experiencia',
      'Habilidades',
      'Contacto',
    ]);
  });

  it('should start with mobile menu closed', () => {
    expect(component['mobileMenuOpen']()).toBe(false);
  });

  it('should toggle mobile menu', () => {
    component['toggleMobileMenu']();
    expect(component['mobileMenuOpen']()).toBe(true);
    component['toggleMobileMenu']();
    expect(component['mobileMenuOpen']()).toBe(false);
  });

  it('should close mobile menu', () => {
    component['toggleMobileMenu']();
    expect(component['mobileMenuOpen']()).toBe(true);
    component['closeMobileMenu']();
    expect(component['mobileMenuOpen']()).toBe(false);
  });

  it('should render hamburger button on mobile', () => {
    const button = fixture.nativeElement.querySelector('button[aria-label="Toggle navigation menu"]');
    expect(button).toBeTruthy();
  });

  it('should render the EG logo link', () => {
    const logo = fixture.nativeElement.querySelector('a');
    expect(logo).toBeTruthy();
    expect(logo.textContent?.trim()).toBe('EG');
  });

  it('should render desktop nav with all links', () => {
    const desktopNav = fixture.nativeElement.querySelector('nav');
    const links = desktopNav?.querySelectorAll('a');
    expect(links?.length).toBe(6);
  });

  it('should show mobile nav when menu is toggled', () => {
    expect(fixture.nativeElement.querySelector('.md\\\\:hidden')).toBeFalsy();

    component['toggleMobileMenu']();
    fixture.detectChanges();

    // Mobile nav should appear after toggle
    const allNavs = fixture.nativeElement.querySelectorAll('nav');
    expect(allNavs.length).toBeGreaterThanOrEqual(2);
  });
});
