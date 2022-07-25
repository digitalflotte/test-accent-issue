import React from 'react'

export default function WhatOurCustomersSay({ articles }) {
  return (
    <section className="section what-our-customers-say has-gray-bg">
      <div className="container">
        <div className="columns">
          <div className="column has-text-centered">
            <h2 className="title is-3">Das sagen unsere Kunden</h2>

            <br />
            <div className="columns">
              {articles &&
                articles.map((article, index) => (
                  <div key={`whatOurKey_${index}`} className="column is-4">
                    <div
                      className="customer-image"
                      style={{ backgroundImage: `url('${article.Image.url}')` }}
                    />
                    <h4 className="title is-5">{article.Title}</h4>
                    <p>{article.Subtitle}</p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
