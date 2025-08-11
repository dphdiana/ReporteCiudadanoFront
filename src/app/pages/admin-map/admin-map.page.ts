import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReporteService } from 'src/app/services/reporte.service';

declare var google: any; // Declaración para TypeScript

@Component({
  selector: 'app-admin-map',
  standalone: true,
  templateUrl: './admin-map.page.html',
  styleUrls: ['./admin-map.page.scss'],
  imports: [CommonModule, IonicModule]
})
export class AdminMapPage implements OnInit, OnDestroy {
  private reporteService = inject(ReporteService);
  map: any;
  markers: any[] = [];
  pollInterval = 30000; // 30 segundos
  private pollTimer: any;

  async ngOnInit() {
    await this.loadGoogleMaps();
    this.initMap();
    this.startPolling();
  }

  ngOnDestroy() {
    this.stopPolling();
  }

  private loadGoogleMaps(): Promise<void> {
    return new Promise((resolve) => {
      if (typeof google !== 'undefined') {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=TU_API_KEY&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => resolve();
      document.head.appendChild(script);
    });
  }

  private initMap() {
    const mapElement = document.getElementById('map');
    if (!mapElement) return;

    this.map = new google.maps.Map(mapElement, {
      center: { lat: 20.0, lng: -99.0 },
      zoom: 13,
      mapTypeControl: true,
      streetViewControl: false
    });
  }

  private startPolling() {
    this.loadReportes();
    this.pollTimer = setInterval(() => this.loadReportes(), this.pollInterval);
  }

  private stopPolling() {
    if (this.pollTimer) {
      clearInterval(this.pollTimer);
    }
  }

  private loadReportes() {
    this.reporteService.obtenerReportes().subscribe({
      next: (reportes) => this.renderMarkers(reportes),
      error: (err) => console.error('Error al cargar reportes', err)
    });
  }

  private renderMarkers(reportes: any[]) {
    this.clearMarkers();

    reportes.forEach(reporte => {
      if (!reporte.latitud || !reporte.longitud) return;

      const position = new google.maps.LatLng(
        parseFloat(reporte.latitud),
        parseFloat(reporte.longitud)
      );

      const marker = new google.maps.Marker({
        position,
        map: this.map,
        title: reporte.titulo || 'Reporte sin título'
      });

      const infoWindow = new google.maps.InfoWindow({
        content: this.getInfoWindowContent(reporte)
      });

      marker.addListener('click', () => {
        infoWindow.open(this.map, marker);
      });

      this.markers.push(marker);
    });

    this.adjustMapBounds();
  }

  private getInfoWindowContent(reporte: any): string {
    return `
      <div style="min-width: 200px; padding: 8px;">
        <h3 style="margin: 0 0 8px 0; color: #1a73e8;">${reporte.titulo || 'Reporte'}</h3>
        <p style="margin: 0 0 4px 0;"><strong>Categoría:</strong> ${reporte.categoria || 'N/A'}</p>
        <p style="margin: 0 0 4px 0;"><strong>Estado:</strong> ${reporte.estado || 'N/A'}</p>
        <p style="margin: 8px 0 0 0;">${reporte.descripcion?.substring(0, 100) || ''}...</p>
      </div>
    `;
  }

  private adjustMapBounds() {
    if (this.markers.length === 0) return;

    const bounds = new google.maps.LatLngBounds();
    this.markers.forEach(marker => bounds.extend(marker.getPosition()));
    this.map.fitBounds(bounds);

    // Asegurar un zoom máximo si los marcadores están muy cerca
    if (this.map.getZoom() > 15) {
      this.map.setZoom(15);
    }
  }

  private clearMarkers() {
    this.markers.forEach(marker => marker.setMap(null));
    this.markers = [];
  }
}