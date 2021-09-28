import { createAction, props } from "@ngrx/store"
import { Product } from "../product"

export const toggleProductCode = createAction(
    '[Product] Toggle Product Code'
)

export const clearCurrentProduct = createAction(
    '[Product] Clear Current product',
)
export const setCurrentProduct = createAction(
    '[Product] Set Current product',
    props<{ product: Product}>()
)

export const initializeCurrentProduct = createAction(
    '[Product] Initialize Current product',
)

//http request
export const loadProducts = createAction(
    '[Product] Load products',
)

//http response with structure of return data
export const loadProductsSuccess = createAction(
    '[Product] Load Products Success',
    props<{ products: Product[]}>()
)

export const loadProductsFail = createAction(
    '[Product] Load Products Fail',
    props<{ error: String}>()
)