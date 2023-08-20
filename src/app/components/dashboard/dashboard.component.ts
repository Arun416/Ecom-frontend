import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { token } from 'src/app/helpers/app.consts';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ProductService } from 'src/app/services/product/product.service';
import { ToggleService } from 'src/app/services/toggle/toggle.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @ViewChild(MatDrawer) drawer!: MatDrawer;
  message:any = '';
  userRole:any;
  loading:boolean = false;
  constructor(private drawerService: ToggleService,
              private authservice:AuthService,
              private productService:ProductService,) { }

  ngOnInit(): void {
    const tokenId = localStorage.getItem("auth");
    this.authservice.getUsers(tokenId).subscribe({
      next:(res:any)=>{
        this.userRole = res.data.role
        this.authservice.updateUser(this.userRole);
        console.log(this.userRole,"role data")
        this.message = `Hey Seller, ${res.data.username}`
      },
      error:(err)=>{
          this.message = "you are not logged in"
    }
    })


    this.drawerService.getToggleObservable().subscribe(() => {
      // Toggle the mat-drawer here
      this.drawer.toggle();
    });


  }

}
