import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ProductService } from 'src/app/services/product/product.service';
import { EditProductComponent } from './edit-product/edit-product.component';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogComponent } from '../confirmation-dialog/dialog/dialog.component';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  message:any = '';
  products:any;
  userRole:any;
  id:any;
  loading:boolean = false;


  constructor(private authservice:AuthService,
              private productService:ProductService,
              public dialog: MatDialog,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {

    const token = localStorage.getItem("auth")
    this.authservice.getUsers(token).subscribe({
        next:(res:any)=>{
          this.userRole = res.data.role
          this.message = `Hey Seller, ${res.data.username}`

        },
        error:(err)=>{
            this.message = "you are not logged in"
      }
    })
  }


}




