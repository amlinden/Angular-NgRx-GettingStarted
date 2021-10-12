import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Product } from '../product';


@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent {
  pageTitle = 'Products';
  @Input() errorMessage: string;
  @Input() displayCode: boolean;
  @Input() selectedProduct: Product;
  @Input() products: Product[];
  @Output() displayCodeChanged = new EventEmitter<boolean>();
  @Output() initializeNewProduct = new EventEmitter<any>();
  @Output() productWasSelected = new EventEmitter<Product>();

  checkChanged() {
    this.displayCodeChanged.emit()
  }
  newProduct() {
    this.initializeNewProduct.emit()
  }
  productSelected(product: Product) {
    this.productWasSelected.emit(product)
  }

}

