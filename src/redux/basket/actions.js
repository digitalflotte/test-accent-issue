import {
  addToBasketStore,
  getBasketStore,
  removeFromBasketStore,
  setQuantityInBasketStore,
} from '../../utils'
import { showSnackBar } from '../uiHelper/actions'

export const actionTypes = {
  SET_BASKET: 'SET_BASKET',
}

export const removeFromBasket = (itemNumber) => async (dispatch) => {
  const newBasketStore = removeFromBasketStore(itemNumber)
  dispatch({
    type: actionTypes.SET_BASKET,
    payload: newBasketStore,
  })
}

export const addToBasket = (itemNumber, number) => async (dispatch) => {
  const newBasketStore = addToBasketStore(itemNumber, number)
  dispatch({
    type: actionTypes.SET_BASKET,
    payload: newBasketStore,
  })
  dispatch(
    showSnackBar({
      type: 'success',
      message: 'In den Warenkorb hinzugefügt!',
    })
  )
}

export const loadBasket = () => async (dispatch) => {
  const basketStore = getBasketStore()
  dispatch({
    type: actionTypes.SET_BASKET,
    payload: basketStore,
  })
}

export const setQuantityInBasket = (itemNumber, number) => async (dispatch) => {
  const newBasketStore = setQuantityInBasketStore(itemNumber, number)
  dispatch({
    type: actionTypes.SET_BASKET,
    payload: newBasketStore,
  })
}
