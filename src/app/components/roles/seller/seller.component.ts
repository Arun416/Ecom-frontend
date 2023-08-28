import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ProductService } from 'src/app/services/product/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EditProductComponent } from '../../products/edit-product/edit-product.component';
import { DialogComponent } from '../../confirmation-dialog/dialog/dialog.component';
import { token } from 'src/app/helpers/app.consts';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.css']
})
export class SellerComponent implements OnInit {
  message:any = '';
  products:any;
  userRole:any;
  id:any;

  constructor(private authservice:AuthService,
              private productService:ProductService,
              public dialog: MatDialog,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.getAllProducts();
    const tokenid = localStorage.getItem("auth");
    this.authservice.getUsers(tokenid).subscribe({
        next:(res:any)=>{
          this.userRole = res.data.role
            this.message = `Hey Seller, ${res.data.username}`
        },
        error:(err)=>{
            this.message = "you are not logged in"
      }
    })
  }


  getAllProducts()  {
    const tokenid = localStorage.getItem("auth");
    this.productService.getProducts(tokenid).subscribe({
      next:(res:any)=>{
        this.products = res.product
        console.log(this.products);
      }
    })
  }

  openDialog(product_id:any) {
    const dialogRef = this.dialog.open(EditProductComponent,{
      width: '400px',
      data: { id: product_id }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getAllProducts();
      this.getAllProducts();
      this.getAllProducts();
    });
  }


  openConfirmationDialog(product_id:any): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '400px',
      data: {
        title: 'Confirmation',
        message: 'Are you sure you want to Delete the Product',
        id:product_id
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
      this. getAllProducts()
      }
    });
  }

  viewProduct(id:any){
    this.router.navigate(['view-product/'+id])
  }

}
