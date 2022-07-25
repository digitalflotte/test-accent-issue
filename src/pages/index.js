import React from 'react'
import Layout from '../components/Layout'
import { fetchAPI } from '../utils'
import SideBySide from '../components/SideBySide'
import BgImageSection from '../components/BgImageSection'
import ServiceBoxes from '../components/ServiceBoxes'
import { Markdown } from 'react-showdown'
import WhatOurCustomersSay from '../components/WhatOurCustomersSay'
import LatestUpdates from '../components/LatestUpdates'

const isServer = typeof window === 'undefined'
const WOW = !isServer ? require('wow.js') : null

function Home({
  navigations,
  page,
  services,
  hardwares,
  solutions,
  solutionCategories,
  whatOurCustomersSays,
  homepageSlider,
}) {
  const components = page.Components
  const firstComponent = components[0]
  const lastComponent = components[components.length - 1]

  return (
    <Layout
      navigations={navigations}
      SEO_title={page.SEO_title}
      SEO_description={page.SEO_description}
      template="index"
      heroBanners={page.Hero_banners}
      services={services}
      hardwares={hardwares}
      solutions={solutions}
      solutionCategories={solutionCategories}>
      <section className="section home-page-text">
        <div className="container">
          <div className="columns">
            <div className="column has-text-centered">
              <div className="content is-size-5-widescreen">
                <h2 className="title is-1">{firstComponent.Title}</h2>
                <Markdown
                  markup={firstComponent.Text}
                  options={{ simpleLineBreaks: true }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <ServiceBoxes services={services} />
      <SideBySide
        articles={components.filter(
          (article, index) =>
            typeof article.Image !== 'undefined' &&
            index < components.length - 1
        )}
      />
      <BgImageSection article={lastComponent} />
      <WhatOurCustomersSay articles={whatOurCustomersSays} />
      <LatestUpdates homepageSlider={homepageSlider} />
    </Layout>
  )
}

export async function getStaticProps(context) {
  const query = `
    query{
      navigations {
        Location, Menu_item { Name, External_url, page {URL, Template} }
      }
      
      pages (where: {Template: "index"}) {
        Name, SEO_title, SEO_description, Template,
        Hero_banners {
          Image { url }, Title, Subtitle, Link_text, Link_url, Link_text2, Link_url2
        }
        Components { 
          ... on ComponentContentText {
            Title, Text
          } 
          ... on ComponentContentHero {
            Image { url }, Title, Subtitle, Link_text, Link_url, Link_text2, Link_url2, Text, Bottom_banner
          } 
        }
      }
      
      services {
        Name, Url, Box_title, Box_subtitle, Box_icon, ordering
        Components {
          ... on ComponentContentHero {
            Image { url }, Title, Subtitle, Link_text, Link_url, Link_text2, Link_url2, Text, Bottom_banner
          } 
        }
      }
      devices {
        Name, Url        
      }
      solutions {
        Name, Url
      }
      solutionCategories {
        Name, Url
      }
      whatOurCustomersSays {
        Title, Subtitle, Image { url }
      }
      homepageSlider {
        Title, Slider_images { Image { url }, Url }
      }
    }`
  const indexPageData = await fetchAPI(query, {})

  return {
    props: {
      navigations: indexPageData.navigations,
      page: indexPageData.pages[0],
      services: indexPageData.services,
      hardwares: indexPageData.devices,
      solutions: indexPageData.solutions,
      solutionCategories: indexPageData.solutionCategories,
      whatOurCustomersSays: indexPageData.whatOurCustomersSays,
      homepageSlider: indexPageData.homepageSlider,
    },
    revalidate: process.env.revalidate, // In seconds
  }
}

export default Home
