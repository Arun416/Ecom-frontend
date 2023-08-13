import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { token } from 'src/app/helpers/app.consts';
import { CartService } from 'src/app/services/cart/cart.service';
import { ToggleService } from 'src/app/services/toggle/toggle.service';

@Component({
  selector: 'app-cart-sidenav',
  templateUrl: './cart-sidenav.component.html',
  styleUrls: ['./cart-sidenav.component.css']
})
export class CartSidenavComponent implements OnInit {
  @ViewChild(MatDrawer) drawer!: MatDrawer;
  cart_Products:any;
  totalCartPrice: number = 0;
  totalPrice:any=0;

  constructor(
    private cartService:CartService,
    private drawerService: ToggleService,) { }

  ngOnInit(): void {
    this.getCartProducts();
    this.drawerService.getToggleObservable().subscribe(() => {
      // Toggle the mat-drawer here
      this.drawer?.toggle();
    });
  }


  getCartProducts(){
    this.cartService.getCartData(token).subscribe({
      next:(res:any)=>{
        this.cartService.getCartItems().subscribe((items) => {
          this.cart_Products = items;
        });  }
    })
  }


  removeCartFromItems(product_id:any){
      this.cartService.removeCartItems(token,product_id).subscribe((items:any) => {
        console.log("deleted",items.message);
        this.cartService.getCartData(token).subscribe({
          next:(res:any)=>{
          console.log(res,"after fetch data");
          this.cart_Products = res.cartItems ;
          this.cartService.updateCartCount(res.cartItems.length);
          }
      });

    })
  }

  calculateTotalPrice(): number {
    let total = 0;
    for (const item of this.cart_Products) {
      total += item.product_id.price * item.quantity;
    }
    return total;
  }

  toggleDrawerClose() {
    this.drawerService.toggleDrawer();
  }

}
