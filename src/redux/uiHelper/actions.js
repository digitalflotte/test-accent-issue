export const actionTypes = {
  SET_LOADING_SCREEN: 'SET_LOADING_SCREEN',
  SHOW_SNACKBAR: 'SHOW_SNACKBAR',
  HIDE_SNACKBAR: 'HIDE_SNACKBAR',
  TOGGLE_BASKETPANEL: 'TOGGLE_BASKETPANEL',
  SET_BASKETPANEL_VISIBILITY: 'SET_BASKETPANEL_VISIBILITY',
  TOGGLE_SEARCH_OVERLAY: 'TOGGLE_SEARCH_OVERLAY',
  SET_MENU_TYPE: 'SET_MENU_TYPE',
}

export const setMenuType = (type) => async (dispatch) => {
  dispatch({
    type: actionTypes.SET_MENU_TYPE,
    payload: type,
  })
}

export const toggleSearchOverlay = () => async (dispatch) => {
  dispatch({
    type: actionTypes.TOGGLE_SEARCH_OVERLAY,
  })
}

export const setBasketPanelVisibility = (state) => async (dispatch) => {
  dispatch({
    type: actionTypes.SET_BASKETPANEL_VISIBILITY,
    payload: state,
  })
}

export const toggleBasketPanel = () => async (dispatch) => {
  dispatch({
    type: actionTypes.TOGGLE_BASKETPANEL,
  })
}

export const hideSnackBar = () => async (dispatch) => {
  dispatch({
    type: actionTypes.HIDE_SNACKBAR,
  })
}

export const showSnackBar = (payload) => async (dispatch) => {
  dispatch({
    type: actionTypes.SHOW_SNACKBAR,
    payload: payload,
  })
}

export const setLoadingScreen = (payload) => async (dispatch) => {
  dispatch({
    type: actionTypes.SET_LOADING_SCREEN,
    payload: payload,
  })
}
