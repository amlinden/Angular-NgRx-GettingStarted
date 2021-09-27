import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';

import { Subscription } from 'rxjs';

import { Product } from '../product';
import { ProductService } from '../product.service';
import { getShowProductCode, State } from '../state/product.reducer';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  pageTitle = 'Products';
  errorMessage: string;

  displayCode: boolean;

  products: Produ;

  // Used to highlight the selected product in the list
  selectedProduct: Product | null;
  sub: Subscription;

  constructor(private store: Store<State>, private productService: ProductService) { }

  ngOnInit(): void {
    this.sub = this.productService.selectedProductChanges$.subscribe(
      currentProduct => this.selectedProduct = currentProduct
    );

    this.productService.getProducts().subscribe({
      next: (products: Product[]) => this.products = products,
      error: err => this.errorMessage = err
    });
    //TODO -- unsubscribe
    this.store.select(getShowProductCode).subscribe(
      showProductCode => this.displayCode = showProductCode
    );
}

ngOnDestroy(): void {
  this.sub.unsubscribe();
}

checkChanged(): void {
  //old way ----  this.displayCode = !this.displayCode;
  //dispatch action using (NGRX) -- neds to be same name as the one specified in  create action. 
  this.store.dispatch(
    { type: '[Product] Toggle Product Code' }
  );

}

newProduct(): void {
  this.productService.changeSelectedProduct(this.productService.newProduct());
}

productSelected(product: Product): void {
  this.productService.changeSelectedProduct(product);
}

}
