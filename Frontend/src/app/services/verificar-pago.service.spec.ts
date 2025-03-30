import { TestBed } from '@angular/core/testing';

import { VerificarPagoService } from './verificar-pago.service';

describe('VerificarPagoService', () => {
  let service: VerificarPagoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VerificarPagoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
