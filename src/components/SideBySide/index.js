import React from 'react'
import classNames from 'classnames'
import { get } from 'lodash'
import { Markdown } from 'react-showdown'
import Link from 'next/link'

export default function SideBySide({ articles }) {
  return articles.map((article, index) => (
    <section
      key={`sidebysidekey_${index}`}
      className={classNames('section side-by-side', {
        'has-gray-bg': index % 2 === 0,
      })}>
      <div className="container">
        <div className="columns">
          <div className="column">
            {index % 2 !== 0 && imageBox(article)}
            {index % 2 === 0 && textBox(article)}
          </div>
          <div className="column">
            {index % 2 === 0 && imageBox(article)}
            {index % 2 !== 0 && textBox(article)}
          </div>
        </div>
      </div>
    </section>
  ))
}

function imageBox({ Image }) {
  return (
    <div
      className="image-box"
      style={{ backgroundImage: `url('${Image ? Image.url : ''}')` }}
    />
  )
}

function textBox(article) {
  return (
    <div className="text-box content">
      <h2 className="title is-3">{article.Title}</h2>
      <Markdown markup={article.Text} options={{ simpleLineBreaks: true }} />
      {get(article, 'Link_text', null) && get(article, 'Link_url', null) && (
        <Link href={article.Link_url}>
          <a className="button is-rounded is-primary is-outlined">
            {article.Link_text}
          </a>
        </Link>
      )}
      {get(article, 'Link_text2', null) && get(article, 'Link_url2', null) && (
        <>
          <br />
          <Link href={article.Link_url2}>
            <a className="button is-rounded is-green">{article.Link_text2}</a>
          </Link>
        </>
      )}
    </div>
  )
}
