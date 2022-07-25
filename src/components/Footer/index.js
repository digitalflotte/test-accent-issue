import React, { useState } from 'react'
import Link from 'next/link'
import { get } from 'lodash'
import axios from 'axios'

export default function Footer({
  services,
  hardwares,
  solutions,
  solutionCategories,
}) {
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  async function handleNewsletterForm(e) {
    e.preventDefault()

    if (email.trim() === '') {
      return
    }

    const response = await axios
      .post(
        `https://api.hsforms.com/submissions/v3/integration/submit/6059633/e56222d0-ec97-4df4-b24b-7c3fffcbe887`,
        {
          submittedAt: new Date().getTime(),
          fields: [
            {
              name: 'firstname',
              value: firstName,
            },
            {
              name: 'lastname',
              value: lastName,
            },
            {
              name: 'email',
              value: email,
            },
          ],
          context: {
            pageUri: document.location.href,
            pageName: 'Digitalflotte newsletter',
          },
        }
      )
      .catch((error) => {
        const errorMessage = get(error, 'response.data.errors[0].message', null)
        if (errorMessage) {
          alert(errorMessage)
        } else {
          alert('An error occurred.')
        }
      })

    const responseMessage = get(response, 'data.inlineMessage', null)
    if (responseMessage) {
      setEmail('')
      setFirstName('')
      setLastName('')

      alert(responseMessage)
    }
  }

  return (
    <>
      <section className="section newsletter">
        <div className="container has-text-centered">
          <div className="columns">
            <div className="column">
              <h4 className="title is-3">Bleiben Sie auf dem Laufenden.</h4>

              <p>
                Wir informieren Sie über neue Trends und Produktentwicklungen.
                Newsletter abonnieren:
              </p>

              <form className="newsletter_form" onSubmit={handleNewsletterForm}>
                <div className="field is-horizontal">
                  <div className="field-body">
                    <div className="field">
                      <p className="control">
                        <input
                          className="input"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          type="text"
                          placeholder="Vorname"
                        />
                      </p>
                    </div>
                    <div className="field">
                      <p className="control">
                        <input
                          className="input"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          type="text"
                          placeholder="Nachname"
                        />
                      </p>
                    </div>
                  </div>
                </div>

                <div className="field">
                  <p className="control">
                    <input
                      className="input"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      placeholder="E-mail Adresse"
                    />
                    <button type="submit" aria-label={'Subscribe'}>
                      <i className="fa fa-check" aria-hidden />
                    </button>
                  </p>
                </div>

                <br />
                <p className="is-size-7">
                  <label>
                    <input type="checkbox" required /> Ich habe die{' '}
                    <a href="/agb" target={'_blank'} rel="noreferrer">
                      AGB
                    </a>{' '}
                    gelesen und akzeptiere diese. Mit meiner Anmeldung stimme
                    ich zu der Verarbeitung und Nutzung meiner Daten durch
                    Optimotive GmbH gemäß der{' '}
                    <a href="/datenschutz" target={'_blank'} rel="noreferrer">
                      Datenschutzerklärung
                    </a>
                    .
                  </label>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="section footer-top">
        <div className="container">
          <div className="columns">
            <div className="column has-text-centered">
              <a
                target="_blank"
                href="https://www.facebook.com/digitalflotte/"
                rel="noreferrer">
                <i className="fab fa-facebook-f" aria-hidden="true" />
              </a>
              <a
                target="_blank"
                rel="noreferrer"
                href="https://www.linkedin.com/company/optimotive-gmbh/">
                <i className="fab fa-linkedin" aria-hidden="true" />
              </a>
              <a
                target="_blank"
                rel="noreferrer"
                href="https://twitter.com/optimotivegmbh">
                <i className="fab fa-twitter" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </section>
      <footer className="footer">
        <div className="container">
          <div className="columns is-multiline is-mobile">
            <div className="column is-6-mobile is-3-tablet">
              <h4 className="title is-6">Produkte</h4>

              <Link href="/funktionen">
                <a className="is-uppercase">Funktionen</a>
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
                      <a>{service.Name}</a>
                    </Link>
                  ))}

              <br />

              <Link href="/hardware">
                <a className="is-uppercase">Hardware</a>
              </Link>
              {hardwares &&
                hardwares.map((hardware, index) => (
                  <Link
                    key={`hardwareSubmenuItem_${index}`}
                    href="/hardware/[hardwareUrl]"
                    as={`/hardware/${hardware.Url}`}>
                    <a>{hardware.Name}</a>
                  </Link>
                ))}
              <Link href="/[slug]/" as={`/gps-telematik-losungen-vergleich`}>
                <a>Hardwarevergleich</a>
              </Link>
            </div>

            <div className="column is-6-mobile is-3-tablet">
              <h4 className="title is-6">
                <Link href="/[slug]/" as="/tacho-losungen">
                  <a className="is-uppercase">Tacho Lösungen</a>
                </Link>
              </h4>

              <Link href="/[slug]/" as={`/tacho-losungen-basic`}>
                <a>Basic</a>
              </Link>
              <Link href="/[slug]/" as={`/tacho-losungen-pro`}>
                <a>Pro</a>
              </Link>
              <Link href="/[slug]/" as={`/tacho-losungen-expert`}>
                <a>Expert</a>
              </Link>
              <Link href="/[slug]/" as={`/tacho_loesungen_vergleich`}>
                <a>Lösungsvergleich</a>
              </Link>

              <br />

              <Link href="/[slug]/" as={`/partner`}>
                <a className="is-uppercase">Partner</a>
              </Link>

              <Link href="/[slug]" as="/vertriebspartner-suchen">
                <a>Vertriebspartner suchen</a>
              </Link>
              <Link href="/[slug]" as="/vertriebspartner-werden">
                <a>Vertriebspartner werden</a>
              </Link>
            </div>

            <div className="column is-6-mobile is-3-tablet">
              <h4 className="title is-6">Lösungen</h4>

              <Link href="/losungen">
                <a className="is-uppercase">Branchen</a>
              </Link>
              {solutions &&
                solutions.map((solution, index) => (
                  <Link
                    key={`solutionSubmenuItem_${index}`}
                    href="/losungen/[solutionUrl]"
                    as={`/losungen/${solution.Url}`}>
                    <a>{solution.Name}</a>
                  </Link>
                ))}

              <br />

              <Link href="/losungen-kategorien">
                <a className="is-uppercase">Kategorien</a>
              </Link>
              {solutionCategories &&
                solutionCategories.map((solution, index) => (
                  <Link
                    key={`solutionCatSubmenuItem_${index}`}
                    href="/losungen-kategorien/[solutionUrl]"
                    as={`/losungen-kategorien/${solution.Url}`}>
                    <a>{solution.Name}</a>
                  </Link>
                ))}
            </div>

            <div className="column is-6-mobile is-3-tablet">
              <h4 className="title is-6">Informationen</h4>

              <Link href="/[slug]" as="/kontakt">
                <a>Kontaktieren Sie uns</a>
              </Link>
              <Link href="/[slug]" as="/support">
                <a>Support</a>
              </Link>
              <Link href="/[slug]" as="/downloads">
                <a>Downloadportal</a>
              </Link>
              <Link href="/[slug]" as="/impressum">
                <a>Impressum</a>
              </Link>
              <Link href="/[slug]" as="/agb">
                <a>AGB</a>
              </Link>
              <Link href="/[slug]" as="/datenschutz">
                <a>Datenschutzerklärung</a>
              </Link>
              <Link href="/news">
                <a>News</a>
              </Link>

              <a
                href="https://app.optimotive.de/"
                target="_blank"
                rel="noreferrer">
                Anmeldung App
              </a>

              <Link href="/produkt">
                <a>Webshop</a>
              </Link>
            </div>
          </div>
        </div>
      </footer>
      <section className="section footer-bottom">
        <div className="container">
          <div className="columns">
            <div className="column">
              Copyright © {new Date().getFullYear()} Optimotive All rights
              reserved.
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
