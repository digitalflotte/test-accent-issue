import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import classNames from 'classnames'
import IosSearch from 'react-ionicons/lib/IosSearch'
import IosContact from 'react-ionicons/lib/IosContact'

import ProductSubmenu from './productSubmenu'
import SolutionSubmenu from './solutionSubmenu'
import { useRouter } from 'next/router'
import OutsideClick from 'react-outsideclick'
import BasketPanel from '../BasketPanel'
import {
  toggleBasketPanel,
  toggleSearchOverlay,
} from '../../redux/uiHelper/actions'
import { useDispatch, useSelector } from 'react-redux'
import TachoPackagesSubmenu from './tachoPackagesSubmenu'

let lockSubmenuClose = false

export default function Nav({
  nav,
  services,
  hardwares,
  solutions,
  solutionCategories,
  template,
  burgerState,
  burgerFunction,
}) {
  const dispatch = useDispatch()
  const [displayProductSubmenu, setDisplayProductSubmenu] = useState(false)
  const [displaySolutionSubmenu, setDisplaySolutionSubmenu] = useState(false)
  const [displayTachoPackagesSubmenu, setDisplayTachoPackagesSubmenu] =
    useState(false)

  const router = useRouter()

  const { user } = useSelector((state) => state.user)
  const { basketStore } = useSelector((state) => state.basket)
  const basketNumber = basketStore ? Object.keys(basketStore).length : 0

  const { menuType } = useSelector((state) => state.uiHelper)

  useEffect(() => {
    if (router) {
      closeSubmenuPanel()
    }
  }, [router])

  const clickHandler = (index) => {
    lockAndUnlock()
    if (index === 0) {
      // Produkte submenu.
      setDisplayProductSubmenu(!displayProductSubmenu)
      setDisplaySolutionSubmenu(false)
    }
    if (index === 1) {
      // Lösungen submenu.
      setDisplaySolutionSubmenu(!displaySolutionSubmenu)
      setDisplayProductSubmenu(false)
    }
    if (index === 'Daten auslesen') {
      // TachoPackages submenu.
      setDisplayTachoPackagesSubmenu(!displayTachoPackagesSubmenu)
    }
  }

  function lockAndUnlock() {
    lockSubmenuClose = true
    setTimeout(function () {
      lockSubmenuClose = false
    }, 200)
  }

  function closeSubmenuPanel() {
    if (
      displayProductSubmenu ||
      displaySolutionSubmenu ||
      displayTachoPackagesSubmenu
    ) {
      setDisplayProductSubmenu(false)
      setDisplaySolutionSubmenu(false)
      setDisplayTachoPackagesSubmenu(false)
    }
  }

  return (
    <>
      <nav className="navbar">
        <div className="container">
          <div className="navbar-brand">
            <span
              className={classNames('navbar-burger burger', {
                'is-active': burgerState,
              })}
              onClick={() => burgerFunction(!burgerState)}>
              <span></span>
              <span></span>
              <span></span>
            </span>
            <Link href={menuType === 'TACHO' ? '/tacho-losungen' : '/'}>
              <a className="navbar-item">
                <img src="/images/Logo_OM_Digitalflotte_svg.svg" alt="Logo" />
              </a>
            </Link>
            <a
              className="is-hidden-desktop phone-item"
              href={'tel:+4972354464054'}>
              <i className="fa fa-phone-alt" aria-hidden />
            </a>
            <Link href={'/einkaufswagen'}>
              <a className="cart-mobile-link is-hidden-desktop">
                <i className="fas fa-shopping-cart" aria-hidden={'true'} />
                <span className="badge">{basketNumber}</span>
              </a>
            </Link>
          </div>
          <div
            className={classNames('navbar-menu', {
              'is-open': burgerState,
            })}>
            <div className="navbar-start">
              {menuType &&
                menuType === 'LKW' &&
                nav[0].Menu_item.map((menuItem, index) => {
                  if (
                    menuItem.External_url !== null &&
                    menuItem.External_url !== ''
                  ) {
                    const props = {
                      key: `mainNavItemKey_${index}`,
                      target: '_blank',
                      rel: 'noreferrer',
                      href: menuItem.External_url,
                      className: 'navbar-item',
                    }
                    return <a {...props}>{menuItem.Name}</a>
                  } else if (menuItem.page !== null) {
                    return (
                      <Link
                        key={`mainNavItemKey_${index}`}
                        href={menuItem.page.URL}>
                        <a className="navbar-item">{menuItem.Name}</a>
                      </Link>
                    )
                  } else {
                    return (
                      <a
                        key={`mainNavItemKey_${index}`}
                        className={classNames('navbar-item', {
                          'is-active': index === 0 && displayProductSubmenu,
                        })}
                        onClick={() => clickHandler(index)}>
                        {menuItem.Name}
                      </a>
                    )
                  }
                })}

              {menuType && menuType === 'TACHO' && (
                <>
                  <a
                    className={classNames('navbar-item', {
                      'is-active': displayTachoPackagesSubmenu,
                    })}
                    onClick={() => clickHandler('Daten auslesen')}>
                    Daten auslesen
                  </a>

                  <Link
                    href={'/[slug]'}
                    as={
                      '/auswertung-archivierung-tacho-fahrtenschreiberdaten-fahrerkarten'
                    }>
                    <a className="navbar-item">Auswertung</a>
                  </Link>

                  <Link href={'/[slug]'} as={'/produkt'}>
                    <a className="navbar-item">Webshop</a>
                  </Link>
                </>
              )}

              <Link href={`/[slug]`} as={`/registrierung`}>
                <a
                  className={classNames('navbar-item is-hidden-desktop', {
                    'is-active': router.asPath === '/registrierung',
                  })}>
                  {user ? 'Profil' : 'Anmelden'}
                </a>
              </Link>

              <Link href={'/[slug]'} as={'/kontakt'}>
                <a className="button is-rounded is-primary is-small is-hidden-desktop">
                  Kontakt
                </a>
              </Link>
            </div>
            <div className="navbar-end">
              <div className="navbar-end__call">
                Rufen Sie uns an
                <br />
                <a href={'tel:+4972354464054'}>07235 4464054</a>
              </div>

              <Link href={'/[slug]'} as={'/kontakt'}>
                <a className="button is-rounded is-primary">
                  Kontaktieren Sie uns
                </a>
              </Link>

              <button
                className="search"
                aria-label={'Search'}
                onClick={() => dispatch(toggleSearchOverlay())}>
                <IosSearch fontSize={'30px'} />
              </button>

              <Link href={`/[slug]`} as={`/registrierung`}>
                <button className="profile" aria-label={'Profile'}>
                  <IosContact fontSize={'30px'} />
                </button>
              </Link>

              <button
                className="cart"
                onClick={() => dispatch(toggleBasketPanel())}>
                <i className="fas fa-shopping-cart" aria-hidden={'true'} />
                <span className="badge">{basketNumber}</span>
              </button>

              <BasketPanel />
            </div>
          </div>
        </div>
      </nav>

      <OutsideClick
        onClickOutside={() => {
          if (!lockSubmenuClose) {
            closeSubmenuPanel()
          }
        }}>
        <div
          className={classNames('submenu-panel', {
            'burger-is-open': burgerState,
            'submenu-is-open':
              displayProductSubmenu ||
              displaySolutionSubmenu ||
              displayTachoPackagesSubmenu,
          })}
          style={{
            display:
              displayProductSubmenu ||
              displaySolutionSubmenu ||
              displayTachoPackagesSubmenu
                ? 'block'
                : 'none',
          }}>
          <div className="container">
            <ProductSubmenu
              services={services}
              hardwares={hardwares}
              display={displayProductSubmenu}
            />
            <SolutionSubmenu
              solutions={solutions}
              solutionCategories={solutionCategories}
              display={displaySolutionSubmenu}
            />
            <TachoPackagesSubmenu display={displayTachoPackagesSubmenu} />
          </div>
        </div>
      </OutsideClick>
    </>
  )
}
