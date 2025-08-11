import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'register',
    pathMatch: 'full', // Muy importante para que redirija correctamente
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/ciudadano/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./pages/ciudadano/register/register.component').then((m) => m.RegisterComponent),
  },
  {
    path: 'formulario-reporte',
    loadComponent: () =>
      import('./pages/formulario-reporte/formulario-reporte.page').then((m) => m.FormularioReportePage),
  },
  {
    path: 'admin-reportes',
    loadComponent: () =>
      import('./pages/admin-reportes/admin-reportes.page').then((m) => m.AdminReportesPage),
  },  {
    path: 'admin-map',
    loadComponent: () => import('./pages/admin-map/admin-map.page').then( m => m.AdminMapPage)
  },

];
