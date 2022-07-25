import Link from 'next/link'
import React from 'react'

export default function ProductSubmenu({ services, hardwares, display }) {
  return (
    <div
      className="columns is-marginless is-multiline"
      style={{ display: display ? 'flex' : 'none' }}>
      <div className="column is-4">
        <Link href="/funktionen">
          <a className="col-title">Funktionen</a>
        </Link>

        {services &&
          services
            .sort(function (a, b) {
              if (a.ordering > b.ordering) return 1
              if (a.ordering < b.ordering) return -1
              return 0
            })
            .map((service, index) => (
              <Link
                key={`serviceSubmenuItem_${index}`}
                href="/funktionen/[serviceUrl]"
                as={`/funktionen/${service.Url}`}>
                <a className="submenu-link-item">{service.Name}</a>
              </Link>
            ))}
      </div>
      <div className="column is-4">
        <Link href="/hardware">
          <a className="col-title">Hardware</a>
        </Link>

        {hardwares &&
          hardwares.map((hardware, index) => (
            <Link
              key={`hardwareSubmenuItem_${index}`}
              href="/hardware/[hardwareUrl]"
              as={`/hardware/${hardware.Url}`}>
              <a className="submenu-link-item">{hardware.Name}</a>
            </Link>
          ))}
      </div>
    </div>
  )
}
