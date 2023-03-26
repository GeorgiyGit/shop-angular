import { CategoryPageComponent } from './features/categories/pages/category-page/category-page.component';
import { CategoryListComponent } from './features/categories/components/category-list/category-list.component';
import { ProductDetailsComponent } from './features/products/pages/product-details/product-details.component';
import { AddCategoryComponent } from './features/categories/pages/add-category/add-category.component';
import { AddProductComponent } from './features/products/pages/add-product/add-product.component';
import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './features/products/pages/product-list/product-list.component';

const routes: Route[] = [
  {
    path: 'products',
    component: ProductListComponent
  },
  {
    path: 'categories',
    component: CategoryPageComponent
  },
  {
    path: 'products/add',
    component: AddProductComponent
  },
  {
    path: 'products/edit/:id',
    component: AddProductComponent
  },
  {
    path: 'categories/add',
    component: AddCategoryComponent
  },
  {
    path: 'products/:id',
    component: ProductDetailsComponent
  }
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
