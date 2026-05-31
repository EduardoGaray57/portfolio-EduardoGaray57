import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SectionHeadingComponent } from './section-heading.component';

describe('SectionHeadingComponent', () => {
  let fixture: ComponentFixture<SectionHeadingComponent>;
  let component: SectionHeadingComponent;

  beforeEach(() => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [SectionHeadingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SectionHeadingComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the title', () => {
    fixture.componentRef.setInput('title', 'Mi Título');
    fixture.detectChanges();

    const titleEl = fixture.nativeElement.querySelector('h2');
    expect(titleEl.textContent?.trim()).toBe('Mi Título');
  });

  it('should not show subtitle when none provided', () => {
    fixture.componentRef.setInput('title', 'Title Only');
    fixture.detectChanges();

    const subtitleEl = fixture.nativeElement.querySelector('p');
    expect(subtitleEl).toBeFalsy();
  });

  it('should display subtitle when provided', () => {
    fixture.componentRef.setInput('title', 'Title');
    fixture.componentRef.setInput('subtitle', 'A subtitle here');
    fixture.detectChanges();

    const subtitleEl = fixture.nativeElement.querySelector('p');
    expect(subtitleEl).toBeTruthy();
    expect(subtitleEl.textContent?.trim()).toBe('A subtitle here');
  });

  it('should render blue accent bar', () => {
    fixture.componentRef.setInput('title', 'Title');
    fixture.detectChanges();

    const bar = fixture.nativeElement.querySelector('.bg-blue-600');
    expect(bar).toBeTruthy();
  });
});
