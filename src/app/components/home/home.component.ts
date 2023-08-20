import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  productList:any;
  products:any;

  constructor(private authservice:AuthService,
    private productService:ProductService,
    private route: ActivatedRoute,
    private router: Router) { }


  ngOnInit(): void {
    this.getAllProducts()
  }

  getAllProducts()  {
    const token = localStorage.getItem("auth")
  /*   this.productService.showProductsArrivals('').subscribe({
    next:(res:any)=>{
    this.productList = res
    this.products = res.product
    }
    }) */
  }

  viewProduct(){
    const token = localStorage.getItem("auth")
    if(!token){
      this.router.navigate(['/login'])
    }
  }


}
