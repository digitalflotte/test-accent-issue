import React, { useState, useEffect } from 'react'
import { get } from 'lodash'
import * as store from 'store'

export const firebaseConfig = {
  apiKey: 'AIzaSyAor7YGfgH-gO6ifl06p_UBEyDqwp8sqCQ',
  authDomain: 'digitalflotte-28d6b.firebaseapp.com',
  databaseURL: 'https://digitalflotte-28d6b.firebaseio.com',
  projectId: 'digitalflotte-28d6b',
  storageBucket: 'digitalflotte-28d6b.appspot.com',
  messagingSenderId: '398160567546',
  appId: '1:398160567546:web:d4fd45179b0626c04d7d43',
}

export async function fetchAPI(query, variables = {}, jwt = null) {
  const apiBaseUrl = process.env.apiBaseUrl

  const headers = {
    'Content-Type': 'application/json',
  }
  if (jwt !== null) {
    headers['Authorization'] = `Bearer ${jwt}`
  }
  const res = await fetch(apiBaseUrl + '/graphql', {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      query,
      variables,
    }),
  })

  const json = await res.json()
  if (json.errors) {
    console.error(json.errors)
    throw new Error('Failed to fetch API')
  }
  return json.data
}

export async function performGraphqlQueryWithJwt(query, variables) {
  const result = await fetch('/api/query', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: query,
      variables: variables,
    }),
  })
  const data = await result.json()
  return data
}

export function genRandomCode(length) {
  var result = ''
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789'
  var charactersLength = characters.length
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

export function useWindowSize() {
  const isClient = typeof window === 'object'

  const getSize = () => {
    return {
      width: isClient ? window.innerWidth : undefined,
      height: isClient ? window.innerHeight : undefined,
    }
  }

  const [windowSize, setWindowSize] = useState(getSize)

  const handleResize = () => {
    setWindowSize(getSize())
  }

  useEffect(() => {
    if (!isClient) {
      return false
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, []) // Empty array ensures that effect is only run on mount and unmount

  return windowSize
}

export function inArray(needle, haystack) {
  var length = haystack.length
  for (var i = 0; i < length; i++) {
    if (haystack[i] == needle) return true
  }
  return false
}

export function formatDate(dateString) {
  const date = new Date(dateString)
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  }
  const formattedDate = new Intl.DateTimeFormat('de', options).format(date)
  return formattedDate
}

export function getLinkHrefForTemplate(template) {
  if (template === 'news') {
    return '/news'
  }

  return '/[slug]'
}

export function basename(path) {
  return path.split('/').reverse()[0]
}

export function addToBasketStore(itemNumber, number) {
  const basketStore = store.get('basket')
  const existingNumber = get(store.get('basket'), `[${itemNumber}]`, 0)

  store.set('basket', {
    ...basketStore,
    [itemNumber]: existingNumber + number,
  })
  return store.get('basket')
}

export function setQuantityInBasketStore(itemNumber, number) {
  const basketStore = store.get('basket')

  store.set('basket', {
    ...basketStore,
    [itemNumber]: number,
  })
  return store.get('basket')
}

export function getBasketStore() {
  return store.get('basket')
}

export function removeFromBasketStore(itemNumber) {
  const basketStore = store.get('basket')
  delete basketStore[itemNumber]

  store.set('basket', {
    ...basketStore,
  })
  return store.get('basket')
}

export function priceFormat(num) {
  return number_format(num, 2, ',', '.')
}

export function number_format(number, decimals, decPoint, thousandsSep) {
  number = (number + '').replace(/[^0-9+\-Ee.]/g, '')
  var n = !isFinite(+number) ? 0 : +number
  var prec = !isFinite(+decimals) ? 0 : Math.abs(decimals)
  var sep = typeof thousandsSep === 'undefined' ? ',' : thousandsSep
  var dec = typeof decPoint === 'undefined' ? '.' : decPoint
  var s = ''

  var toFixedFix = function (n, prec) {
    if (('' + n).indexOf('e') === -1) {
      return +(Math.round(n + 'e+' + prec) + 'e-' + prec)
    } else {
      var arr = ('' + n).split('e')
      var sig = ''
      if (+arr[1] + prec > 0) {
        sig = '+'
      }
      return (+(
        Math.round(+arr[0] + 'e' + sig + (+arr[1] + prec)) +
        'e-' +
        prec
      )).toFixed(prec)
    }
  }

  // @todo: for IE parseFloat(0.55).toFixed(0) = 0;
  s = (prec ? toFixedFix(n, prec).toString() : '' + Math.round(n)).split('.')
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep)
  }
  if ((s[1] || '').length < prec) {
    s[1] = s[1] || ''
    s[1] += new Array(prec - s[1].length + 1).join('0')
  }

  return s.join(dec)
}

export function Loading() {
  return (
    <div className="has-text-centered">
      <img alt={'loading'} src={'/images/loading.svg'} />
    </div>
  )
}

export async function createStrapiUserFromContact(
  vorname,
  nachname,
  firmenname,
  email,
  telefon
) {
  const response = await fetch('/api/rest', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      endpoint: 'create-webshop-user-from-contact/',
      variables: {
        vorname,
        nachname,
        firmenname,
        email,
        telefon,
      },
    }),
  })
  const data = await response.json()
}
