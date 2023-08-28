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
  selectedFiles:any;

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
      image: [] as File[]
    })
    this.getCategories();
  }

  onFileChange(event:any){
    if(event.target.files.length>0){
      this.selectedFiles = event.target.files;
    }
  }

  getProducts(){
    const token = localStorage.getItem("auth")
    this.ProductService.getProducts(token).subscribe({
      next:res=>{console.log(res);
      }
    })
  }

  addProducts(event:any,prodData:any){
    event.preventDefault();
    const productData = new FormData();
    productData.append('name', this.addProductFormGroup.value.name);
    productData.append('description', this.addProductFormGroup.value.description);
    productData.append('quantity', this.addProductFormGroup.value.quantity);
    productData.append('price', this.addProductFormGroup.value.price);
    productData.append('category', this.addProductFormGroup.value.category);
    productData.append('subcategory', this.addProductFormGroup.value.subcategory);


    for (let img of this.selectedFiles){
      productData.append('image',img);
      }

      const token = localStorage.getItem("auth")
      this.ProductService.addNewProduct(token,productData).subscribe({
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
