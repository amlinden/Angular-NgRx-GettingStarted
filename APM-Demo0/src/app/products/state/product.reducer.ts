import { createReducer, on } from "@ngrx/store"
import { Product } from "../product";
import { ProductPageActions, ProductApiActions } from './actions';
export interface ProductState {
    showProductCode: boolean;
    currentProductId: number | null;
    products: Product[];
    error: string;
}

const initialState: ProductState = {
    showProductCode: true,
    currentProductId: null,
    products: [],
    error: ''
}

export const productReducer = createReducer<ProductState>(
    initialState,
    //without action metadata
    on(ProductPageActions.toggleProductCode, (state): ProductState => {
        console.log('org state' + JSON.stringify(state))
        return {
            ...state,
            showProductCode: !state.showProductCode
        }
    }),
    on(ProductPageActions.setCurrentProduct, (state, action): ProductState => {
        return {
            ...state,
            currentProductId: action.currentProductId
        }
    }),
    //with action meta data - we pass in state and actions data
    //set current prod to nul
    on(ProductPageActions.clearCurrentProduct, (state): ProductState => {
        return {
            ...state,
            currentProductId: null
        }
    }),


    on(ProductPageActions.initializeCurrentProduct, (state): ProductState => {
        return {
            ...state,
            //set to object literal
            currentProductId: 0
        }
    }),
    on(ProductApiActions.loadProductsSuccess, (state, action): ProductState => {
        return {
            ...state,
            products: action.products,
            error: '' // clear any old errors
        }
    }),
    on(ProductApiActions.loadProductsFail,
        (state, action): ProductState => {
            return {
                ...state,
                products: [],
                error: action.error
            }
        }),
    on(ProductApiActions.updateProductSuccess,
        (state, action): ProductState => {
            //make sure we create a new array instead of updating an existing array
            const updatedProducts = state.products.map(item =>
                action.product.id === item.id ? action.product : item)
            return {
                ...state,
                products: updatedProducts,
                currentProductId: action.product.id,
                error: ''
            }

        }),
    on(ProductApiActions.updateProductFailure,
        (state, action): ProductState => {
            return {
                ...state,
                currentProductId: null,
                error: action.error
            }

        }),

    on(ProductApiActions.createProductSuccess,
        (state, action): ProductState => {
            return {
                ...state,
                products: [...state.products, action.product],
                currentProductId: action.product.id,
                error: '' // clear any old errors
            }
        }),
    on(ProductApiActions.createProductFailure,
        (state, action): ProductState => {
            return {
                ...state,
                error: action.error
            }
        }),

    on(ProductApiActions.deleteProductSuccess,
        (state, action): ProductState => {
            return {
                ...state,
                products: state.products.filter(item =>
                    action.productId !== item.id),
                currentProductId: null,
                error: '' // clear any old errors
            }
        }),
    on(ProductApiActions.deleteProductFailure,
        (state, action): ProductState => {
            return {
                ...state,
                error: action.error
            }
        }),
)