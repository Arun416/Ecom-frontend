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
import { ToggleService } from 'src/app/services/toggle/toggle.service';
import { MatDrawer } from '@angular/material/sidenav';


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  @ViewChild(MatDrawer) drawer!: MatDrawer;
  message:any = '';
  products:any;
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
  categories: string[] = ['All Products','tshirts', 'bags', 'shirts','shoes'];
  selectedCategory: string = '';
  loading:boolean = false

  constructor(
    private authservice:AuthService,
    private productService:ProductService,
    private cartService:CartService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private drawerService: ToggleService,
   ) { }

  ngOnInit(): void {
    this.getAllProducts();
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

    this.drawerService.getToggleObservable().subscribe(() => {
      // Toggle the mat-drawer here
      this.drawer.toggle();
    });

  }

  getAllProducts()  {
    this.loading = true
    const token = localStorage.getItem("auth")
    this.productService.getProducts(token,'').subscribe({
    next:(res:any)=>{
    this.productList = res
    this.products = res.product
    this.loading = false
    }
    })
  }

  onCategoryChange(selectedCategory: string) {
    // You can perform any action here, like fetching products based on the selected category
    console.log('Selected category:', selectedCategory);
    const token = localStorage.getItem("auth")
    if(selectedCategory === 'All Products'){
      this.productService.getProducts(token,'').subscribe({
        next:(res:any)=>{
        this.productList = res
        this.products = res.product
        }
        })
    }
    else{
    this.productService.getProducts(token,selectedCategory).subscribe({
    next:(res:any)=>{
    this.productList = res
    this.products = res.product
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
cart_item:any;


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
      this.cartService.fetchCartCount(token);
      this.cartService.getCartData(token).subscribe({
        next:(res:any)=>{
            this.cart_item = res.cartItems
            this.cartService.updateCartCount(res.cartItems.length);
            this.cartService.fetchCartCount(token);
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
