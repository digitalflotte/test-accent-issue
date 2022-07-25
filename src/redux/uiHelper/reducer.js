import { actionTypes } from './actions'

const initialState = {
  basketPanelVisible: false,
  searchOverlayVisible: false,
  loadingVisible: false,
  snackBarVisible: false,
  snackBarMessage: '',
  snackBarType: '',
  snackBarPosition: '',
  snackBarSticky: false,
  snackBarTimeout: 3000,
  menuType: 'LKW',
}

export default function Named(state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case actionTypes.SHOW_SNACKBAR:
      return {
        ...state,
        snackBarVisible: true,
        snackBarType: payload.type,
        snackBarMessage: payload.message,
        snackBarPosition: payload.position || 'top',
        snackBarSticky: payload.sticky || false,
        snackBarTimeout: payload.timeout || 3000,
      }

    case actionTypes.HIDE_SNACKBAR:
      return {
        ...state,
        snackBarVisible: false,
        snackBarType: '',
        snackBarMessage: '',
        snackBarSticky: false,
        snackBarTimeout: 3000,
      }

    case actionTypes.SET_LOADING_SCREEN:
      return {
        ...state,
        loadingVisible: payload,
      }

    case actionTypes.SET_BASKETPANEL_VISIBILITY:
      return {
        ...state,
        basketPanelVisible: payload,
      }

    case actionTypes.TOGGLE_BASKETPANEL:
      return {
        ...state,
        basketPanelVisible: !state.basketPanelVisible,
      }

    case actionTypes.TOGGLE_SEARCH_OVERLAY:
      return {
        ...state,
        searchOverlayVisible: !state.searchOverlayVisible,
      }

    case actionTypes.SET_MENU_TYPE:
      return {
        ...state,
        menuType: payload,
      }

    default:
      return state
  }
}
