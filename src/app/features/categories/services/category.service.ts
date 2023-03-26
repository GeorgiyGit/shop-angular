import { ICreateCategory } from './../models/create-category';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { ICategory } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  controllerUrl: string;

  constructor(private http: HttpClient) {
    this.controllerUrl = environment.apiUrl + "categories";
  }

  createCategory(model: ICreateCategory): Observable<ICategory> {
    console.log(model);
    let formData = new FormData();

    formData.append('name', model.name);

    if (model.file != null) {
      formData.append('file', model.file);
    }

    return this.http.post<ICategory>(this.controllerUrl, formData);
  }

  getCategories(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(this.controllerUrl);
  }
}
