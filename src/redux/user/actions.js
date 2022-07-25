import { get } from 'lodash'

import { performGraphqlQueryWithJwt } from '../../utils'
import {
  createUserQuery,
  fetchUserQuery,
  updateUserQuery,
} from '../../utils/queries'
import { showSnackBar } from '../uiHelper/actions'

export const actionTypes = {
  LOAD_USER: 'LOAD_USER',
  LOG_OUT: 'LOG_OUT',
}

export const loadUser = (firebase_uid, email = null, name = null) => async (
  dispatch
) => {
  const userData = await performGraphqlQueryWithJwt(fetchUserQuery, {
    firebase_uid: firebase_uid,
  })

  if (userData.webshopUsers.length === 0) {
    dispatch(createUser(firebase_uid, email, name))
  } else {
    dispatch({
      type: actionTypes.LOAD_USER,
      payload: userData.webshopUsers[0],
    })
  }
}

export const createUser = (firebase_uid, email, name) => async (dispatch) => {
  const userData = await performGraphqlQueryWithJwt(createUserQuery, {
    firebase_uid: firebase_uid,
    email: email,
    name: name ? name : '',
  })

  const user = get(userData, 'createWebshopUser.webshopUser', null)
  if (user) {
    dispatch({
      type: actionTypes.LOAD_USER,
      payload: user,
    })
  }
}

export const updateUser = (strapi_id, formEl) => async (dispatch) => {
  const userData = await performGraphqlQueryWithJwt(updateUserQuery, {
    id: strapi_id,
    name: formEl.name.value,
    email: formEl.email.value,
    phone: formEl.phone_.value,
    billing_name: formEl.billing_name.value,
    billing_country: formEl.billing_country.value,
    billing_zip: formEl.billing_zip.value,
    billing_city: formEl.billing_city.value,
    billing_address: formEl.billing_address.value,
    shipping_name: formEl.shipping_name.value,
    shipping_country: formEl.shipping_country.value,
    shipping_zip: formEl.shipping_zip.value,
    shipping_city: formEl.shipping_city.value,
    shipping_address: formEl.shipping_address.value,
  })

  if (!get(userData, 'updateWebshopUser.webshopUser', null)) {
    dispatch(
      showSnackBar({
        type: 'error',
        message: 'An error occurred!',
      })
    )
  } else {
    dispatch({
      type: actionTypes.LOAD_USER,
      payload: userData.updateWebshopUser.webshopUser,
    })
    dispatch(
      showSnackBar({
        type: 'success',
        message: 'Successfully updated!',
      })
    )
  }
}

export const logOutUser = () => async (dispatch) => {
  dispatch({
    type: actionTypes.LOG_OUT,
  })
}
