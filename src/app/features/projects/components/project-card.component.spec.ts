import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ProjectCardComponent } from './project-card.component';
import { GitHubRepo } from '../../../core/models';

const mockRepo: GitHubRepo = {
  id: 1,
  name: 'test-repo',
  full_name: 'user/test-repo',
  html_url: 'https://github.com/user/test-repo',
  description: 'A test repository description',
  language: 'TypeScript',
  stargazers_count: 15,
  forks_count: 3,
  fork: false,
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-06-01T00:00:00Z',
  pushed_at: '2024-06-01T00:00:00Z',
  homepage: null,
  topics: ['angular', 'testing'],
  license: null,
};

describe('ProjectCardComponent', () => {
  let fixture: ComponentFixture<ProjectCardComponent>;
  let component: ProjectCardComponent;

  beforeEach(() => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [ProjectCardComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectCardComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('repo', mockRepo);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display repository name', () => {
    expect(fixture.nativeElement.textContent).toContain('test-repo');
  });

  it('should display description', () => {
    expect(fixture.nativeElement.textContent).toContain('A test repository description');
  });

  it('should display "Sin descripción" when description is null', () => {
    fixture.componentRef.setInput('repo', { ...mockRepo, description: null });
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Sin descripción');
  });

  it('should display language badge', () => {
    expect(fixture.nativeElement.textContent).toContain('TypeScript');
  });

  it('should display star count', () => {
    expect(fixture.nativeElement.textContent).toContain('15');
  });

  it('should display fork count', () => {
    expect(fixture.nativeElement.textContent).toContain('3');
  });

  it('should link to project detail page', () => {
    const link = fixture.nativeElement.querySelector('a');
    expect(link).toBeTruthy();
    expect(link.getAttribute('href')).toContain('/proyectos/test-repo');
  });

  it('should show fork badge when fork is true', () => {
    fixture.componentRef.setInput('repo', { ...mockRepo, fork: true });
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Fork');
  });

  it('should NOT show fork badge when fork is false', () => {
    expect(fixture.nativeElement.textContent).not.toContain('Fork');
  });

  it('should resolve correct language color class for TypeScript', () => {
    expect(component['languageClass']('TypeScript')).toBe('bg-blue-100 text-blue-800');
  });

  it('should resolve fallback color class for unknown languages', () => {
    expect(component['languageClass']('UnknownLang')).toBe('bg-gray-100 text-gray-700');
  });

  it('should resolve gray class for null language', () => {
    expect(component['languageClass'](null)).toBe('bg-gray-100 text-gray-500');
  });
});
