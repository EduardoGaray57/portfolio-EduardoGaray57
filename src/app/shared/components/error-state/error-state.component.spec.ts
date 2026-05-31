import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ErrorStateComponent } from './error-state.component';

describe('ErrorStateComponent', () => {
  let fixture: ComponentFixture<ErrorStateComponent>;
  let component: ErrorStateComponent;

  beforeEach(() => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [ErrorStateComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ErrorStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display default title when none provided', () => {
    const titleEl = fixture.nativeElement.querySelector('h3');
    expect(titleEl).toBeTruthy();
    expect(titleEl.textContent?.trim()).toBe('Algo salió mal');
  });

  it('should display custom title', () => {
    fixture.componentRef.setInput('title', 'Error personalizado');
    fixture.detectChanges();

    const titleEl = fixture.nativeElement.querySelector('h3');
    expect(titleEl).toBeTruthy();
    expect(titleEl.textContent?.trim()).toBe('Error personalizado');
  });

  it('should display message when provided', () => {
    fixture.componentRef.setInput('message', 'Algo salió realmente mal');
    fixture.detectChanges();

    const msgEl = fixture.nativeElement.querySelector('p');
    expect(msgEl).toBeTruthy();
    expect(msgEl.textContent).toContain('Algo salió realmente mal');
  });

  it('should not show message paragraph when no message provided', () => {
    const msgEl = fixture.nativeElement.querySelector('p');
    expect(msgEl).toBeFalsy();
  });

  it('should not show retry button by default', () => {
    const retryBtn = fixture.nativeElement.querySelector('button');
    expect(retryBtn).toBeFalsy();
  });

  it('should show retry button when showRetry is true', () => {
    fixture.componentRef.setInput('showRetry', true);
    fixture.detectChanges();

    const retryBtn = fixture.nativeElement.querySelector('button');
    expect(retryBtn).toBeTruthy();
    expect(retryBtn.textContent?.trim()).toBe('Intentar de nuevo');
  });

  it('should emit retry event when retry button clicked', () => {
    fixture.componentRef.setInput('showRetry', true);
    fixture.detectChanges();

    let emitted = false;
    component.retry.subscribe(() => (emitted = true));

    const retryBtn = fixture.nativeElement.querySelector('button');
    retryBtn.click();

    expect(emitted).toBe(true);
  });
});
