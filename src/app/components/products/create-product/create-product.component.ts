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
  categories_list:any;
  subCategories_list:any;

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
      subcategory:'',
      image:''
    })
    this.getCategories();
  }

  getProducts(){
    const token = localStorage.getItem("auth")
    this.ProductService.getProducts(token).subscribe({
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



  getCategories() {
    const token = localStorage.getItem("auth")

    this.ProductService.getCategories(token).subscribe({
      next:response=>{
          this.categories_list = response;
          console.log(response,"cat");
      }
    })
  }


  onClickCategory(cat_id:string){
      const token = localStorage.getItem("auth")
      this.ProductService.getSubCategories(token,cat_id).subscribe({
        next:res=>{
          this.subCategories_list = res
        }
      })
  }

}
