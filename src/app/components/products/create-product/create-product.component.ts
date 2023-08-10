import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product/product.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {
  addProductFormGroup!:FormGroup;
  constructor(private ProductService:ProductService,
              private fb: FormBuilder,
              private router:Router) { }

  ngOnInit(): void {
    this.addProductFormGroup = this.fb.group({
      name:'',
      description:'',
      quantity:1,
      price:'',
      category:'',
      image:''
    })
  }

  getProducts(){
    const token = localStorage.getItem("auth")
    this.ProductService.getProducts(token,'').subscribe({
      next:res=>{console.log(res);
      }
    })
  }

  addProducts(prodData:any){
      const token = localStorage.getItem("auth")
      this.ProductService.addNewProduct(token,prodData).subscribe({
        next: response=>{
          this.getProducts();
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Product Created Successfully',
            showConfirmButton: false,
            timer: 1500
          })
          this.router.navigate(['/dashboard']);
        },
        error:error=>{}
      })
  }

}
