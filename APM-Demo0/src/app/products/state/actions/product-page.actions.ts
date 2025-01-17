import { createAction, props } from "@ngrx/store"
import { Product } from "../../product"

export const toggleProductCode = createAction(
    '[Product Page] Toggle Product Code'
)

export const clearCurrentProduct = createAction(
    '[Product Page] Clear Current product',
)

export const setCurrentProduct = createAction(
    '[Product Page] Set Current product',
    props<{ currentProductId: number }>()
)

export const initializeCurrentProduct = createAction(
    '[Product Page] Initialize Current product',
)

export const loadProducts = createAction(
    '[Product Page] Load products',
)

export const updateProduct = createAction(
    '[Product Page] Edit Product',
    props<{ product: Product }>()
)

export const createProduct = createAction(
    '[Product Page] Create Product',
    props<{ product: Product }>()
)


export const deleteProduct = createAction(
    '[Product Page] Delete Product',
    props<{ productId: number }>()
)
