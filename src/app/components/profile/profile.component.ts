import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileFormGroup!:FormGroup;
  gender = ["male","female","others"]
  constructor(private authService:AuthService,private fb:FormBuilder) { }

  ngOnInit(): void {
      this.profileFormGroup = this.fb.group({
        firstname:'',
        lastname:'',
        gender:'',
        mobileno:'',
        country:''
      });

      this.getProfileData()
  }

  getUserData(){
    return this.authService.decodeToken();
  }

  getProfileData(){
    const token = localStorage.getItem("auth")
    this.authService.getUsers(token).subscribe((res:any)=>{
      this.profileFormGroup.setValue({
        firstname: res.data.firstname,
        lastname: res.data.lastname,
        gender: res.data.gender,
        mobileno: res.data.mobileno,
        country: res.data.country
      });
    })
  }

  onUpdateProfile(profileForm:any){
    const token = localStorage.getItem("auth")

    this.authService.profile(token,this.getUserData()._id,profileForm).subscribe({
      next:response=>{
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Profile Updated',
          showConfirmButton: false,
          timer: 1500
        })
      }
    })
  }
}
