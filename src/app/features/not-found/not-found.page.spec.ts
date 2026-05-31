import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { NotFoundPageComponent } from './not-found.page';

describe('NotFoundPageComponent', () => {
  let fixture: ComponentFixture<NotFoundPageComponent>;

  beforeEach(() => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [NotFoundPageComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(NotFoundPageComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should display 404', () => {
    expect(fixture.nativeElement.textContent).toContain('404');
  });

  it('should display "Página no encontrada"', () => {
    expect(fixture.nativeElement.textContent).toContain('Página no encontrada');
  });

  it('should display explanatory text', () => {
    expect(fixture.nativeElement.textContent).toContain('La página que buscas no existe');
  });

  it('should have a link back to home', () => {
    const homeLink = fixture.nativeElement.querySelector('a');
    expect(homeLink).toBeTruthy();
    expect(homeLink.textContent).toContain('Volver al Inicio');
  });
});
