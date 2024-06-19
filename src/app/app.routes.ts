import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/app/board',
    pathMatch: 'full',
  },
  {
    path: 'app',
    data: {
      title: 'Angular Jira Clone',
    },
    loadComponent: () =>
      import('./features/admin/layouts/main-layout/main-layout.component').then(
        (m) => m.MainLayoutComponent
      ),
    loadChildren: () =>
      import('./features/admin/layouts/main-layout/main-layout.routes').then(
        (m) => m.mainRoutes
      ),
  },
  {
    path: 'auth',

    loadComponent: () => import('./features/admin/auth/auth.component'),
    loadChildren: () =>
      import('./features/admin/auth/auth.routes').then((m) => m.AUTH_ROUTES),
  },
];
