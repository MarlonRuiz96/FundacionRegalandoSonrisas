import { TestBed } from '@angular/core/testing';

import { QpayproService } from './qpaypro.service';

describe('QpayproService', () => {
  let service: QpayproService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QpayproService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
