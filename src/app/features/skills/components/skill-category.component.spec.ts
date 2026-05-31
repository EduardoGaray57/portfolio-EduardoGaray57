import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SkillCategoryComponent } from './skill-category.component';
import { SkillCategory } from '../../../core/models';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('SkillCategoryComponent', () => {
  let fixture: ComponentFixture<SkillCategoryComponent>;
  let component: SkillCategoryComponent;

  const category: SkillCategory = {
    id: 'languages',
    label: 'Lenguajes',
    colorClass: 'bg-blue-100 text-blue-700',
    skills: ['Python', 'JavaScript', 'TypeScript'],
  };

  beforeEach(() => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [SkillCategoryComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(SkillCategoryComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('category', category);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display category label', () => {
    expect(fixture.nativeElement.textContent).toContain('Lenguajes');
  });

  it('should pass skills to child components', () => {
    expect(component.category().skills.length).toBe(3);
    expect(component.category().skills).toContain('Python');
    expect(component.category().skills).toContain('JavaScript');
    expect(component.category().skills).toContain('TypeScript');
  });

  it('should resolve correct color for known category ID', () => {
    expect(component['color']).toBe('bg-blue-100 text-blue-700');
  });

  it('should resolve fallback color for unknown category ID', () => {
    const unknownCat: SkillCategory = {
      id: 'unknown',
      label: 'Unknown',
      colorClass: 'bg-gray-100 text-gray-700',
      skills: ['Skill A'],
    };
    fixture.componentRef.setInput('category', unknownCat);
    fixture.detectChanges();
    expect(component['color']).toBe('bg-gray-100 text-gray-700');
  });

  it('should resolve color for frameworks category', () => {
    const frameworkCat: SkillCategory = {
      id: 'frameworks',
      label: 'Frameworks',
      colorClass: 'bg-green-100 text-green-700',
      skills: ['Angular'],
    };
    fixture.componentRef.setInput('category', frameworkCat);
    fixture.detectChanges();
    expect(component['color']).toBe('bg-green-100 text-green-700');
  });

  it('should render category card container', () => {
    const card = fixture.nativeElement.querySelector('.rounded-xl');
    expect(card).toBeTruthy();
  });
});
