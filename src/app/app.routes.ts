import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/admin/dashboard',
    pathMatch: 'full',
  },
  {
    path: 'admin',
    loadComponent: () =>
      import('./features/admin/layouts/main-layout/main-layout.component').then(
        (m) => m.MainLayoutComponent
      ),
      loadChildren: () => import('./features/admin/layouts/main-layout/main-layout.routes').then((m)=>m.mainRoutes),
  },

];
