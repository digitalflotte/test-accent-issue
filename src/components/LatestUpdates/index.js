import React from 'react'
import { Carousel } from 'react-responsive-carousel'

export default function LatestUpdates({ homepageSlider }) {
  return (
    <section className="section latest-updates">
      <div className="container">
        <div className="columns">
          <div className="column has-text-centered">
            <h2 className="title is-3 is-uppercase">{homepageSlider.Title}</h2>
            <Carousel
              autoPlay={false}
              showArrows={true}
              showStatus={false}
              onChange={function () {}}
              onClickItem={function () {}}
              onClickThumb={function () {}}
              renderThumbs={function () {}}>
              {homepageSlider.Slider_images &&
                homepageSlider.Slider_images.map((slider, index) => (
                  <a
                    href={slider.Url}
                    target={'_blank'}
                    rel="noreferrer"
                    className="carousel-box"
                    key={`carousel_key_${index}`}
                    style={{ backgroundImage: `url('${slider.Image.url}')` }}
                  />
                ))}
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  )
}
