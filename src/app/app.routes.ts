import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./pages/ciudadano/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: '',
    redirectTo: 'login',
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
    {
    path: 'login',
    loadComponent: () => import('./pages/ciudadano/login/login.component').then( m => m.LoginComponent)
  },

];