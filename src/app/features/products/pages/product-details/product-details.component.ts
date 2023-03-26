import { IFullProduct } from './../../models/full-product';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  str="http://localhost:8080/uploading/600_";

  product: IFullProduct;
  cImage: 0;
  constructor(private route: ActivatedRoute, private productService: ProductService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];

    this.productService.getFullProduct(parseInt(id)).subscribe(res => {
      this.product = res;
      console.log(res);
    })
  }

  left() {
    if (this.cImage > 0) this.cImage--;
  }
  right() {
    if (this.cImage < this.product.images.length - 1) {
      this.cImage++;
    }
  }
}
