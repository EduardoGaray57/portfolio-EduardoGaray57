import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let fixture: ComponentFixture<FooterComponent>;
  let component: FooterComponent;

  beforeEach(() => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [FooterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the current year', () => {
    const year = new Date().getFullYear();
    expect(component['year']).toBe(year);
  });

  it('should render copyright with current year', () => {
    const year = new Date().getFullYear();
    const text = fixture.nativeElement.textContent;
    expect(text).toContain(`© ${year} Eduardo Marcelo Garay Aguayo`);
  });

  it('should have GitHub link with correct URL', () => {
    const links: NodeListOf<HTMLAnchorElement> = fixture.nativeElement.querySelectorAll('a');
    const githubLink = Array.from(links).find((a) => a.getAttribute('aria-label') === 'GitHub');
    expect(githubLink).toBeTruthy();
    expect(githubLink?.getAttribute('href')).toBe('https://github.com/EduardoGaray57');
    expect(githubLink?.getAttribute('target')).toBe('_blank');
    expect(githubLink?.getAttribute('rel')).toBe('noopener noreferrer');
  });

  it('should have LinkedIn link with correct URL', () => {
    const links: NodeListOf<HTMLAnchorElement> = fixture.nativeElement.querySelectorAll('a');
    const linkedinLink = Array.from(links).find((a) => a.getAttribute('aria-label') === 'LinkedIn');
    expect(linkedinLink).toBeTruthy();
    expect(linkedinLink?.getAttribute('href')).toBe(
      'https://linkedin.com/in/eduardo-garay-9b067b16b',
    );
    expect(linkedinLink?.getAttribute('target')).toBe('_blank');
    expect(linkedinLink?.getAttribute('rel')).toBe('noopener noreferrer');
  });

  it('should have Email link with correct address', () => {
    const links: NodeListOf<HTMLAnchorElement> = fixture.nativeElement.querySelectorAll('a');
    const emailLink = Array.from(links).find((a) => a.getAttribute('aria-label') === 'Email');
    expect(emailLink).toBeTruthy();
    expect(emailLink?.getAttribute('href')).toBe('mailto:eduardomarcelo03@gmail.com');
  });

  it('should have 3 social links', () => {
    const socialLinks = fixture.nativeElement.querySelectorAll('a');
    expect(socialLinks.length).toBe(3);
  });
});
