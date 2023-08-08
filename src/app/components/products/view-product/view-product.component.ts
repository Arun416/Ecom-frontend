import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {
  product:any;
  constructor(private route: ActivatedRoute,private productService:ProductService,private authService:AuthService) { }

  ngOnInit(): void {
    this.getProduct()
  }

  getProduct(){

    const token = localStorage.getItem("auth");
    let product_id = this.route.snapshot.paramMap.get('id')
    this.productService.getProduct(token,product_id).subscribe({
      next:(response:any)=>{
        this.product = response.product;
      }
      })
  }

}
