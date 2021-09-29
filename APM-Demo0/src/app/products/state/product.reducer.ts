import { createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import * as AppState from '../../state/app.state';
import * as ProductActions from './product.actions';
import { Product } from "../product";


export interface State extends AppState.State {
    products: ProductState;
}

export interface ProductState {
    showProductCode: boolean;
    currentProduct: Product;
    products: Product[];
}

const initialState: ProductState = {
    showProductCode: true,
    currentProduct: null,
    products: []
}
const getProductFeatureState = createFeatureSelector<ProductState>('products');

export const getShowProductCode = createSelector(
    getProductFeatureState,
    state => state.showProductCode
)

export const getProducts = createSelector(
    getProductFeatureState,
    state => state.products
)

export const getCurrentProduct = createSelector(
    getProductFeatureState,
    state => state.currentProduct
)

export const productReducer = createReducer<ProductState>(
    initialState,
    //without action metadata
    on(ProductActions.toggleProductCode, (state): ProductState => {
        console.log('org state' + JSON.stringify(state))
        return {
            ...state,
            showProductCode: !state.showProductCode
        }
    }),
    on(ProductActions.setCurrentProduct, (state, action): ProductState => {
        return {
            ...state,
            currentProduct: action.product

        }
    }),
    //with action meta data - we pass in state and actions data
    //set current prod to nul
    on(ProductActions.clearCurrentProduct, (state): ProductState => {
        return {
            ...state,
            currentProduct: null
        }
    }),


    on(ProductActions.initializeCurrentProduct, (state): ProductState => {
        return {
            ...state,
            //set to object literal
            currentProduct: {
                id: 2,
                productName: "",
                productCode: "new",
                description: "",
                starRating: 0
            }
        }
    }),
    on(ProductActions.loadProductsSuccess, (state, action): ProductState => {
        return {
            ...state,
            products: action.products
        }
    })
)