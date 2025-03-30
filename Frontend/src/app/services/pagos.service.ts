import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PagosService {
  private apiUrl = 'https://qpaypro.marlonruiz.dev/api'; // ✅ Laravel Backend

  //private apiUrl = 'https://marlonruiz.dev/api';
 // private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  procesarPago(paymentData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
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

  getPagosUSD(): Observable<any> {
    return this.http.get(`${this.apiUrl}/pagos/moneda/usd`);
  }

  getPagosGTQ(): Observable<any> {
    return this.http.get(`${this.apiUrl}/pagos/moneda/gtq`);
  }

  getTotalPagosValidos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/pagos/validos`);
  }

  getTotalPagosPendientes(): Observable<any> {
    return this.http.get(`${this.apiUrl}/pagos/pendientes`);
  }

  getTotalPagosFallidos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/pagos/fallidas`);
  }

  getpagostodosdepartamentos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/pagos/departamento`);
  }

  actualizarpago($referencia: string, $factura: string, $referencia_transaccion: string): Observable<any> {
    const body = {
      referencia: $referencia,
      factura: $factura,
      referencia_transaccion: $referencia_transaccion,
    };

    return this.http.put(`${this.apiUrl}/pagos/actualizar/pendiente`, body);
  }

  actualizarpagospendientes(): Observable<any> {
    return this.http.get(`${this.apiUrl}/pagos/estatus/pendiente`);
  }
}
