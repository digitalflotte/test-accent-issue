import React from 'react'
import { get } from 'lodash'
import Link from 'next/link'

export default function BgImageSection({ article }) {
  return (
    <section
      className="section bg-image-section"
      style={{ backgroundImage: `url('${article.Image.url}')` }}>
      <div className="container">
        <div className="columns">
          <div className="column">
            <h2 className="title is-3">{article.Title}</h2>
            <p>{article.Text}</p>
            {get(article, 'Link_text', null) && get(article, 'Link_url', null) && (
              <Link href={article.Link_url}>
                <a className="button is-rounded is-primary is-large">
                  {article.Link_text}
                </a>
              </Link>
            )}
            {get(article, 'Link_text2', null) &&
              get(article, 'Link_url2', null) && (
                <>
                  <br />
                  <Link href={article.Link_url2}>
                    <a className="button is-rounded is-green is-large">
                      {article.Link_text2}
                    </a>
                  </Link>
                </>
              )}
          </div>
        </div>
      </div>
    </section>
  )
}
