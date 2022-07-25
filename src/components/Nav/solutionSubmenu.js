import Link from 'next/link'
import React from 'react'

export default function SolutionSubmenu({
  solutions,
  solutionCategories,
  display,
}) {
  return (
    <div
      className="columns is-marginless is-multiline"
      style={{ display: display ? 'flex' : 'none' }}>
      <div className="column is-4">
        <Link href="/losungen">
          <a className="col-title">Branchen</a>
        </Link>

        {solutions &&
          solutions.map((solution, index) => (
            <Link
              key={`solutionSubmenuItem_${index}`}
              href="/losungen/[solutionUrl]"
              as={`/losungen/${solution.Url}`}>
              <a className="submenu-link-item">{solution.Name}</a>
            </Link>
          ))}
      </div>

      <div className="column is-4">
        <Link href="/losungen-kategorien">
          <a className="col-title">Kategorien</a>
        </Link>

        {solutionCategories &&
          solutionCategories.map((solution, index) => (
            <Link
              key={`solutionCatSubmenuItem_${index}`}
              href="/losungen-kategorien/[solutionCatUrl]"
              as={`/losungen-kategorien/${solution.Url}`}>
              <a className="submenu-link-item">{solution.Name}</a>
            </Link>
          ))}
      </div>
    </div>
  )
}
