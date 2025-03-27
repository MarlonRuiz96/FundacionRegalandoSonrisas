import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QpayproService {
  private apiUrl = 'https://api-sandboxpayments.qpaypro.com/checkout/api_v1';

  constructor(private http: HttpClient) {}

  procesarPago(paymentData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(this.apiUrl, paymentData, { headers });
  }
}
