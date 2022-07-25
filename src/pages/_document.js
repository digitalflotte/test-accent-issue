import Document, { Html, Head, Main, NextScript } from 'next/document'
import React from 'react'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang="de">
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;700&display=swap"
            rel="stylesheet"
          />
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/animate.css@3.5.2/animate.min.css"
          />
          <script
            src="https://kit.fontawesome.com/23fff1f4b9.js"
            crossOrigin="anonymous"
          />
          <link
            rel="shortcut icon"
            href="/images/optimotive_logo_favicon.png"
            type="image/png"
          />
          <script src="https://www.paypal.com/sdk/js?client-id=Af53jPiZFyh8gPyZ6VKlk34VFRIE2bKSmOMYo6wxuTKgM4bMFi1lpyt47A2Vy7gu3_-6dWbV3UlxIh6G&currency=EUR" />

          <script
            type="text/javascript"
            id="hs-script-loader"
            async
            defer
            src="//js.hs-scripts.com/6059633.js"
          />

          <meta
            name="google-site-verification"
            content="s_vSLm7-8E4ZQ1qEj0uBCEAfcBqxFZSX6Ty3x5tDWtE"
          />

          <meta
            name="facebook-domain-verification"
            content="v0uilxxz3tnj6l1jdglybmjzwbfjga"
          />

          <script
            dangerouslySetInnerHTML={{
              __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '1030629854156878');
              fbq('track', 'PageView');`,
            }}
          />

          <noscript
            dangerouslySetInnerHTML={{
              __html: `<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=1030629854156878&ev=PageView&noscript=1" />`,
            }}
          />

          <script
            src="https://members.profitfinder.app/scripts/lvhGC4ijeEqL6Fr2jUAmp9BPcv31Om90.js"
            tt="tp"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: `
          _linkedin_partner_id = "3571937";
            window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
            window._linkedin_data_partner_ids.push(_linkedin_partner_id);`,
            }}
          />
          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: `
            (function(){var s = document.getElementsByTagName("script")[0];
            var b = document.createElement("script");
            b.type = "text/javascript";b.async = true;
            b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
            s.parentNode.insertBefore(b, s);})();`,
            }}
          />
          <noscript
            dangerouslySetInnerHTML={{
              __html: `<img height='1' width='1' style='display:none;' alt='' src='https://px.ads.linkedin.com/collect/?pid=3571937&fmt=gif' />`,
            }}
          />
        </body>
      </Html>
    )
  }
}

export default MyDocument
