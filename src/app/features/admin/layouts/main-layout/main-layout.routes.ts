import { Route } from "@angular/router";

export const mainRoutes:Route[] = [
  {
    path: 'dashboard',
    loadComponent:()=> import('../../pages/dashboard/dashboard.component').then((m)=> m.DashboardComponent),
    canMatch: [],
   
      
    
  },
  {
    path: 'board',
    loadComponent:()=> import('../../pages/board/board.component').then((m)=> m.BoardComponent),
    canMatch: [],
     data:{
      title:"Board"
     }
  },
  {
    path: 'project-setting',
    loadComponent:()=> import('../../pages/project-setting/project-setting.component').then((m)=> m.ProjectSettingComponent),
    canMatch: [],
    data:{
      title:"Project setting"
     }
  },
  {
    path: 'product',
    loadComponent:()=> import('../../pages/product/product.component').then((m)=> m.ProductComponent),
    canMatch: [],
  },
  {
    path: 'checkout',
    loadComponent:()=> import('../../pages/checkout/checkout.component').then((m)=> m.CheckoutComponent),
    canMatch: [],
  },
 
];
