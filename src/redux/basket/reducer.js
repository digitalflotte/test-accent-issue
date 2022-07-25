import { actionTypes } from './actions'

const initialState = {
  basketStore: null,
}

export default function BasketReducer(state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case actionTypes.SET_BASKET:
      return {
        ...state,
        basketStore: payload,
      }

    default:
      return state
  }
}
