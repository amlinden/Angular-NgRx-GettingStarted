import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, concatMap, map, mergeMap } from "rxjs/operators";
import { ProductService } from "../product.service";
import { ProductPageActions, ProductApiActions } from './actions';

@Injectable()
export class ProductEffects {
    constructor(private actions$: Actions, private productService: ProductService) { }
    loadProducts$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ProductPageActions.loadProducts),
            mergeMap(() => this.productService.getProducts().pipe(
                map(products => ProductApiActions.loadProductsSuccess({ products })),
                catchError(error => of(ProductApiActions.loadProductsFail({ error })))
            ))
        )
    })
    //define a property
    updateProduct$ = createEffect(() => {
        return this.actions$
            .pipe(
                //ofType to filter out all but the updateProduct action
                ofType(ProductPageActions.updateProduct),
                //merge and flatten the two observables the one from our action, the one that are returned by service
                concatMap(action =>
                    this.productService.updateProduct(action.product)
                        .pipe(
                            map(product => ProductApiActions.updateProductSuccess({ product })),
                            //needs to be an observable
                            catchError(error => of(ProductApiActions.updateProductFailure({ error })))
                        ))
            )
    })

    //define a property
    createProduct$ = createEffect(() => {
        return this.actions$
            .pipe(
                //ofType to filter out all but the updateProduct action
                ofType(ProductPageActions.createProduct),
                //merge and flatten the two observables the one from our action, the one that are returned by service
                concatMap(action =>
                    this.productService.createProduct(action.product)
                        .pipe(
                            map(product => ProductApiActions.createProductSuccess({ product })),
                            //needs to be an observable
                            catchError(error => of(ProductApiActions.updateProductFailure({ error })))
                        ))
            )
    })

    deleteProduct$ = createEffect(() => {
        return this.actions$
        .pipe(
            //ofType to filter out all but the updateProduct action
            ofType(ProductPageActions.deleteProduct),
            //merge and flatten the two observables the one from our action, the one that are returned by service
            mergeMap(action => 
                this.productService.deleteProduct(action.productId)
                .pipe(
                map(product => ProductApiActions.deleteProductSuccess({ productId: action.productId })),
                //needs to be an observable
                catchError(error => of(ProductApiActions.deleteProductFailure({ error })))
            ))
        )
    })
}
