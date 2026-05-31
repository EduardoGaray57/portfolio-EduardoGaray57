import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { ProfileService } from './profile.service';
import type { Profile } from '../models';

describe('ProfileService', () => {
  let httpMock: HttpTestingController;
  const mockProfile: Profile = {
    fullName: 'Eduardo Marcelo Garay Aguayo',
    title: 'Ingeniero Civil en Computación e Informática',
    tagline: 'Fullstack Developer · Python & Django · React & Angular',
    bio: 'Bio de prueba',
    graduationNote: 5.3,
    graduatedWithDistinction: true,
    university: 'Universidad Central de Chile',
    contacts: {
      email: 'eduardomarcelo03@gmail.com',
      phone: '+56 9 5414 2184',
      location: 'Quilicura, Santiago',
      linkedin: 'https://linkedin.com/in/eduardo-garay-9b067b16b',
      github: 'https://github.com/EduardoGaray57',
    },
  };

  beforeEach(() => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), ProfileService],
    });
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  function createService(): ProfileService {
    return TestBed.inject(ProfileService);
  }

  it('should be created', () => {
    const service = createService();
    httpMock.expectOne('assets/data/profile.json');
    expect(service).toBeTruthy();
  });

  it('should start in loading state', () => {
    const service = createService();
    expect(service.loading()).toBe(true);
    expect(service.loaded()).toBe(false);
    expect(service.data()).toBeNull();
    expect(service.error()).toBeNull();
    httpMock.expectOne('assets/data/profile.json');
  });

  it('should transition from loading to loaded on success', () => {
    const service = createService();
    const req = httpMock.expectOne('assets/data/profile.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockProfile);
    expect(service.loading()).toBe(false);
    expect(service.loaded()).toBe(true);
    expect(service.data()).toEqual(mockProfile);
    expect(service.error()).toBeNull();
  });

  it('should transition from loading to error on HTTP failure', () => {
    const service = createService();
    const req = httpMock.expectOne('assets/data/profile.json');
    req.error(new ProgressEvent('Network error'), {
      status: 404,
      statusText: 'Not Found',
    });
    expect(service.loading()).toBe(false);
    expect(service.loaded()).toBe(false);
    expect(service.data()).toBeNull();
    expect(service.error()).toBeTruthy();
  });

  it('should reload when load() is called again', () => {
    const service = createService();
    httpMock.expectOne('assets/data/profile.json').flush(mockProfile);
    expect(service.loaded()).toBe(true);

    service.load();
    expect(service.loading()).toBe(true);
    expect(service.data()).toBeNull();

    const updatedProfile = { ...mockProfile, fullName: 'Updated Name' };
    httpMock.expectOne('assets/data/profile.json').flush(updatedProfile);
    expect(service.data()?.fullName).toBe('Updated Name');
  });

  it('should display computed signals correctly', () => {
    const service = createService();
    expect(service.loading()).toBe(true);
    httpMock.expectOne('assets/data/profile.json').flush(mockProfile);
    expect(service.loaded()).toBe(true);
    expect(service.data()?.fullName).toBe('Eduardo Marcelo Garay Aguayo');
    expect(service.data()?.contacts.email).toBe('eduardomarcelo03@gmail.com');
    expect(service.data()?.graduatedWithDistinction).toBe(true);
    expect(service.data()?.graduationNote).toBe(5.3);
  });
});
