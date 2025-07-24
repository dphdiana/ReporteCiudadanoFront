import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  IonCard, IonList, IonItem, IonLabel, IonButton, 
  IonHeader, IonToolbar, IonTitle, IonContent, 
  IonCardHeader, IonCardTitle, IonCardContent ,IonText,IonThumbnail,IonImg  
} from '@ionic/angular/standalone';
import { text } from 'ionicons/icons';


@Component({
  selector: 'app-admin-reportes',
  standalone: true,
  imports: [
    CommonModule,IonHeader, IonToolbar, IonTitle, IonContent
    ,IonList,IonLabel,IonItem,IonText,IonThumbnail,IonImg
  ],
  templateUrl: './admin-reportes.page.html',
  styleUrls: ['./admin-reportes.page.scss'],
})
export class AdminReportesPage implements OnInit {
  // Datos estadísticos
  totalReportes = 25;
  totalQuejas = 15;
  totalSugerencias = 10;

  // Lista de reportes recientes
    reportes = [
    {
      nombre: 'Juan Pérez',
      tipo: 'Bache',
      descripcion: 'Hay un bache muy grande en la calle principal.',
      fecha: '2025-07-23',
      foto: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    {
      nombre: 'Ana López',
      tipo: 'Alumbrado',
      descripcion: 'Una lámpara no funciona desde hace 3 semanas.',
      fecha: '2025-07-22',
      foto: 'https://randomuser.me/api/portraits/women/35.jpg'
    },
    {
      nombre: 'Carlos Ramírez',
      tipo: 'Basura',
      descripcion: 'No han recogido la basura en mi colonia.',
      fecha: '2025-07-20',
      foto: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
     {
      nombre: 'Carlos Ramírez',
      tipo: 'Basura',
      descripcion: 'No han recogido la basura en mi colonia.',
      fecha: '2025-07-20',
      foto: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
     {
      nombre: 'Carlos Ramírez',
      tipo: 'Basura',
      descripcion: 'No han recogido la basura en mi colonia.',
      fecha: '2025-07-20',
      foto: 'https://via.placeholder.com/150'
    },
    {
      nombre: 'María García',
      tipo: 'Seguridad',
      descripcion: 'Necesitamos más patrullas en la zona.',
      fecha: '2025-07-19',
      foto: 'https://via.placeholder.com/150'
    }
  ];


  constructor() { }

  ngOnInit() {
   
  }
}