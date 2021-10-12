import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Product } from '../product';
import { getCurrentProduct, getError, getProducts, getShowProductCode, State } from '../state';
import { Observable } from 'rxjs';
import { ProductPageActions } from '../state/actions';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../product.service';
import { GenericValidator } from '../../shared/generic-validator';
import { NumberValidators } from '../../shared/number.validator';
import { tap } from 'rxjs/operators';

@Component({
  templateUrl: './product-shell.component.html'
})
export class ProductShellComponent implements OnInit {
  selectedProduct: Product | null;
  products$: Observable<Product[]>;
  selectedProduct$: Observable<Product>;
  displayCode$: Observable<boolean>;
  errorMessage$: Observable<string>;

  product$: Observable<Product | null>;
  


  constructor(private store: Store<State>) { }

  ngOnInit(): void {
    //if success products will be added to the store
    this.store.dispatch(ProductPageActions.loadProducts());
    this.products$ = this.store.select(getProducts)
    this.errorMessage$ = this.store.select(getError)
    //TODO -- unsubscribe
    //product is the name of the slice of state. when state changes we recieve the entire product slice
    this.displayCode$ = this.store.select(getShowProductCode)
    this.selectedProduct$ = this.store.select(getCurrentProduct)


  }

  checkChanged(): void {
    //old way ----  this.displayCode = !this.displayCode;
    this.store.dispatch(ProductPageActions.toggleProductCode());
  }

  newProduct(): void {
    // this.productService.changeSelectedProduct(this.productService.newProduct());
    this.store.dispatch(ProductPageActions.initializeCurrentProduct())
  }

  productSelected(product: Product): void {
    this.store.dispatch(ProductPageActions.setCurrentProduct({ currentProductId: product.id }))
    //this.productService.changeSelectedProduct(product);
  }

  deleteProduct(product: Product){
    this.store.dispatch(ProductPageActions.deleteProduct({ productId: product.id }))

  }










  
}
