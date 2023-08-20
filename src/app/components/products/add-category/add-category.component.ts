import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { token } from 'src/app/helpers/app.consts';
import { ProductService } from 'src/app/services/product/product.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
  addNewCategoryForm:FormGroup;
  addNewsubCategoryForm:FormGroup;
  categories_list:any;

  constructor(private fb: FormBuilder,private ProductService: ProductService) { }

  ngOnInit(): void {
    this.categoryForms()
    this.getCategories();
  }

  getCategories() {
    this.ProductService.getCategories(token).subscribe({
      next:response=>{
          this.categories_list = response;
      }
    })
  }

  categoryForms() {
    this.addNewCategoryForm = this.fb.group({
      name :''
    })


    this.addNewsubCategoryForm = this.fb.group({
      sub_category : '',
      category_Id: ''
    })
  }


  onSubmiCategory(formdata:any){
      this.ProductService.addcategories(token,formdata).subscribe({
        next:response=>{
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Category Added Successfully',
            showConfirmButton: false,
            timer: 1500
          })
          this.getCategories();
        }
      })
  }


  onSubmisubCategory(formdata:any){
      console.log(formdata,"data");
      this.ProductService.addsubcategories(token,formdata).subscribe({
        next:response=>{
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'subCategory Added Successfully',
            showConfirmButton: false,
            timer: 1500
          })
        }
      })
  }


}
