import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import classNames from 'classnames'
import { getLinkHrefForTemplate } from '../../utils'
import { useSelector } from 'react-redux'

export default function TopNav({ nav, template, burgerState }) {
  const router = useRouter()

  const { menuType } = useSelector((state) => state.uiHelper)

  return (
    <div
      className={classNames('top-nav', {
        'is-open': burgerState,
      })}>
      <div className="container">
        <div className="columns is-gapless is-multiline">
          <div className="column is-narrow top-nav__tabs">
            <Link href={'/'}>
              <a
                className={classNames({
                  'is-active': menuType && menuType === 'LKW',
                })}>
                LKW Telematik
              </a>
            </Link>
            <Link href={'/[slug]'} as={'/tacho-losungen'}>
              <a
                className={classNames({
                  'is-active': menuType && menuType === 'TACHO',
                })}>
                Tacho Lösungen
              </a>
            </Link>
          </div>
          <div className="column top-nav__right">
            {nav[0].Menu_item.map((menuItem, index) => {
              if (
                menuItem.External_url !== null &&
                menuItem.External_url !== ''
              ) {
                const props = {
                  key: `topNavItemKey_${index}`,
                  target: '_blank',
                  rel: 'noreferrer',
                  href: menuItem.External_url,
                }
                if (menuItem.External_url === 'https://app.optimotive.de/') {
                  props.className = 'app-button is-hidden-touch'
                }
                return <a {...props}>{menuItem.Name}</a>
              } else if (menuItem.page !== null) {
                return (
                  <Link
                    key={`topNavItemKey_${index}`}
                    href={getLinkHrefForTemplate(menuItem.page.Template)}
                    as={menuItem.page.URL}>
                    <a
                      className={classNames({
                        'is-active': router.asPath === menuItem.page.URL,
                      })}>
                      {menuItem.Name}
                    </a>
                  </Link>
                )
              }
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
