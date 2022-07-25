import { actionTypes } from './actions'

const initialState = {
  products: null,
}

export default function ProductReducer(state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case '__NEXT_REDUX_WRAPPER_HYDRATE__':
      return {
        ...state,
        products: {
          ...state.products,
          ...action.payload.product.products,
        },
      }

    case actionTypes.LOAD_PRODUCT:
      return {
        ...state,
        products: {
          ...state.products,
          [payload?.Item_number]: payload,
        },
      }

    case actionTypes.LOAD_PRODUCTS:
      const products = {}
      payload.forEach((product) => {
        products[product.Item_number] = product
      })
      return {
        ...state,
        products: {
          ...state.products,
          ...products,
        },
      }

    default:
      return state
  }
}
