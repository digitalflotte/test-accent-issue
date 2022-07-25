import { actionTypes } from './actions'

const initialState = {
  user: null,
}

export default function UserReducer(state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case actionTypes.LOAD_USER:
      return {
        ...state,
        user: payload,
      }

    case actionTypes.LOG_OUT:
      return {
        ...state,
        user: null,
      }

    default:
      return state
  }
}
