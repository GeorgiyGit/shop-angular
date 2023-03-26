import { IEditProduct } from './../../models/edit-product';
import { IFileObj, IStringFileObj } from './../../models/file-object';
import { ICategory } from './../../../categories/models/category';
import { ProductService } from './../../services/product.service';
import { ICreateProduct } from './../../models/create-product';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IProductImagePreview } from '../../models/product-image';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent {
  productForm: FormGroup;

  files: IFileObj[] = [];
  stringFiles: IStringFileObj[] = [];
  images: IProductImagePreview[] = [];

  deletedFiles: string[]=[];

  selectedCategories: ICategory[] = [];

  id: number;

  get formValue() {
    return this.productForm.value as ICreateProduct;
  }

  get name() { return this.productForm.get('name')!; }
  get price() { return this.productForm.get('price')!; }
  get description() { return this.productForm.get('description')!; }


  isEditMode: boolean;
  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private productService: ProductService) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];

    if (id != null) {
      this.isEditMode = true;
      this.id = parseInt(id);
    }
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(300)]],
      price: [''],
      description: ['']
    });

    if (this.isEditMode) {
      this.productService.getFullProduct(id).subscribe(res => {
        this.productForm.patchValue(res);
        console.log(res);
        for (let i = 0; i < res.images.length; i++) {
          this.stringFiles.push({
            id: this.count,
            file: res.images[i]
          });
          this.images.push({
            id: this.count,
            url: res.images[i]
          });
          this.count++;
        }

        this.selectedCategories = res.categories;
      });
    }

  }

  count: number = 0;
  url: string | ArrayBuffer | null = null;
  addFile(event: any): void {
    let file = event.target.files[0];
    let fileObj: IFileObj = {
      id: this.count,
      file: file
    };

    this.files.push(fileObj);



    const reader = new FileReader();
    reader.onload = e => this.url = reader.result;

    reader.readAsDataURL(file);

    this.images.push({
      id: this.count,
      url: this.url
    });
    this.count++;

    console.log(this.images);
  }

  sumbit(): void {
    if (!this.isEditMode) {
      let model: ICreateProduct = this.productForm.value;
      model.files = [];
      for (let i = 0; i < this.files.length; i++) {
        model.files.push(this.files[i].file);
      }


      model.categories = [];
      for (let i = 0; i < this.selectedCategories.length; i++) {
        model.categories.push(this.selectedCategories[i].id);
      }

      console.log(model);

      this.productService.createProduct(model).subscribe(res => {
        console.log(res);
      })
    }
    else {
      let model: IEditProduct = this.productForm.value;

      model.files = [];
      for (let i = 0; i < this.files.length; i++) {
        model.files.push(this.files[i].file);
      }

      model.removeFiles=this.deletedFiles;

      model.categories = [];
      for (let i = 0; i < this.selectedCategories.length; i++) {
        model.categories.push(this.selectedCategories[i].id);
      }

      this.productService.editProduct(model).subscribe(res => {
        console.log(res);
      })
    }
  }

  remove(id: number): void {
    this.images = this.images.filter(img => img.id != id);
    this.files = this.files.filter(file => file.id != id);

    if (this.isEditMode) {
      let s = this.stringFiles.find(f => f.id == id);
      if (s != null) {
        this.deletedFiles.push(s.file);
      }
    }
  }


  addParent(categories: ICategory[]) {
    this.selectedCategories = categories;
  }


}
