import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import { basket, uiHelper, product, user } from './reducers'
import { createWrapper } from 'next-redux-wrapper'

const combinedReducers = combineReducers({
  basket,
  uiHelper,
  product,
  user,
})

export const store = createStore(
  combinedReducers,
  composeWithDevTools(applyMiddleware(thunk))
)

const makeStore = (context) => store

export const wrapper = createWrapper(makeStore, { debug: false })
