import React, { useState, useEffect } from 'react'
import Nav from '../Nav'
import TopNav from '../TopNav'
import classNames from 'classnames'
import Head from 'next/head'
import { get } from 'lodash'
import Footer from '../Footer'
import { useRouter } from 'next/router'
import Link from 'next/link'
import HeroForm from '../HeroForm'

export default function Layout({
  children,
  navigations,
  SEO_title,
  SEO_description,
  template,
  heroBanners = null,
  services,
  hardwares,
  solutions,
  solutionCategories,
}) {
  const router = useRouter()
  const [atTop, setAtTop] = useState(true)
  const [displayedStickyMenu, setDisplayedStickyMenu] = useState(false)
  const [burgerIsOpen, setBurgerIsOpen] = useState(false)

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (router) {
      setBurgerIsOpen(false)
    }
  }, [router])

  let tempWinScroll = 0

  const checkScrolling = () => {
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop
    if (!tempWinScroll) {
      tempWinScroll = winScroll
    }
    if (winScroll >= 34) {
      if (tempWinScroll > winScroll) {
        tempWinScroll = winScroll
        return true
      }
      if (tempWinScroll < winScroll) {
        tempWinScroll = winScroll
        return false
      }
    }
    if (winScroll < 34) {
      tempWinScroll = winScroll
      return false
    }
  }

  const checkAtTop = () => {
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop
    if (winScroll >= 34 && atTop) {
      return false
    }
    if (winScroll < 34) {
      return true
    }
  }

  const handleScroll = () => {
    setDisplayedStickyMenu(checkScrolling())
    setAtTop(checkAtTop())
  }

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>{SEO_title}</title>
        <meta name="description" content={SEO_description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <section
        className={classNames('hero', {
          'is-fullheight': /*template === 'tacho_index'*/ false,
        })}>
        <div
          className={classNames({
            'hero-head': true,
            'is-sticky': !atTop,
            'display-top-row': displayedStickyMenu,
          })}>
          <TopNav
            nav={navigations.filter((nav) => nav.Location === 'top')}
            template={template}
            burgerState={burgerIsOpen}
          />
          <Nav
            services={services}
            hardwares={hardwares}
            solutions={solutions}
            solutionCategories={solutionCategories}
            nav={navigations.filter((nav) => nav.Location === 'main')}
            template={template}
            burgerState={burgerIsOpen}
            burgerFunction={setBurgerIsOpen}
          />
        </div>

        <div
          className={classNames('hero-body', template)}
          style={
            get(heroBanners, '[0].Image.url', null) && {
              backgroundImage: `url("${
                template === 'index'
                  ? 'https://digitalflotte-website.s3.eu-central-1.amazonaws.com/8_defdfd3850.jpg'
                  : get(heroBanners, '[0].Image.url', '')
              }")`,
            }
          }>
          <div className="darkLayer" />

          {template === 'index' || template === 'tacho_index' ? (
            <HeroForm />
          ) : (
            <div className="container">
              <div className="columns is-marginless">
                <div className="column">
                  {get(heroBanners, '[0].Title', null) && (
                    <h1 className="title def">
                      {get(heroBanners, '[0].Title')}
                    </h1>
                  )}
                  {get(heroBanners, '[0].Subtitle', null) && (
                    <h2 className="subtitle def">
                      {get(heroBanners, '[0].Subtitle')}
                    </h2>
                  )}
                  {get(heroBanners, '[0].Link_text', null) && (
                    <Link href={get(heroBanners, '[0].Link_url')}>
                      <a className="button def is-large is-rounded is-primary">
                        {get(heroBanners, '[0].Link_text')}
                      </a>
                    </Link>
                  )}
                  {get(heroBanners, '[0].Link_text2', null) && (
                    <>
                      <br />
                      <Link href={get(heroBanners, '[0].Link_url2')}>
                        <a className="button is-large is-rounded is-green">
                          {get(heroBanners, '[0].Link_text2')}
                        </a>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <div
        className={classNames({
          'display-top-row': displayedStickyMenu,
        })}>
        {children}
      </div>
      <Footer
        services={services}
        hardwares={hardwares}
        solutions={solutions}
        solutionCategories={solutionCategories}
      />
    </>
  )
}
