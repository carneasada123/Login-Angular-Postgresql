// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient) { }

  login(correo: string, clave: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { correo, clave });
  }

  register(correo: string, clave: string, nombre: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, { correo, clave, nombre });
  }


  setUser(user: any): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  getUser(): any {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  }

  logout(): void {
    localStorage.removeItem('currentUser');
  }
}

