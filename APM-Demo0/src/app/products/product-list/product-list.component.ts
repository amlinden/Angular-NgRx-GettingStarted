import { Component, OnInit, OnDestroy } from '@angular/core';
import { props, Store } from '@ngrx/store';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { getCurrentProduct, getProducts, getShowProductCode, State } from '../state/product.reducer';
import * as ProductActions from '../state/product.actions';


@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  pageTitle = 'Products';
  errorMessage: string;

  displayCode: boolean;

  products: Product[];

  // Used to highlight the selected product in the list
  selectedProduct: Product | null;

  constructor(private store: Store<State>, private productService: ProductService) { }

  ngOnInit(): void {

    this.productService.getProducts().subscribe({
      next: (products: Product[]) => this.products = products,
      error: err => this.errorMessage = err
    });

    //TODO -- unsubscribe
/*     this.store.select(getProducts).subscribe(
      products => this.products = products
    );
 */
    //TODO -- unsubscribe
    //product is the name of the slice of state. when state changes we recieve the entire product slice
    this.store.select(getShowProductCode).subscribe(
      showProductCode => this.displayCode = showProductCode
    );

    //eget test
    this.store.select(getCurrentProduct).subscribe(
      currentProduct => this.selectedProduct = currentProduct
    );

    /*  this.sub = this.productService.selectedProductChanges$.subscribe(
       currentProduct => this.selectedProduct = currentProduct
     ); */
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
