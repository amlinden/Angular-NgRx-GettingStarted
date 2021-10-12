import { createAction, props } from "@ngrx/store"
import { Product } from "../../product"

export const deleteProductSuccess = createAction(
    '[Product API] Delete Product Success',
    props<{  productId: number  }>()
)

export const deleteProductFailure = createAction(
    '[Product API] Delete Product Fail',
    props<{ error: string }>()
)

export const createProductSuccess = createAction(
    '[Product API] Create Product Success',
    props<{ product: Product }>()
)

export const createProductFailure = createAction(
    '[Product API] Create Product Fail',
    props<{ error: string }>()
)
export const updateProductSuccess = createAction(
    '[Product API] Edit Product Success',
    props<{ product: Product }>()
)

export const updateProductFailure = createAction(
    '[Product API] Edit Product Fail',
    props<{ error: string }>()
)

//http response with structure of return data
export const loadProductsSuccess = createAction(
    '[Product API] Load Products Success',
    props<{ products: Product[] }>()
)

export const loadProductsFail = createAction(
    '[Product] Load Products Fail',
    props<{ error: string }>()
)