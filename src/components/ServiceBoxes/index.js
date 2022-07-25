import React from 'react'
import Link from 'next/link'

export default function ServiceBoxes({ services }) {
  return (
    <section className="section service-boxes">
      <div className="container">
        <div className="columns is-multiline">
          {services
            .filter(
              (service) =>
                service.Box_title !== '' && service.Box_title !== null
            )
            .map((service, index) => (
              <div
                key={`serviceBoxKey_${index}`}
                className="column is-6 is-4-desktop has-text-centered">
                <i className={`fa ${service.Box_icon}`} aria-hidden />
                <h4 className="title is-5">{service.Box_title}</h4>
                <div className="box-subtitle">{service.Box_subtitle}</div>
                <Link
                  href="/funktionen/[serviceUrl]"
                  as={'/funktionen/' + service.Url}>
                  <a className="link">{service.Name}</a>
                </Link>
              </div>
            ))}
        </div>
      </div>
    </section>
  )
}
