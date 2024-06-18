import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CartService } from './product.service';
import { CheckoutComponent } from '../checkout/checkout.component';
import { Router, RouterModule } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CheckoutComponent,RouterModule,MatButtonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  //providers:[{provide:CartService,useClass:CartService2  }]
})
export class ProductComponent {
  products = [
    { id: 1, name: 'kem chống nắng ', price: 1500 },
    { id: 1, name: 'kem chống nắng ', price: 1500 },
    { id: 1, name: 'kem chống nắng ', price: 1500 },
  ];
  constructor(public cartService:CartService,private router:Router) {
  }
  asc() {
    this.cartService.incCounter();
  }
  desc() {
    this.cartService.decCounter();
  }
  addToCart(product:any) {
    
    this.cartService.addToCart(product);

  }
  redirect(){
    this.router.navigateByUrl('/admin/checkout')

  }
}
