import React from 'react'
import Link from 'next/link'
import { get } from 'lodash'
import { useDispatch } from 'react-redux'
import { removeFromBasket } from '../../redux/basket/actions'
import { priceFormat } from '../../utils'

export default function BasketRow({
  allProductsFromRedux,
  itemNumber,
  number,
}) {
  const dispatch = useDispatch()
  let product = get(allProductsFromRedux, `[${itemNumber}]`, null)

  const image =
    product && product.Images.length > 0
      ? product.Images[0].formats.thumbnail.url
      : '/images/defaultProductImage.jpg'
  const betterPrice = product
    ? product.Discount_price
      ? product.Discount_price
      : product.Price
    : null

  return (
    <div className="row">
      {product && (
        <>
          <Link
            href={'/[slug]/[param]/[thirdParam]'}
            as={`/produkt/${product.webshop_category.Url}/${product.Url}`}>
            <a>
              <img width="78" alt={product.Name} src={image} />
            </a>
          </Link>
          <span className="count">{number} x</span> {product.Name} <br />
          <span className="price">€ {priceFormat(betterPrice)}</span>
          <a
            className="remove"
            onClick={() => dispatch(removeFromBasket(product.Item_number))}>
            <i className="fa fa-close" aria-hidden={'true'} />
          </a>
        </>
      )}
    </div>
  )
}
