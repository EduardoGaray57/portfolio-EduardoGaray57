import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent, type ButtonVariant } from './button.component';

describe('ButtonComponent', () => {
  let fixture: ComponentFixture<ButtonComponent>;
  let component: ButtonComponent;

  beforeEach(() => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [ButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should default to primary variant', () => {
    expect(component.variant()).toBe('primary');
  });

  it('should default to not disabled', () => {
    expect(component.disabled()).toBe(false);
  });

  it('should apply primary variant classes', () => {
    const classes = component['variantClass']();
    expect(classes).toContain('bg-blue-600');
    expect(classes).toContain('text-white');
  });

  it('should apply secondary variant classes', () => {
    fixture.componentRef.setInput('variant', 'secondary');
    fixture.detectChanges();
    expect(component['variantClass']()).toContain('bg-gray-100');
    expect(component['variantClass']()).toContain('text-gray-900');
  });

  it('should apply ghost variant classes', () => {
    fixture.componentRef.setInput('variant', 'ghost');
    fixture.detectChanges();
    expect(component['variantClass']()).toContain('bg-transparent');
    expect(component['variantClass']()).toContain('text-gray-600');
  });

  it('should not have disabled attribute when not disabled', () => {
    const button = fixture.nativeElement.querySelector('button');
    expect(button.hasAttribute('disabled')).toBe(false);
  });

  it('should have disabled attribute when disabled', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button');
    expect(button.disabled).toBe(true);
  });

  it('should render button element', () => {
    const button = fixture.nativeElement.querySelector('button');
    expect(button).toBeTruthy();
  });

  it('should allow all variants via setInput', () => {
    const variants: ButtonVariant[] = ['primary', 'secondary', 'ghost'];
    for (const v of variants) {
      fixture.componentRef.setInput('variant', v);
      fixture.detectChanges();
      expect(component.variant()).toBe(v);
    }
  });
});
