import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import classNames from 'classnames'
import { useDispatch, useSelector } from 'react-redux'

import { loadBasket } from '../../redux/basket/actions'
import SnackBar from '../SnackBar'
import SearchOverlay from '../SearchOverlay'
import {
  setBasketPanelVisibility,
  setMenuType,
} from '../../redux/uiHelper/actions'

export default function LayoutManager({ children }) {
  const router = useRouter()
  const dispatch = useDispatch()

  const { snackBarVisible, searchOverlayVisible, menuType, loadingVisible } =
    useSelector((state) => state.uiHelper)

  useEffect(() => {
    dispatch(loadBasket())
  }, [])

  useEffect(() => {
    dispatch(setBasketPanelVisibility(false))
    let newMenuType = null
    if (
      router.asPath === '/' ||
      router.asPath.substr(1, 10) === 'funktionen' ||
      router.asPath.substr(1, 8) === 'losungen' ||
      router.asPath.substr(1, 8) === 'hardware' ||
      router.asPath.substr(1, 22) === 'gps-telematik-losungen'
    ) {
      newMenuType = 'LKW'
    }
    if (
      router.asPath.substr(1, 6) === 'tacho-' ||
      router.asPath.substr(1, 6) === 'tacho_' ||
      router.asPath.substr(1, 11) === 'auswertung-'
    ) {
      newMenuType = 'TACHO'
    }

    if (newMenuType && newMenuType !== menuType) {
      dispatch(setMenuType(newMenuType))
    }
  }, [router])

  return (
    <div className={classNames(router.query.slug)}>
      {children}
      {snackBarVisible && <SnackBar />}
      {searchOverlayVisible && <SearchOverlay />}
      {loadingVisible && (
        <div className="fullScreenLock">
          <img alt={''} src={'/images/loading.svg'} />
        </div>
      )}
    </div>
  )
}
