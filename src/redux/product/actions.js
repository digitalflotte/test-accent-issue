import { fetchAPI } from '../../utils'

export const actionTypes = {
  LOAD_PRODUCT: 'LOAD_PRODUCT',
  LOAD_PRODUCTS: 'LOAD_PRODUCTS',
}

export const loadProduct = (product) => async (dispatch) => {
  dispatch({
    type: actionTypes.LOAD_PRODUCT,
    payload: product,
  })
}

export const loadProducts = (itemNumbers) => async (dispatch) => {
  const query = `
    query($itemNumbers: [String]) {
      webshopProducts (where: {Item_number_in: $itemNumbers, Webshop: true}) {
        Item_number, Name, Price, Discount_price, Stock, Url, webshop_category { Name, Url}
        Images {
          ... on UploadFile {
            formats
          }
        }
      }
    }`
  const responseObject = await fetchAPI(query, { itemNumbers })

  dispatch({
    type: actionTypes.LOAD_PRODUCTS,
    payload: responseObject.webshopProducts,
  })
}
