import { Route } from "@angular/router";

export const mainRoutes:Route[] = [
  {
    path: 'dashboard',
    loadComponent:()=> import('../../pages/dashboard/dashboard.component').then((m)=> m.DashboardComponent),
    canMatch: [],
  },
];
