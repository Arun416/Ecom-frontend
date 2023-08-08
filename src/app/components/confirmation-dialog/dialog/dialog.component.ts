import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductService } from 'src/app/services/product/product.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private ProductService:ProductService) {}

  ngOnInit(): void {
  }

  deleteProduct(){
      const token = localStorage.getItem("auth")
      this.ProductService.deleteProduct(token,this.data.id).subscribe({
        next:response=>{
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Product Deleted',
            showConfirmButton: false,
            timer: 1500
          })
        }
      })
  }

}
