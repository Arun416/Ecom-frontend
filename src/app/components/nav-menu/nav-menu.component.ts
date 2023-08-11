import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { token } from 'src/app/helpers/app.consts';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CartService } from 'src/app/services/cart/cart.service';


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
  constructor(
    private authservice:AuthService,
    private router:Router,
    private cartService:CartService) { }

  ngOnInit(): void {
    this.getUserDetails();
    this.getCartDetails();
  }


  getUserDetails(){
    const token = localStorage.getItem("auth");
    if(token){
      this.authservice.getUsers(token).subscribe({
        next:(res:any)=>{
                this.users = res.data
                this.user_role = this.users.role
                console.log(this.user_role);
        }
        })
    }

  }

  cart_item:any;
  getCartDetails(){
    this.cartService.getCartData(token).subscribe({
      next:(res:any)=>{
          console.log(res);
          this.cart_item = res.cartItems
      }
    })
  }

  loggedIn() {
    this.isLoginned = localStorage.getItem("auth");
    return this.isLoginned
  }

  getUserData(){
    return this.authservice.decodeToken();
  }

  shopProduct(){
    if(this.loggedIn()){
      this.router.navigate(['/dashboard']);
    }
    else {
      this.router.navigate(['/login'])
    }
  }

  logoutUser(){
    window.localStorage.clear(); //try this to clear all local storage
    window.location.reload();
  }

}
