import { IEditProduct } from './../models/edit-product';
import { ISimpleProduct } from './../models/simple-products';
import { ICreateProduct } from './../models/create-product';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs/internal/Observable';
import { IFullProduct } from '../models/full-product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  controllerUrl: string;

  constructor(private http: HttpClient) {
    this.controllerUrl = environment.apiUrl + "products";
  }

  createProduct(model: ICreateProduct): Observable<any> {
    console.log(model);
    let formData = new FormData();

    formData.append('name', model.name);
    formData.append('price', model.price);
    formData.append('description', model.description);

    for (var i = 0; i < model.files.length; i++) {
      if (model.files[i] != null) {
        formData.append('files[]', model.files[i]);
      }
    }

    for (var i = 0; i < model.categories.length; i++) {
      if (model.categories[i] != null) {
        formData.append('categories[]', model.categories[i] + '');
      }
    }

    return this.http.post<null>(this.controllerUrl, formData);
  }

  getSimpleProducts(): Observable<ISimpleProduct[]> {
    return this.http.get<ISimpleProduct[]>(this.controllerUrl);
  }

  getFullProduct(id:number): Observable<IFullProduct> {
    return this.http.get<IFullProduct>(this.controllerUrl+'/'+id);
  }

  deleteProduct(id:number): Observable<IFullProduct> {
    return this.http.delete<IFullProduct>(this.controllerUrl+'/'+id);
  }

  editProduct(model:IEditProduct): Observable<IFullProduct> {
    return this.http.put<IFullProduct>(this.controllerUrl,model);
  }
}
