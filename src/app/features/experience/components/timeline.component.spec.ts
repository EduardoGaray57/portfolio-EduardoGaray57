import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TimelineComponent } from './timeline.component';
import type { ExperienceEntry } from '../../../core/models';

describe('TimelineComponent', () => {
  let fixture: ComponentFixture<TimelineComponent>;
  let component: TimelineComponent;

  const workEntry: ExperienceEntry = {
    id: 'test-work',
    type: 'work',
    role: 'Developer',
    organization: 'Test Corp',
    startDate: '2024-01',
    endDate: '2024-12',
    description: ['Did stuff', 'Did more stuff'],
  };

  const educationEntry: ExperienceEntry = {
    id: 'test-edu',
    type: 'education',
    degree: 'Computer Science',
    institution: 'Test University',
    startDate: null,
    endDate: '2024-06',
    description: [],
    highlights: ['Honors'],
  };

  beforeEach(() => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [TimelineComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TimelineComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.componentRef.setInput('entries', []);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should render work entry with role and organization', () => {
    fixture.componentRef.setInput('entries', [workEntry]);
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Developer');
    expect(fixture.nativeElement.textContent).toContain('Test Corp');
  });

  it('should render education entry with degree and institution', () => {
    fixture.componentRef.setInput('entries', [educationEntry]);
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Computer Science');
    expect(fixture.nativeElement.textContent).toContain('Test University');
  });

  it('should render date range in Spanish format', () => {
    fixture.componentRef.setInput('entries', [workEntry]);
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Ene 2024');
    expect(fixture.nativeElement.textContent).toContain('Dic 2024');
  });

  it('should show "Presente" for null endDate', () => {
    const current = { ...workEntry, endDate: null };
    fixture.componentRef.setInput('entries', [current]);
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Presente');
  });

  it('should render description bullets', () => {
    fixture.componentRef.setInput('entries', [workEntry]);
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Did stuff');
    expect(fixture.nativeElement.textContent).toContain('Did more stuff');
  });

  it('should render highlights badges', () => {
    fixture.componentRef.setInput('entries', [educationEntry]);
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Honors');
  });

  it('should render empty container for no entries', () => {
    fixture.componentRef.setInput('entries', []);
    fixture.detectChanges();

    const items = fixture.nativeElement.querySelectorAll('[class*="pl-12"]');
    expect(items.length).toBe(0);
  });

  it('should format date range correctly', () => {
    fixture.componentRef.setInput('entries', []);
    fixture.detectChanges();

    expect(component['formatDateRange']('2024-03', '2025-01')).toBe('Mar 2024 – Ene 2025');
    expect(component['formatDateRange']('2023-01', null)).toBe('Ene 2023 – Presente');
    expect(component['formatDateRange'](null, null)).toBe('Presente – Presente');
    expect(component['formatDateRange']('2017', '2020')).toBe('2017 – 2020');
  });

  it('should handle entry with no description', () => {
    const noDesc = { ...workEntry, description: [] };
    fixture.componentRef.setInput('entries', [noDesc]);
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Developer');
  });

  it('should render multiple entries', () => {
    fixture.componentRef.setInput('entries', [workEntry, educationEntry]);
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Developer');
    expect(fixture.nativeElement.textContent).toContain('Computer Science');
  });
});
