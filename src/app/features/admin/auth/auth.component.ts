import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [RouterModule],
  template:`<router-outlet></router-outlet>`
})
export default class AuthComponent {
    
}
