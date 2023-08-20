import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import Swal from 'sweetalert2'
import { CustomerComponent } from '../../roles/customer/customer.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  LoginFormGroup!:FormGroup;
  loading:boolean = false;

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
    this.loading = true;
    this.authService.login(formValue).subscribe({
      next:(res:any)=>{
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Great,Logined Successfully',
          showConfirmButton: false,
          timer: 2000
        })
        this.loading = false;
        this.router.navigate(['/']);
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
