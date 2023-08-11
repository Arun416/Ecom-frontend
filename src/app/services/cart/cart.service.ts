import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from 'src/app/helpers/app.consts';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http:HttpClient) { }


  addCart(token:any,productId:any,productName:any) {
    const headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization': `Bearer ${token}`
    })

    return this.http.post(`${BASE_URL}/add-to-cart/${productId}`,productName,{headers:headers})
  }


  getCartData(token:any):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization': `Bearer ${token}`
    })

    return this.http.get(`${BASE_URL}/cart`,{headers:headers})
  }

}
