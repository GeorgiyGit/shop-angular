import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddCategoryComponent } from './features/categories/pages/add-category/add-category.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './core/components/header/header.component';
import { AddProductComponent } from './features/products/pages/add-product/add-product.component';
import { CategoryListComponent } from './features/categories/components/category-list/category-list.component';
import { ProductListComponent } from './features/products/pages/product-list/product-list.component';
import { ProductDetailsComponent } from './features/products/pages/product-details/product-details.component';
import { CategoryPageComponent } from './features/categories/pages/category-page/category-page.component';

@NgModule({
  declarations: [
    AppComponent,
    AddCategoryComponent,
    HeaderComponent,
    AddProductComponent,
    CategoryListComponent,
    ProductListComponent,
    ProductDetailsComponent,
    CategoryPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
