import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt'
import { BASE_URL } from 'src/app/helpers/app.consts';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http:HttpClient) { }

  register(user:any){
    return this.http.post(`${BASE_URL}/signup`,user);
  }

  login(user:any) {
    return this.http.post(`${BASE_URL}/login`,user)
  }

  getUsers(token:any){
    const headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.get(`${BASE_URL}/user`,{headers: headers});
  }

  getToken(){
    return localStorage.getItem("auth")
  }

  isloggedIn() {
    return !!localStorage.getItem("auth")
  }

  decodeToken(){
    const jwtHelper = new JwtHelperService();

    const token = this.getToken()!;
    return jwtHelper.decodeToken(token);
  }

   profile(token:any,user_id:any,formData:any){
    const headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.patch("http://localhost:5000/user/"+user_id+"/profile",formData,{headers: headers});
  }
}
