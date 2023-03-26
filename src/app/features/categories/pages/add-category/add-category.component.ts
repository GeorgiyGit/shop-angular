import { ICreateCategory } from './../../models/create-category';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent {
  categoryForm: FormGroup;

  imageFile:File;

  url:string | ArrayBuffer | null;

  get formValue() {
    return this.categoryForm.value as ICreateCategory;
  }

  get name() { return this.categoryForm.get('name')!; }


  constructor(private fb: FormBuilder,
              private categoryService:CategoryService) {
  }

  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(300)]],
    });
  }

  changeFile(event:any):void{
    this.imageFile=event.target.files[0];

    const reader = new FileReader();
    reader.onload = e => this.url = reader.result;

    reader.readAsDataURL(this.imageFile);
  }

  sumbit():void{
    let model:ICreateCategory=this.categoryForm.value;

    model.file=this.imageFile;

    console.log(model);

    this.categoryService.createCategory(model).subscribe(res=>{
      console.log(res);
    })
  }


}
