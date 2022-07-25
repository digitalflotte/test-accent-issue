import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect, useState } from 'react'
import { SlideDown } from 'react-slidedown'
import Link from 'next/link'

import BasketRow from './basketRow'
import { loadProducts } from '../../redux/product/actions'
import { priceFormat } from '../../utils'
import { toggleBasketPanel } from '../../redux/uiHelper/actions'

export default function BasketPanel() {
  const dispatch = useDispatch()
  const { basketStore } = useSelector((state) => state.basket)
  const { products } = useSelector((state) => state.product)
  const basketNumber = basketStore ? Object.keys(basketStore).length : 0

  const [total, setTotal] = useState(0)

  const { basketPanelVisible } = useSelector((state) => state.uiHelper)

  useEffect(() => {
    if (basketPanelVisible) {
      const itemNumbersNeedToFetch = []
      basketStore &&
        Object.keys(basketStore).forEach((basketKey) => {
          if (!products || typeof products[basketKey] === 'undefined') {
            itemNumbersNeedToFetch.push(basketKey)
          }
        })

      if (itemNumbersNeedToFetch.length > 0) {
        dispatch(loadProducts(itemNumbersNeedToFetch))
      }
    }
  }, [basketPanelVisible])

  useEffect(() => {
    if (products) {
      let sumPrice = 0
      if (basketStore) {
        Object.keys(basketStore).forEach((basketKey) => {
          if (products && typeof products[basketKey] !== 'undefined') {
            const unitPrice = products[basketKey].Discount_price
              ? products[basketKey].Discount_price
              : products[basketKey].Price
            sumPrice += unitPrice * basketStore[basketKey]
          }
        })
      }
      setTotal(sumPrice)
    }
  }, [products, basketStore])

  return (
    <div className="basketPanel">
      <SlideDown
        transitionOnAppear={false}
        closed={!basketPanelVisible}
        className={'my-dropdown-slidedown'}>
        <div className="basketPanelInner">
          <div className="topRow">
            <i className="fas fa-shopping-cart" aria-hidden={'true'} />{' '}
            Warenkorb: <span className="badge">{basketNumber}</span> Produkte
          </div>

          <div className="productInner">
            {basketStore &&
              products &&
              Object.keys(basketStore).length > 0 &&
              Object.keys(basketStore).map((key, index) => (
                <BasketRow
                  key={`basketRowKey_${index}`}
                  allProductsFromRedux={products}
                  itemNumber={key}
                  number={basketStore[key]}
                />
              ))}
          </div>

          {products && (
            <div className="summary">
              Rechnungsbetrag: <span>{`€ ${priceFormat(total)}`}</span>
            </div>
          )}

          <Link href={`/[slug]`} as={`/einkaufswagen`}>
            <a
              className="button is-primary"
              onClick={() => dispatch(toggleBasketPanel())}>
              Warenkorb
            </a>
          </Link>
        </div>
      </SlideDown>
    </div>
  )
}
