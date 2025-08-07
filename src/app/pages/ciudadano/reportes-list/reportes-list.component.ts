import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {
  IonTitle,
  IonToolbar,
  IonHeader,
  IonContent,
  IonCol,
  IonRow,
  IonGrid,
  IonItem,
  IonLabel,
  IonButton,
  IonIcon, 
  IonButtons, 
  IonCardContent, 
  IonCardHeader, 
  IonCard, 
  IonCardTitle,
  IonText,
  IonChip
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-reportes-list',
  templateUrl: './reportes-list.component.html',
  styleUrls: ['./reportes-list.component.scss'],
  standalone: true,
  imports: [
    IonChip,
    IonText,
    IonCardTitle, 
    IonCard, 
    IonCardHeader, 
    IonCardContent, 
    IonButtons, 
    FormsModule,             
    IonTitle,
    IonToolbar,
    IonHeader,
    IonContent,
    IonCol,
    IonRow,
    IonGrid,
    IonItem,
    IonLabel,
    IonButton,
    IonIcon
  ]
})
export class ReportesListComponent {
  
  // Propiedades para paginación
  paginaActual: number = 1;
  reportesPorPagina: number = 5;

  reportes = [
    {
      nombre: 'Diana',
      apellidos: 'Hernández',
      correo: 'diana@example.com',
      telefono: '9511234567',
      tipo: 'Queja',
      categoria: 'Vial',
      descripcion: 'Bache en la calle principal'
    },
    {
      nombre: 'Carlos',
      apellidos: 'Gómez',
      correo: 'carlos@example.com',
      telefono: '9517654321',
      tipo: 'Sugerencia',
      categoria: 'Seguridad',
      descripcion: 'Más patrullaje nocturno'
    },
    {
      nombre: 'Luis',
      apellidos: 'Mendoza',
      correo: 'luis@example.com',
      telefono: '9511122334',
      tipo: 'Queja',
      categoria: 'Servicios',
      descripcion: 'Falla en alumbrado público'
    },
    {
      nombre: 'Ana',
      apellidos: 'Martínez',
      correo: 'ana@example.com',
      telefono: '9515566778',
      tipo: 'Queja',
      categoria: 'Vial',
      descripcion: 'Semáforo dañado'
    },
    {
      nombre: 'Pedro',
      apellidos: 'López',
      correo: 'pedro@example.com',
      telefono: '9519988776',
      tipo: 'Sugerencia',
      categoria: 'Servicios',
      descripcion: 'Mejorar recolección de basura'
    },
    {
      nombre: 'María',
      apellidos: 'García',
      correo: 'maria@example.com',
      telefono: '9513344556',
      tipo: 'Queja',
      categoria: 'Seguridad',
      descripcion: 'Falta de vigilancia en parque'
    }
  ];

  constructor(private router: Router) {}

  // Getter para calcular el total de páginas
  get totalPaginas(): number {
    return Math.ceil(this.reportes.length / this.reportesPorPagina);
  }
  
  // Método para obtener los reportes de la página actual
  reportesPaginados(): any[] {
    const inicio = (this.paginaActual - 1) * this.reportesPorPagina;
    const fin = inicio + this.reportesPorPagina;
    return this.reportes.slice(inicio, fin);
  }
  
  // Método para ir a la página anterior
  paginaAnterior(): void {
    if (this.paginaActual > 1) {
      this.paginaActual--;
    }
  }
  
  // Método para ir a la página siguiente
  paginaSiguiente(): void {
    if (this.paginaActual < this.totalPaginas) {
      this.paginaActual++;
    }
  }

  irAInicio() {
    this.router.navigate(['/inicio']);
  }

  cerrarSesion() {
    console.log('Sesión cerrada');
    this.router.navigate(['/login']);
  }
}