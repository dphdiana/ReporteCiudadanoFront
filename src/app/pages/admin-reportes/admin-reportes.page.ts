import { Component, OnInit, inject } from '@angular/core';
import { ReporteService } from 'src/app/services/reporte.service';
import { CommonModule } from '@angular/common';
import { 
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonText,
  IonSelect, 
  IonSelectOption
} from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-reportes',
  standalone: true,
  templateUrl: './admin-reportes.page.html',
  styleUrls: ['./admin-reportes.page.scss'],
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonText,
    IonSelect,
    IonSelectOption
  ]
})
export class AdminReportesPage implements OnInit {
  private reporteService = inject(ReporteService);
  reportes: any[] = [];

  estados = ['pendiente', 'en_proceso', 'resuelto', 'rechazado'];

  ngOnInit() {
    this.cargarReportes();
  }

  cargarReportes() {
    this.reporteService.obtenerReportes().subscribe({
      next: (res) => this.reportes = res,
      error: (err) => console.error('Error al cargar reportes', err)
    });
  }

  actualizarEstado(id: number, nuevoEstado: string) {
    this.reporteService.actualizarEstado(id, nuevoEstado).subscribe({
      next: (res) => {
        console.log('Estado actualizado', res);
        this.cargarReportes(); // recargar la lista
      },
      error: (err) => console.error('Error al actualizar estado', err)
    });
  }
}