import { CategoryService } from 'src/app/features/categories/services/category.service';
import { ICategory } from './../../models/category';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit{

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(res=>{
      this.categories=res;
    })
  }


  filter: string;
  categories: ICategory[];

  @Input() selectedCategories: ICategory[] = [];

  @Output() selectedCategoryEvent = new EventEmitter<ICategory[]>();

  select(e: any): void {
    let find = this.categories.find(x => x?.name === e.target.value);
    let genre = this.categories.find(x => x.id === find?.id);
    if (genre != null) {
      if (!this.selectedCategories.includes(genre)) {
        this.selectedCategories.push(genre);
        
        this.selectedCategoryEvent.emit(this.selectedCategories);
        e.target.value = '';
      }
    }
  }

  unSelect(category: ICategory) {
    this.selectedCategories = this.selectedCategories.filter(obj => obj !== category);
    this.selectedCategoryEvent.emit(this.selectedCategories);
  }
}
