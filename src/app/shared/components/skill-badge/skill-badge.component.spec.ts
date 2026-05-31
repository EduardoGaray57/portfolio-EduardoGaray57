import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SkillBadgeComponent } from './skill-badge.component';

describe('SkillBadgeComponent', () => {
  let fixture: ComponentFixture<SkillBadgeComponent>;
  let component: SkillBadgeComponent;

  beforeEach(() => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [SkillBadgeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SkillBadgeComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('name', 'TypeScript');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the skill name', () => {
    const badgeEl = fixture.nativeElement.querySelector('span');
    expect(badgeEl.textContent?.trim()).toBe('TypeScript');
  });

  it('should use default color class when none provided', () => {
    expect(component.colorClass()).toBe('bg-blue-100 text-blue-700');
  });

  it('should apply custom color class', () => {
    fixture.componentRef.setInput('colorClass', 'bg-green-100 text-green-700');
    fixture.detectChanges();

    const badgeEl = fixture.nativeElement.querySelector('span');
    expect(badgeEl.classList.contains('bg-green-100')).toBe(true);
    expect(badgeEl.classList.contains('text-green-700')).toBe(true);
  });

  it('should handle empty name', () => {
    fixture.componentRef.setInput('name', '');
    fixture.detectChanges();

    const badgeEl = fixture.nativeElement.querySelector('span');
    expect(badgeEl.textContent?.trim()).toBe('');
  });

  it('should include base badge classes', () => {
    const badgeEl = fixture.nativeElement.querySelector('span');
    expect(badgeEl.classList.contains('inline-flex')).toBe(true);
    expect(badgeEl.classList.contains('rounded-full')).toBe(true);
  });
});
