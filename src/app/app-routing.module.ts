import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { AuthGuard } from './shared/auth.guard';
import { ProfileComponent } from './components/profile/profile.component';
import { CreateProductComponent } from './components/products/create-product/create-product.component';
import { ViewProductComponent } from './components/products/view-product/view-product.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full' ,},
  {path:'login',component:LoginComponent},
  {path:'register',component: SignupComponent},
  {path:'dashboard', component:ProductsComponent, canActivate: [AuthGuard]},
  {path:'profile',component: ProfileComponent},
  {path:'add-product',component: CreateProductComponent},
  {path:'view-product/:id',component: ViewProductComponent},
  {path: '**', redirectTo: 'dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
