import React, { useState } from 'react'
import TagManager from 'react-gtm-module'
import axios from 'axios'
import { get } from 'lodash'
import { createStrapiUserFromContact } from '../../utils'

export default function HeroFormPart({ vehicles, service }) {
  const [firmenname, setFirmenname] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [telefon, setTelefon] = useState('')
  const [nachricht, setNachricht] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()

    if (e.target.phone.value !== '') {
      return
    }

    if (name === '' || firmenname === '' || email === '') {
      alert('Die mit * markierten Felder sind Pflichtfelder!')
    } else if (!email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
      alert('Invalid email!')
    } else {
      const tagManagerArgs = {
        gtmId: process.env.gtmCode,
        events: {
          enquire: {
            vorname: '',
            nachname: name,
            firmenname: firmenname,
            nachricht: nachricht,
            interessiert: service,
            email: email,
          },
        },
      }

      TagManager.initialize(tagManagerArgs)

      const response = await axios
        .post(
          `https://api.hsforms.com/submissions/v3/integration/submit/6059633/801bf2e9-b356-42d8-9e66-9f40a066de09`,
          {
            submittedAt: new Date().getTime(),
            fields: [
              {
                name: 'gender',
                value: '',
              },
              {
                name: 'firstname',
                value: '-',
              },
              {
                name: 'lastname',
                value: name,
              },
              {
                name: 'company',
                value: firmenname,
              },
              {
                name: 'flottengr_e',
                value: vehicles,
              },
              {
                name: 'interesse',
                value: service,
              },
              {
                name: 'email',
                value: email,
              },
              {
                name: 'mobilephone',
                value: telefon,
              },
              {
                name: 'message',
                value: nachricht,
              },
            ],
            context: {
              pageUri: 'www.digitalflotte.com/',
              pageName: 'Digitalflotte homepage',
            },
          }
        )
        .catch((error) => {
          const errorMessage = get(
            error,
            'response.data.errors[0].message',
            null
          )
          if (errorMessage) {
            alert(errorMessage)
          } else {
            alert('An error occurred.')
          }
        })

      const responseMessage = get(response, 'data.inlineMessage', null)
      if (responseMessage) {
        createStrapiUserFromContact('', name, firmenname, email, telefon)

        setName('')
        setFirmenname('')
        setEmail('')
        setTelefon('')
        setNachricht('')

        alert(responseMessage)
        document.location = '/vielen-dank-fur-ihre-anfrage'
      }
    }
  }

  return (
    <form className="hero-form-form" onSubmit={handleSubmit}>
      <div className="field">
        <div className="control has-icons-left">
          <input
            required={true}
            className="input is-small is-rounded"
            type="text"
            placeholder="Firmenname*"
            value={firmenname}
            onChange={(e) => setFirmenname(e.target.value)}
          />
          <span className="icon is-small is-left">
            <i className="fas fa-building" aria-hidden />
          </span>
        </div>
      </div>

      <div className="field">
        <div className="control has-icons-left">
          <input
            required={true}
            className="input is-small is-rounded"
            type="text"
            placeholder="Name*"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <span className="icon is-small is-left">
            <i className="fas fa-user" aria-hidden />
          </span>
        </div>
      </div>

      <div className="field">
        <div className="control has-icons-left">
          <input
            required={true}
            className="input is-small is-rounded"
            type="email"
            placeholder="E-Mail*"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <span className="icon is-small is-left">
            <i className="fas fa-envelope" aria-hidden />
          </span>
        </div>
      </div>

      <div className="field">
        <div className="control has-icons-left">
          <input
            required={true}
            className="input is-small is-rounded"
            type="text"
            placeholder="Telefon*"
            value={telefon}
            onChange={(e) => setTelefon(e.target.value)}
          />
          <span className="icon is-small is-left">
            <i className="fas fa-phone-alt" aria-hidden />
          </span>
        </div>
      </div>

      <div className="field">
        <div className="control has-icons-left">
          <textarea
            required={true}
            className="textarea is-small is-rounded"
            placeholder="Ihre Nachricht"
            value={nachricht}
            onChange={(e) => setNachricht(e.target.value)}
          />
          <span className="icon is-small is-left textarea_icon_wrapper">
            <i className="fas fa-edit" aria-hidden />
          </span>
        </div>
      </div>

      <input
        className="input is-small rjttt"
        type="text"
        name="phone"
        placeholder="Phone"
        defaultValue=""
      />

      <div className="field has-text-right">
        <div className="control">
          <button type={'submit'} className={'button is-rounded is-primary'}>
            ABSENDEN &nbsp;
            <i className="fa fa-chevron-right" aria-hidden />
          </button>
        </div>
      </div>
    </form>
  )
}
