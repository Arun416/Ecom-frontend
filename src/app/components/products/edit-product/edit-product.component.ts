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
  categories_list:any;
  subCategories_list:any;
  selectedFiles:any;

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
      category:'',
      subcategory:'',
      image: [] as File[]
    });
    this.getCategories();
  }


  getProduct() {
    const token = localStorage.getItem("auth")
    this.ProductService.getProduct(token,this.data.id).subscribe({
      next:(response:any)=>{
        this.editProductFormGroup.setValue({
          name: response.product.name,
          description:response.product.description,
          price:response.product.price,
          category:response.product.category,
          subcategory: response.product.subcategory,
          image: response.product.image,
        })
      }
    })
  }

  onFileChange(event:any){
    if(event.target.files.length>0){
      this.selectedFiles = event.target.files;
    }
  }


  updateProduct(event:any,formData:any){

    event.preventDefault();
    const productData = new FormData();
    productData.append('name', this.editProductFormGroup.value.name);
    productData.append('description', this.editProductFormGroup.value.description);
    productData.append('quantity', this.editProductFormGroup.value.quantity);
    productData.append('price', this.editProductFormGroup.value.price);
    productData.append('category', this.editProductFormGroup.value.category);
    productData.append('subcategory', this.editProductFormGroup.value.subcategory);


    for (let img of this.selectedFiles){
      productData.append('image',img);
    }

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



  getCategories() {
    const token = localStorage.getItem("auth")

    this.ProductService.getCategories(token).subscribe({
      next:response=>{
          this.categories_list = response;
      }
    })
  }


  onClickCategory(cat_id:string){
      const token = localStorage.getItem("auth")
      this.ProductService.getSubCategories(token,cat_id).subscribe({
        next:res=>{
          console.log(res);

          this.subCategories_list = res
        }
      })
  }

}
