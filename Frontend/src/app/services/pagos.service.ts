import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PagosService {

  private apiUrl = 'https://pruebasgestordetalentos.com/api';

  constructor(private http: HttpClient) {}

  procesarPago(paymentData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(`${this.apiUrl}/pagos`, paymentData, { headers });
}

  getPagos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/pagos`);
  }

  getPago(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/pagos/${id}`);
  }

  eliminarPago(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/pagos/${id}`);
  }
}
