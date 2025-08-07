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
  IonSelect,
  IonSelectOption,
  IonItem,
  IonLabel,
  IonButton,
  IonIcon, IonButtons } from '@ionic/angular/standalone';

@Component({
  selector: 'app-reportes-list',
  templateUrl: './reportes-list.component.html',
  styleUrls: ['./reportes-list.component.scss'],
  standalone: true,
  imports: [IonButtons, 
    FormsModule,             
    IonTitle,
    IonToolbar,
    IonHeader,
    IonContent,
    IonCol,
    IonRow,
    IonGrid,
    IonSelect,
    IonSelectOption,
    IonItem,
    IonLabel,
    IonButton,
    IonIcon
  ]
})
export class ReportesListComponent {
  categoriaSeleccionada: string = '';

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
    }
  ];

  constructor(private router: Router) {}

  reportesFiltrados() {
    if (!this.categoriaSeleccionada) {
      return this.reportes;
    }
    return this.reportes.filter(r => r.categoria === this.categoriaSeleccionada);
  }

  irAInicio() {
    this.router.navigate(['/inicio']);
  }

  cerrarSesion() {
    console.log('Sesión cerrada');
    this.router.navigate(['/login']);
  }
  
}
