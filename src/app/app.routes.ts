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
    path: 'register',
    loadComponent : () => import('./pages/ciudadano/register/register.component').then( m => m.RegisterComponent)
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
    path: 'reportes-list',
    loadComponent: () => import('./pages/ciudadano/reportes-list/reportes-list.component').then( m => m.ReportesListComponent)
  },
];