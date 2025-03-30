import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
// private apiUrl = 'https://qpaypro.marlonruiz.dev/api'; // ✅ Laravel Backend
  //private apiUrl = 'https://marlonruiz.dev/api';
 
  private apiUrl = 'http://localhost:8000/api';
  
  constructor(private http: HttpClient) {}

  login(usuario: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { usuario, password }).pipe(
      tap((res: any) => {
        if (res.token) {
          localStorage.setItem('token', res.token);
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
