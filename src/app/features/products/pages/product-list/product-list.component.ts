import { ISimpleProduct } from './../../models/simple-products';
import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit{
  

  products:ISimpleProduct[]=[];

  constructor(private productService:ProductService, private router:Router){}


  ngOnInit(): void {
    this.productService.getSimpleProducts().subscribe(res=>{
      this.products=res;
    })
  }

  click(id:number){
    this.router.navigateByUrl('/products/'+id);
  }


  delProduct(id:number){
    this.productService.deleteProduct(id).subscribe(res=>{
      this.products=this.products.filter(obj => obj.id !== id);
    })
  }

  edit(id:number){
    this.router.navigateByUrl('/products/edit/'+id);
  }
}
