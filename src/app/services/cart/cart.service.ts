import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BASE_URL, token } from 'src/app/helpers/app.consts';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItemList:any[] = [];
  private cartCountSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  private cartItemsSubject: BehaviorSubject<any> = new BehaviorSubject([]);

  constructor(private http:HttpClient) {}

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


  removeCartItems(token:any,productId:any) {
    const headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.delete(`${BASE_URL}/cart/${productId}`,{headers:headers})
  }

  Emptycart(token:any){
    const headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.patch(`${BASE_URL}/cart/empty`,{headers:headers})
  }

  updateCartCount(countItems: any) {
    this.cartCountSubject.next(countItems);
  }

  getCartCount(): Observable<number> {
    return this.cartCountSubject.asObservable();
  }

  fetchCartItems(token:any) {
    const headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization': `Bearer ${token}`
    })
    this.http.get(`${BASE_URL}/cart`,{headers:headers}).subscribe((items:any) => {
      this.cartCountSubject.next(items?.cartItems.length);
      this.cartItemsSubject.next(items?.cartItems);
    });
  }

  getCartItems(): Observable<any> {
    return this.cartItemsSubject.asObservable();
  }



}
