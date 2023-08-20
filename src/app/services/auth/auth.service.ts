import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService} from '@auth0/angular-jwt'
import { BehaviorSubject, Observable} from 'rxjs';
import { map} from 'rxjs/operators'
import { BASE_URL } from 'src/app/helpers/app.consts';
import { TokenStorageService } from '../token-storage/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userDataShared: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  private userSubject: BehaviorSubject<any>;
  public user: Observable<any>;

  constructor(private http:HttpClient, private _token: TokenStorageService) {
    this.userSubject = new BehaviorSubject<any>(this._token.getUser());
    this.user = this.userSubject.asObservable();
   }

   getUser() {
    console.log(this.userSubject);
    console.log(this.userSubject.value);
    return this.userSubject.value;
  }

  register(user:any){
    return this.http.post(`${BASE_URL}/signup`,user);
  }

  login(user_data:any) {
    return this.http.post(`${BASE_URL}/login`,user_data).pipe(
      map((res: any) => {
        let user = {
          email: user_data.email,
          token: res.token,
        };
        this._token.setToken(res.token);
        // this._token.setUser(res.data[0]);
        localStorage.setItem("auth",res.token);
        console.log(res);
        this.userSubject.next(user);
        return user;
      })
    );
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

  updateUser(user_data: any) {
    this.userDataShared.next(user_data);
  }

  getUserData(): Observable<any> {
    return this.userDataShared.asObservable();
  }

  logout() {
    this._token.clearStorage();
    this.userSubject.next(null);
  }
}
