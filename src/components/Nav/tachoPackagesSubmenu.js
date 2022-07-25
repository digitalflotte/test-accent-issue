import Link from 'next/link'
import React from 'react'
import classNames from 'classnames'
import { useRouter } from 'next/router'

export default function TachoPackagesSubmenu({ display }) {
  const router = useRouter()
  return (
    <div
      className="columns is-marginless is-multiline"
      style={{ display: display ? 'flex' : 'none' }}>
      <div className="column">
        <div className="col-title">Hardware</div>

        <Link href={'/[slug]'} as={'/tacho-losungen-basic'}>
          <a
            className={classNames('submenu-link-item', {
              'is-active': router.asPath === '/tacho-losungen-basic',
            })}>
            Basic
          </a>
        </Link>
        <Link href={'/[slug]'} as={'/tacho-losungen-pro'}>
          <a
            className={classNames('submenu-link-item', {
              'is-active': router.asPath === '/tacho-losungen-pro',
            })}>
            Pro
          </a>
        </Link>
        <Link href={'/[slug]'} as={'/tacho-losungen-expert'}>
          <a
            className={classNames('submenu-link-item', {
              'is-active': router.asPath === '/tacho-losungen-expert',
            })}>
            Expert
          </a>
        </Link>
      </div>
    </div>
  )
}
