import { Component, OnInit } from '@angular/core';
import { ICategory } from '../../models/category';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.scss']
})
export class CategoryPageComponent implements OnInit{
  str="http://localhost:8080/uploading/300_";
  categories:ICategory[]=[];

  constructor(private categoryService:CategoryService){}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(res=>{
      this.categories=res;
      console.log(res);
    })
  }
}
