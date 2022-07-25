import React, { useState } from 'react'
import classNames from 'classnames'
import HeroFormPart from './form'

export default function HeroForm() {
  const [step, setStep] = useState(0)
  const [vehicles, setVehicles] = useState('1-2')
  const [losungen, setLosungen] = useState('tacho')
  const [service, setService] = useState('Manuell auslesen')

  return (
    <div className={'hero-form-wrapper'}>
      <div className="container">
        <div className={'left-box'}>
          <h1 className={'title is-3 mb-0'}>ANGEBOT ANFORDERN</h1>
          <div className={'schritt'}>Schritt {step + 1} von 4</div>

          <div className={'steps'}>
            <div className={classNames('step', { hidden: step !== 0 })}>
              <div className="control">
                <label className="radio">
                  <input
                    type="radio"
                    name={'myRadio'}
                    defaultChecked={true}
                    onClick={() => setVehicles('1-2')}
                  />{' '}
                  1-2 Fahrzeuge
                </label>
                <label className="radio">
                  <input
                    type="radio"
                    name={'myRadio'}
                    onClick={() => setVehicles('3-9')}
                  />{' '}
                  3-9 Fahrzeuge
                </label>
                <label className="radio">
                  <input
                    type="radio"
                    name={'myRadio'}
                    onClick={() => setVehicles('10-49')}
                  />{' '}
                  10-49 Fahrzeuge
                </label>
                <label className="radio">
                  <input
                    type="radio"
                    name={'myRadio'}
                    onClick={() => setVehicles('>50')}
                  />{' '}
                  >50 Fahrzeuge
                </label>
              </div>
            </div>
            <div className={classNames('step', { hidden: step !== 1 })}>
              <label className="radio">
                <input
                  type="radio"
                  name={'myRadio2'}
                  defaultChecked={true}
                  onClick={() => {
                    setLosungen('tacho')
                    setService('Manuell auslesen')
                  }}
                />{' '}
                Tacho Lösungen
              </label>
              <label className="radio">
                <input
                  type="radio"
                  name={'myRadio2'}
                  onClick={() => {
                    setLosungen('telematik')
                    setService('Nur Ortung')
                  }}
                />{' '}
                LKW Telematik (GPS)
              </label>
            </div>
            <div className={classNames('step', { hidden: step !== 2 })}>
              {losungen === 'tacho' && (
                <>
                  <label className="radio">
                    <input
                      type="radio"
                      name={'myRadio31'}
                      defaultChecked={service === 'Manuell auslesen'}
                      onClick={() => setService('Manuell auslesen')}
                    />{' '}
                    Manuell auslesen
                  </label>
                  <label className="radio">
                    <input
                      type="radio"
                      name={'myRadio31'}
                      onClick={() => setService('Halbautomatisch auslesen')}
                    />{' '}
                    Halbautomatisch auslesen
                  </label>
                  <label className="radio">
                    <input
                      type="radio"
                      name={'myRadio31'}
                      onClick={() => setService('Fernauslesen')}
                    />{' '}
                    Fernauslesen
                  </label>
                  <label className="radio">
                    <input
                      type="radio"
                      name={'myRadio31'}
                      onClick={() => setService('Auswertung')}
                    />{' '}
                    Auswertung
                  </label>
                  <label className="radio">
                    <input
                      type="radio"
                      name={'myRadio31'}
                      onClick={() =>
                        setService('Ich möchte kostenlose Beratung (Telematik)')
                      }
                    />{' '}
                    Ich möchte kostenlose Beratung
                  </label>
                </>
              )}
              {losungen === 'telematik' && (
                <>
                  <label className="radio">
                    <input
                      type="radio"
                      name={'myRadio32'}
                      defaultChecked={service === 'Nur Ortung'}
                      onClick={() => setService('Nur Ortung')}
                    />{' '}
                    Nur Ortung
                  </label>
                  <label className="radio">
                    <input
                      type="radio"
                      name={'myRadio32'}
                      onClick={() =>
                        setService('Ortung und Tacho Fernauslesen')
                      }
                    />{' '}
                    Ortung und Tacho Fernauslesen
                  </label>
                  <label className="radio">
                    <input
                      type="radio"
                      name={'myRadio32'}
                      onClick={() =>
                        setService('Ortung mit Weitere Funktionen')
                      }
                    />{' '}
                    Ortung mit Weitere Funktionen
                  </label>
                  <label className="radio">
                    <input
                      type="radio"
                      name={'myRadio32'}
                      onClick={() =>
                        setService('Ich möchte kostenlose Beratung (LKW)')
                      }
                    />{' '}
                    Ich möchte kostenlose Beratung
                  </label>
                </>
              )}
            </div>
            <div className={classNames('step', { hidden: step !== 3 })}>
              <HeroFormPart service={service} vehicles={vehicles} />
            </div>

            <div className={'button-wrapper step_' + step}>
              {!!step && (
                <button
                  className={'button is-rounded'}
                  onClick={() => setStep(step - 1)}>
                  <i className="fa fa-chevron-left" aria-hidden /> &nbsp;ZURÜCK
                </button>
              )}

              {step < 3 && (
                <button
                  className={'button is-rounded is-primary'}
                  onClick={() => setStep(step + 1)}>
                  WEITER &nbsp;
                  <i className="fa fa-chevron-right" aria-hidden />
                </button>
              )}
            </div>
          </div>
        </div>

        <div className={'text-box'}>
          <div className={'content'}>
            Wir bieten modernste Tacho- und Telematik-Lösungen für jede
            Unternehmens- und Flottengröße.
          </div>
        </div>
      </div>
    </div>
  )
}
