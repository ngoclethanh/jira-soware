import { Route } from '@angular/router';
import { LoginComponent } from './login/login.component';


export const AUTH_ROUTES: Route[] = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
 
];
export default AUTH_ROUTES;
