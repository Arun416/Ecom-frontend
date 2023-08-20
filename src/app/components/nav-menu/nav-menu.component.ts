import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { token } from 'src/app/helpers/app.consts';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CartService } from 'src/app/services/cart/cart.service';
import { ToggleService } from 'src/app/services/toggle/toggle.service';


@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
  isLoginned:any;
  loginedUser:any;
  users:any;
  user_role:string;
  cart_item:any;
  cartItemCount: number;
  logIn:any

  constructor(
    private authservice:AuthService,
    private router:Router,
    private cartService:CartService,
    private drawerService: ToggleService) {
      this.logIn =  this.authservice.getToken();
     }

  ngOnInit(): void {
    this.getUserDetails();
    this.getCartDetails();
  }

  loggedIn() {
    this.isLoginned = localStorage.getItem("auth");
    return this.isLoginned
  }

  getUserData(){
    return this.authservice.decodeToken();
  }

   getUserDetails(){
    /* const tokenid = localStorage.getItem("auth")
    if(token!==null){
    this.authservice.getUsers(tokenid).subscribe({
        next:(res:any)=>{
            this.users = res.data
            this.user_role = this.users.role
            console.log(this.user_role,"role data");
        }  })
      } */
      this.authservice.getUserData().subscribe(res=>{
        this.user_role = res;
        const tokenid = localStorage.getItem("auth")
        if(this.user_role === 'user'){
        this.cartService.getCartData(tokenid).subscribe({
          next:(res:any)=>{
            this.cart_item = res.cartItems
            console.log(this.cart_item,"data cat");

            this.cartService.updateCartCount(res.cartItems.length);
            this.cartService.fetchCartItems(token);
        }
    }) }
      })
  }

  getCartDetails(){
    this.cartService.getCartCount().subscribe((count) => {
    this.cartItemCount = count;
    });
  }


  shopProduct(){
    if(this.loggedIn()){
      this.router.navigate(['/dashboard']);
    }
    else {
      this.router.navigate(['/login'])
    }
  }


  toggleDrawer() {
    this.drawerService.toggleDrawer();
  }

  logoutUser(){
    window.localStorage.clear(); //try this to clear all local storage
    window.location.reload();
  }

}
