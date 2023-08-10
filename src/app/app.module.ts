import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductsComponent } from './components/products/products.component';
import { CartComponent } from './components/cart/cart.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { LoginComponent } from './components/auth/login/login.component';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatButtonModule} from '@angular/material/button';
import { MatIconModule} from '@angular/material/icon';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule} from '@angular/material/input';

import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { MatMenuModule} from '@angular/material/menu';
import { ProfileComponent } from './components/profile/profile.component';
import { MatSelectModule} from '@angular/material/select';
import { MatDialogModule} from '@angular/material/dialog';
import { EditProductComponent } from './components/products/edit-product/edit-product.component';
import { CreateProductComponent } from './components/products/create-product/create-product.component';
import { MatCardModule} from '@angular/material/card';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { DialogComponent } from './components/confirmation-dialog/dialog/dialog.component';
import { SellerComponent } from './components/roles/seller/seller.component';
import { CustomerComponent } from './components/roles/customer/customer.component';
import { MatTabsModule} from '@angular/material/tabs';
import { ViewProductComponent } from './components/products/view-product/view-product.component';
import { SearchproductPipe } from './helpers/searchproduct.pipe';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import {MatChipsModule} from '@angular/material/chips';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    CartComponent,
    SignupComponent,
    LoginComponent,
    NavMenuComponent,
    ProfileComponent,
    EditProductComponent,
    CreateProductComponent,
    DialogComponent,
    SellerComponent,
    CustomerComponent,
    ViewProductComponent,
    SearchproductPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatMenuModule,
    MatSelectModule,
    MatDialogModule,
    MatCardModule,
    MatSnackBarModule,
    MatTabsModule,
    MatButtonToggleModule,
    MatChipsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
