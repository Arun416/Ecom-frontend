import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';


@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
  isLoginned:any;
  loginedUser:any
  constructor(private authservice:AuthService,private router:Router) { }

  ngOnInit(): void {
  }

  loggedIn() {
    this.isLoginned = localStorage.getItem("auth");
    return this.isLoginned
  }

  getUserData(){
    return this.authservice.decodeToken();
  }

  logoutUser(){

    window.localStorage.clear(); //try this to clear all local storage
    window.location.reload();
  }

}
