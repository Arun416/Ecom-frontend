import { Component, OnInit } from '@angular/core';
import { token } from 'src/app/helpers/app.consts';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems$:any;
  displayedColumns: string[] = ['Product', 'Name', 'Quantity', 'Price','Actions'];
  constructor(private cartService:CartService) { }

  ngOnInit(): void { this.getCartItemProduct()
  }

  getCartItemProduct(){
    this.cartService.getCartData(token).subscribe({
      next:(res:any)=>{
          this.cartItems$ = res?.cartItems
      }
    })
  }

  calculateTotalPrice(): number {
    let total = 0;
    for (const item of this.cartItems$) {
      total += item.product_id.price * item.quantity;
    }
    return total;
  }


}
