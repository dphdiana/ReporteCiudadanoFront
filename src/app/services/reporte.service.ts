import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

interface Reporte {
  id: number;
  titulo: string;
  descripcion: string;
  categoria: string;
  estado: string;
  foto_url: string | null;
  latitud?: number;
  longitud?: number;
  created_at?: string;
  updated_at?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ReporteService {
  private apiUrl = 'https://reporteciudadanoback-production-e324.up.railway.app/api';
  private http = inject(HttpClient);

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    if (!token) {
      console.warn('No se encontró token de autenticación');
    }
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'
    });
  }

  enviarReporte(formData: FormData): Observable<Reporte> {
    const headers = this.getAuthHeaders();
    // No establecer Content-Type para FormData (se genera automáticamente)
    return this.http.post<Reporte>(`${this.apiUrl}/reportes`, formData, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  obtenerReportes(): Observable<Reporte[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<Reporte[]>(`${this.apiUrl}/reportes`, { headers }).pipe(
      map(reportes => reportes.map(reporte => ({
        ...reporte,
        foto_url: this.ensureSecureUrl(reporte.foto_url)
      }))),
      catchError(this.handleError)
    );
  }

  actualizarEstado(id: number, estado: string): Observable<Reporte> {
    const headers = this.getAuthHeaders();
    return this.http.put<Reporte>(
      `${this.apiUrl}/reportes/${id}/estado`, 
      { estado }, 
      { headers }
    ).pipe(
      catchError(this.handleError)
    );
  }

  eliminarReporte(id: number): Observable<{ success: boolean }> {
    const headers = this.getAuthHeaders();
    return this.http.delete<{ success: boolean }>(
      `${this.apiUrl}/reportes/${id}`, 
      { headers }
    ).pipe(
      catchError(this.handleError)
    );
  }

  private ensureSecureUrl(url: string | null): string | null {
    if (!url) return null;
    
    // Si ya es HTTPS o data URI, devolver tal cual
    if (url.startsWith('https://') || url.startsWith('data:')) {
      return url;
    }
    
    // Convertir HTTP a HTTPS
    if (url.startsWith('http://')) {
      return url.replace('http://', 'https://');
    }
    
    // Manejar URLs relativas
    if (url.startsWith('//')) {
      return `https:${url}`;
    }
    
    // Para rutas locales (sin dominio)
    if (url.startsWith('/')) {
      return `${this.apiUrl.replace(/\/api$/, '')}${url}`;
    }
    
    return url;
  }

  private handleError(error: any): Observable<never> {
    console.error('Error en ReporteService:', error);
    
    let errorMessage = 'Ocurrió un error';
    if (error.error?.message) {
      errorMessage = error.error.message;
    } else if (error.status === 0) {
      errorMessage = 'Error de conexión con el servidor';
    } else if (error.status === 401) {
      errorMessage = 'No autorizado - Por favor inicie sesión nuevamente';
    }
    
    return throwError(() => new Error(errorMessage));
  }
}