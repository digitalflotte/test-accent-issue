import { wrapper } from '../redux/store'
import '../sass/styles.sass'
import React, { useEffect } from 'react'
import LayoutManager from '../components/LayoutManager'
import 'react-slidedown/lib/slidedown.css'
import SimpleReactLightbox from 'simple-react-lightbox'
import TagManager from 'react-gtm-module'

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    TagManager.initialize({ gtmId: process.env.gtmCode })
  }, [])

  return (
    <LayoutManager>
      <SimpleReactLightbox>
        <Component {...pageProps} />
      </SimpleReactLightbox>
    </LayoutManager>
  )
}

export default wrapper.withRedux(MyApp)
