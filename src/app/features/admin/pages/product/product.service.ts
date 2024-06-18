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
  @Injectable({
    providedIn: 'root',
  })
export class CartService{
  private items:any = [];
    constructor(){
    }
    counter=0
    selectedProducts: CartItem[] = [];
  calculateTotal(): number {
    return this.selectedProducts.reduce(
      (total, item) => item.product.price * item.quantity + total,
      0
    );
  }
 
  addToCart(product:any) {
    this.items.push(product);
    console.log(this.items);
    
  }

  getItems():void {
    console.log(this.items);
    
    return this.items;
  }

  clearCart() {
    this.items = [];
    return this.items;
  }
  incCounter(){
    this.counter+=1;
  }
  decCounter(){
    this.counter-=1;
  }
}