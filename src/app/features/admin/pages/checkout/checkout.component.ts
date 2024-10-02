import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { CartService } from '../product/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class CheckoutComponent implements OnInit, OnDestroy {
  items: any = [];
  ngOnDestroy(): void {
    console.log('has been removed');
  }
  constructor(private service: CartService) {
    //this.service= new CartService();
  }
  ngOnInit(): void {
    this.items = this.service.getItems();
  }
}
