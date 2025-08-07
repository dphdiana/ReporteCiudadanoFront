import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

interface UserProfile {
  // Define la estructura de tu perfil de usuario
  id: number;
  name: string;
  email: string;
  // ... otras propiedades
}
interface RegisterData {
  nombre: string;
  correo: string;
  password: string;
  tipo_usuario: string; // Añade esta propiedad
}

interface LoginResponse {
  access_token: string;
  // ... otras propiedades de respuesta
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://reporteciudadanoback-production-e324.up.railway.app/api'; // Cambia esto a tu URL de API real
  private storageReady = new Promise<void>(resolve => {
    this.storage.create().then(() => resolve());
  });
  
  public user = new BehaviorSubject<UserProfile | null>(null);
  private authHeaders!: HttpHeaders;

  constructor(private http: HttpClient, private storage: Storage) {
    this.init();
  }

  private async init() {
    await this.storageReady;
    const token = await this.storage.get('token');
    if (token) {
      this.setAuthHeaders(token);
      await this.loadUserProfile();
    }
  }

  private setAuthHeaders(token: string) {
    this.authHeaders = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  login(correo: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, { correo, password }).pipe(
      tap(async (res) => {
        await this.storageReady;
        await this.storage.set('token', res.access_token);
        this.setAuthHeaders(res.access_token);
        await this.loadUserProfile();
      }),
      catchError(this.handleError)
    );
  }

  private async loadUserProfile(): Promise<void> {
    try {
      const user = await this.http.get<UserProfile>(`${this.apiUrl}/perfil`, { 
        headers: this.authHeaders 
      }).toPromise();
      
      this.user.next(user || null);
    } catch (error) {
      await this.logout();
    }
  }

  async logout(): Promise<void> {
    await this.storageReady;
    await this.storage.remove('token');
    this.user.next(null);
    this.authHeaders = null!;
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Error desconocido';
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error del lado del servidor
      errorMessage = `Código: ${error.status}\nMensaje: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

  async isAuthenticated(): Promise<boolean> {
    await this.storageReady;
    const token = await this.storage.get('token');
    return !!token;
  }

 register(data: { nombre: string; correo: string; password: string }): Observable<LoginResponse> {
  return this.http.post<LoginResponse>(`${this.apiUrl}/register`, data).pipe(
    tap(async (res) => {
      await this.storageReady;
      await this.storage.set('token', res.access_token);
      this.setAuthHeaders(res.access_token);
      await this.loadUserProfile();
    }),
    catchError(this.handleError)
  );
}

}