import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {
  private apiUrl = 'https://reporteciudadanoback-production-e324.up.railway.app/api';
  private http = inject(HttpClient);

  constructor() {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  enviarReporte(formData: FormData): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post(`${this.apiUrl}/reportes`, formData, { headers });
  }

  obtenerReportes(): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get(`${this.apiUrl}/reportes`, { headers });
  }

  actualizarEstado(id: number, estado: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.patch(`${this.apiUrl}/reportes/${id}/estado`, { estado }, { headers });
  }
}
