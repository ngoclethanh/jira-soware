import { Injectable } from "@angular/core";

export interface ProductModel {
    sku: string;
    name: string;
    price: number;
  }
  
 export interface CartItem {
    product: ProductModel;
    quantity: number;
  }
  @Injectable()
export class CartService2{
    counter=0;
    constructor(){
    }
    selectedProducts: CartItem[] = [];
  calculateTotal(): number {
    return this.selectedProducts.reduce(
      (total, item) => item.product.price * item.quantity + total,
      0
    );
  }
  addToCart(): void {
    // logic here
  }
  incCounter(){
    this.counter+=5;
  }
  decCounter(){
    this.counter-=5;
  }
}