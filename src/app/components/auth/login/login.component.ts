import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  LoginFormGroup!:FormGroup;
  constructor(private fb: FormBuilder,
    private authService:AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.LoginFormGroup = this.fb.group({
      email: '',
      password: ''
    })
  }

  onLoginSubmit(formValue:any){
    this.authService.login(formValue).subscribe({
      next:(res:any)=>{
        let token  = res.token;
        localStorage.setItem("auth",token);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Great,Logined Successfully',
          showConfirmButton: false,
          timer: 2000
        })
        this.router.navigate(['/dashboard']);
    },
    error:error=>{
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: error.message,
        showConfirmButton: false,
        timer: 2000
      })
    }

    })
  }

}
