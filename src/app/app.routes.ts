import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'formulario-reporte',
    loadComponent: () => import('./pages/formulario-reporte/formulario-reporte.page').then( m => m.FormularioReportePage)
  },
  {
    path: 'admin-reportes',
    loadComponent: () => import('./pages/admin-reportes/admin-reportes.page').then( m => m.AdminReportesPage)
  },
];
