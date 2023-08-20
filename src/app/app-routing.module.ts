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
import { CartComponent } from './components/cart/cart.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddCategoryComponent } from './components/products/add-category/add-category.component';

const routes: Routes = [
  // {path: '', redirectTo: '', pathMatch: 'full' ,},
  {path:'login',component:LoginComponent},
  {path:'register',component: SignupComponent},
  {path:'', component:HomeComponent},
  {path:'dashboard', component:DashboardComponent, canActivate: [AuthGuard]},
  {path:'profile',component: ProfileComponent},
  {path:'add-product',component: CreateProductComponent},
  {path:'view-product/:id',component: ViewProductComponent},
  {path:'addcategory',component:AddCategoryComponent},
  {path:'view-cart', component: CartComponent},
  {path: '**', redirectTo: 'dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
