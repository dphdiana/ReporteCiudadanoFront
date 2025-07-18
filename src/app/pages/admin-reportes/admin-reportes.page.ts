import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  IonCard, IonList, IonItem, IonLabel, IonButton, 
  IonHeader, IonToolbar, IonTitle, IonContent, 
  IonCardHeader, IonCardTitle, IonCardContent 
} from '@ionic/angular/standalone';
import { BaseChartDirective } from 'ng2-charts';
import { ChartData, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-admin-reportes',
  standalone: true,
  imports: [
    CommonModule,
    // Componentes Ionic
    IonCard, IonList, IonItem, IonLabel, IonButton,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonCardHeader, IonCardTitle, IonCardContent,
    // Componente de gráficos
    BaseChartDirective
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
  reportesRecientes = [
    { nombre: 'Juan Pérez', tipo: 'Queja', categoria: 'Vial' },
    { nombre: 'Ana Gómez', tipo: 'Sugerencia', categoria: 'Servicios' },
    { nombre: 'Luis Torres', tipo: 'Queja', categoria: 'Seguridad' },
  ];

  // Configuración de la gráfica de dona
  graficaData: ChartData<'doughnut'> = {
    labels: ['Quejas', 'Sugerencias'],
    datasets: [
      {
        data: [this.totalQuejas, this.totalSugerencias],
        backgroundColor: ['#FF6384', '#36A2EB'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB'],
        borderWidth: 0
      }
    ]
  };

  // Opciones de la gráfica
  graficaOpciones: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          font: {
            size: 14
          },
          padding: 20
        }
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = context.raw || 0;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = Math.round((Number(value) / total) * 100);
            return `${label}: ${value} (${percentage}%)`;
          }
        }
      }
    },
    cutout: '70%'
  };

  constructor() { }

  ngOnInit() {
    // Aquí podrías cargar datos reales desde un servicio
    this.cargarDatos();
  }

  cargarDatos() {
    // Ejemplo de cómo actualizar datos dinámicamente
    // this.servicioReportes.obtenerEstadisticas().subscribe(data => {
    //   this.totalQuejas = data.quejas;
    //   this.totalSugerencias = data.sugerencias;
    //   this.actualizarGrafica();
    // });
  }

  actualizarGrafica() {
    this.graficaData = {
      ...this.graficaData,
      datasets: [
        {
          ...this.graficaData.datasets[0],
          data: [this.totalQuejas, this.totalSugerencias]
        }
      ]
    };
  }
}