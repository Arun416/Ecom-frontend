import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { token } from 'src/app/helpers/app.consts';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CartService } from 'src/app/services/cart/cart.service';
import { ProductService } from 'src/app/services/product/product.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {
  product:any;
  cart_item:any;
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);

  constructor(private route: ActivatedRoute,
              private productService:ProductService,
              private authService:AuthService,
              private cartService:CartService) { }

  ngOnInit(): void {
    this.getProduct()
  }

  getProduct(){

    const token = localStorage.getItem("auth");
    let product_id = this.route.snapshot.paramMap.get('id')
    this.productService.getProduct(token,product_id).subscribe({
      next:(response:any)=>{
        this.product = response?.product;
      }
      })
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
