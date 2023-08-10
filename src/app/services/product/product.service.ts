import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from 'src/app/helpers/app.consts';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }

  getProducts(token:any,categoryQuery:any){
    const headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization': `Bearer ${token}`
    })
    const params = new HttpParams().set('category', categoryQuery);
    return this.http.get(`${BASE_URL}/product`,{params,headers: headers});
  }


  getProduct(token:any,product_Id:any)  {
    const headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.get("http://localhost:5000/product/"+product_Id,{headers: headers});
  }

  addNewProduct(token:any,productData:any) {
    const headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.post("http://localhost:5000/product",productData,{headers: headers});
  }

  updateProduct(token:any,id:any,productData:any) {
    const headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.patch("http://localhost:5000/product/"+id,productData,{headers: headers});
  }

  deleteProduct(token:any,id:any) {
    const headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.delete("http://localhost:5000/product/"+id,{headers: headers});
  }

  searchProducts(token:any,query:any){
    const headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization': `Bearer ${token}`,
    })
    const params = new HttpParams().set('name', query);
    return this.http.get(`${BASE_URL}/search-product`,{params,headers: headers});
  }




}
