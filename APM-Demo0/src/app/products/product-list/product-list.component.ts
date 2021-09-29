import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Product } from '../product';
import { getCurrentProduct, getError, getProducts, getShowProductCode, State } from '../state/product.reducer';
import * as ProductActions from '../state/product.actions';
import { Observable } from 'rxjs';


@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  pageTitle = 'Products';

  // Used to highlight the selected product in the list
  selectedProduct: Product | null;
  products$: Observable<Product[]>;
  selectedProduct$: Observable<Product>;
  displayCode$: Observable<boolean>;
  error$: Observable<string>;

  constructor(private store: Store<State>) { }

  ngOnInit(): void {
    //if success products will be added to the store
    this.store.dispatch(ProductActions.loadProducts());

    this.products$ = this.store.select(getProducts)

    this.error$ = this.store.select(getError)
    //TODO -- unsubscribe
    //product is the name of the slice of state. when state changes we recieve the entire product slice
    this.displayCode$ = this.store.select(getShowProductCode)

    this.selectedProduct$ = this.store.select(getCurrentProduct)

  }


  checkChanged(): void {
    //old way ----  this.displayCode = !this.displayCode;
    this.store.dispatch(ProductActions.toggleProductCode());
  }

  newProduct(): void {
    // this.productService.changeSelectedProduct(this.productService.newProduct());
    this.store.dispatch(ProductActions.initializeCurrentProduct())
  }

  productSelected(product: Product): void {
    this.store.dispatch(ProductActions.setCurrentProduct({ product }))
    //this.productService.changeSelectedProduct(product);
  }

}

