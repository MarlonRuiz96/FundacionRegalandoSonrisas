import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QpayproService {
  private apiUrl = 'https://sandboxpayments.qpaypro.com/checkout/register_transaction_store';

  constructor(private http: HttpClient) {}

  procesarPago(paymentData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(this.apiUrl, paymentData, { headers });
  }
}
