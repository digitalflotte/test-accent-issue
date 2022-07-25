const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')
//
module.exports = (phase) => {
  return {
    env: {
      apiBaseUrl: 'https://strapi.digitalflotte.com',
      vat: 19,
      revalidate: 3600 * 5,
      gtmCode: '',
    },
  }
}
