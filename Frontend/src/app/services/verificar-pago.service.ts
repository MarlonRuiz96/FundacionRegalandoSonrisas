import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VerificarPagoService {

  constructor(private http: HttpClient) {}

  verificarPago(idTrans: string): Observable<any> {
    const payload = {
      x_login: 'visanetgt_qpay',
      x_private_key: '88888888888',
      x_api_secret: '99999999999',
      idTrans: idTrans
    };

    return this.http.post('https://api-sandboxpayments.qpaypro.com/checkout/get_transaction_detail', payload);
  }
}
