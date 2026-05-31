import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoadingSpinnerComponent } from './loading-spinner.component';

describe('LoadingSpinnerComponent', () => {
  let fixture: ComponentFixture<LoadingSpinnerComponent>;
  let component: LoadingSpinnerComponent;

  beforeEach(() => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [LoadingSpinnerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LoadingSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should default to md size', () => {
    expect(component.size()).toBe('md');
  });

  it('should render spinner element', () => {
    const spinner = fixture.nativeElement.querySelector('[role="status"]');
    expect(spinner).toBeTruthy();
    expect(spinner.getAttribute('aria-label')).toBe('Cargando');
  });

  it('should not show message when none provided', () => {
    const messageEl = fixture.nativeElement.querySelector('span');
    expect(messageEl).toBeFalsy();
  });

  it('should show message when provided', () => {
    fixture.componentRef.setInput('message', 'Cargando...');
    fixture.detectChanges();

    const messageEl = fixture.nativeElement.querySelector('span');
    expect(messageEl).toBeTruthy();
    expect(messageEl.textContent).toBe('Cargando...');
  });

  it('should apply sm size class', () => {
    fixture.componentRef.setInput('size', 'sm');
    fixture.detectChanges();

    expect(component['sizeClass']()).toBe('8');
    expect(component['spinnerClass']()).toBe('h-5 w-5 border-2');
  });

  it('should apply md size class', () => {
    expect(component['sizeClass']()).toBe('12');
    expect(component['spinnerClass']()).toBe('h-8 w-8 border-2');
  });

  it('should apply lg size class', () => {
    fixture.componentRef.setInput('size', 'lg');
    fixture.detectChanges();

    expect(component['sizeClass']()).toBe('20');
    expect(component['spinnerClass']()).toBe('h-12 w-12 border-3');
  });
});
