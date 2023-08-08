import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product/product.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  editProductFormGroup!:FormGroup;
  constructor(private ProductService:ProductService,
    private fb: FormBuilder,
    private router:Router,
    @Inject(MAT_DIALOG_DATA) public data: any ) { }

  ngOnInit(): void {
    this.getProduct();
    this.editProductFormGroup = this.fb.group({
      name:'',
      description:'',
      price:'',
      image:''
    })
  }


  getProduct() {
    const token = localStorage.getItem("auth")
    this.ProductService.getProduct(token,this.data.id,).subscribe({
      next:(response:any)=>{
        this.editProductFormGroup.setValue({
          name: response.product.name,
          description:response.product.description,
          price:response.product.price,
          image:response.product.image
        })
      }
    })
  }



  updateProduct(productData:any){
    const token = localStorage.getItem("auth")

    this.ProductService.updateProduct(token,this.data.id,productData).subscribe({
      next:response=>{
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Product Updated',
          showConfirmButton: false,
          timer: 1500
        })
      }
    })
  }

}
