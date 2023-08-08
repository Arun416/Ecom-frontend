import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupFormGroup!:FormGroup;
  loading:boolean= false;

  roles = ["admin","seller","user"];
  constructor(private fb:FormBuilder,private http:AuthService,private router:Router) { }

  ngOnInit(): void {
    this.signupFormGroup = this.fb.group({
      username: '',
      email:'',
      password:'',
      role:''
    })
  }

  validateEmail =(email:any)=>{
      var validRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      if(email.match(validRegex)){
        return true
      }
      else {
        return false;
      }

    }

  onSubmitSignup(formValue:any){
    this.loading= true;
    console.log(formValue);
    if(formValue.username === '' && formValue.email === '' && formValue.password === '' && formValue.role === ''){
      alert("Please fill all fields")
    }
    else if(!this.validateEmail(formValue.email)){
      alert("Please enter valid Email")
    }
    else {
    this.http.register(formValue).subscribe({
      next:(response:any) =>{
        this.loading = false;

        // setCookie("auth",response.data,30);
         this.router.navigate(['/login'])
      }
    })
  }
  }

}
