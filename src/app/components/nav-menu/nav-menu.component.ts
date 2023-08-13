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

  constructor(
    private authservice:AuthService,
    private router:Router,
    private cartService:CartService,
    private drawerService: ToggleService) { }

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
        }  })
    }
  }

  getCartDetails(){
    this.cartService.getCartCount().subscribe((count) => {
      this.cartItemCount = count;
      if(this.cartItemCount === undefined){
        this.cartItemCount = 0;
      }
    });
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


  toggleDrawer() {
    this.drawerService.toggleDrawer();
  }

  logoutUser(){
    window.localStorage.clear(); //try this to clear all local storage
    window.location.reload();
  }

}
