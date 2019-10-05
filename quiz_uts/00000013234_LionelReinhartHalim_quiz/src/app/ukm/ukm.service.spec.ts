import { TestBed } from '@angular/core/testing';

import { UkmService } from './ukm.service';

describe('UkmService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UkmService = TestBed.get(UkmService);
    expect(service).toBeTruthy();
  });
});
