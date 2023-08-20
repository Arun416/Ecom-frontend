import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ProductService } from 'src/app/services/product/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2'
import { EditProductComponent } from '../../products/edit-product/edit-product.component';
import { DialogComponent } from '../../confirmation-dialog/dialog/dialog.component';
import { CartService } from 'src/app/services/cart/cart.service';
import { token } from 'src/app/helpers/app.consts';
import { Product } from 'src/app/models/product.model';


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  message:any = '';
  products: Product[];
  userRole:any;
  displayMode:any;
  filters = [
    { id: 1, name: 'New->old' },
    { id: 2, name: 'old->New' },
    { id: 3, name: 'A->Z' },
    { id: 3, name: 'Z->A' },
    // Add more items...
  ];
  searchTerm:string ='';
  productList:any;
  categories: any;
  selectedCategory: string = '';
  loading:boolean = false
  cart_item:any;

  constructor(
    private authservice:AuthService,
    private productService:ProductService,
    private cartService:CartService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
   ) { }

  ngOnInit(): void {
    this.getAllProducts();
    this.getCartData();
    this.getCategories();
     const token = localStorage.getItem("auth")
    this.authservice.getUsers(token).subscribe({
    next:(res:any)=>{
    this.userRole = res.data.role
      this.message = `Hey, ${res.data.username}`
    },
    error:(err)=>{
      this.message = "you are not logged in"
    }
    })
  }

  getCategories() {
    const token_Id = localStorage.getItem("auth")
    this.productService.getCategories(token_Id).subscribe({
      next:response=>{
          this.categories = response;

      }
    })
  }

  getAllProducts()  {
    this.loading = true
    const tokenid = localStorage.getItem("auth");
    this.productService.getProducts(tokenid).subscribe({
    next:(res:any)=>{
    this.productList = res
    this.products = res.product
    this.loading = false
    }
    })
  }

  onCategoryChange(selectedCategory: string) {
    // You can perform any action here, like fetching products based on the selected category
    const token = localStorage.getItem("auth")
      if(selectedCategory === '') {
      this.productService.getProducts(token).subscribe({
        next:(res:any)=>{
        this.productList = res
        this.products = res.product
        }
        })
      }
      else {
      // this.productService.getProducts(token,selectedCategory).subscribe({
      this.productService.getProducts(token).subscribe({
        next:(res:any)=>{
        this.productList = res
        this.products = res.product.filter((product:any) => product.category === this.selectedCategory);
      }
      })
      }

  }

  viewProduct(id:any){
    this.router.navigate(['view-product/'+id])
  }

  onSearchProduct(event: any){
    const search = event.value

    if (search.trim().length === 0) {
      // If search query is empty, show all items
      this.products = this.productList?.product;
    }
    else{
    const token = localStorage.getItem("auth");
    // this.query = this.route.snapshot.paramMap.get('query');
    this.productService.searchProducts(token,search).subscribe({
      next:(response:any)=>{
        this.products = response?.data
      }
    })
  }
}

//cart functions

getCartData() {
  const tokenid = localStorage.getItem("auth")
  if(this.userRole === 'user'){
  this.cartService.getCartData(tokenid).subscribe({
    next:(res:any)=>{
        this.cart_item = res.cartItems
        console.log(this.cart_item,"data cat");
        this.cartService.updateCartCount(res.cartItems.length);
        this.cartService.fetchCartItems(token);
    }
}) }
}


onAddToCart(e:any,prod_id:any,prod_name:any){
  e.stopPropagation();
  const name = {product_name: prod_name}
  this.cartService.addCart(token,prod_id,name).subscribe({
    next:(response:any)=>{
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: response?.message,
        showConfirmButton: false,
        timer: 1000
      })
       this.cartService.fetchCartItems(token);
      this.cartService.getCartData(token).subscribe({
        next:(res:any)=>{
            this.cart_item = res.cartItems
            this.cartService.updateCartCount(res.cartItems.length);
            this.cartService.fetchCartItems(token);
        }
      })
    },
    error:error=>{
      console.log(error);
    }
  })
}





}
