import { inject, Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ReporteService {
  private apiUrl = 'https://api.example.com/reportes'; // Cambia esto por tu URL real
  private http= inject(HttpClient);
  constructor() {}
    enviarReporte(formData: FormData, token: string) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.post(this.apiUrl, formData, { headers });
  }
}
