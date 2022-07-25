import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import IosSearch from 'react-ionicons/lib/IosSearch'

import { toggleSearchOverlay } from '../../redux/uiHelper/actions'

export default function SearchOverlay() {
  const dispatch = useDispatch()
  const [keyword, setKeyword] = useState('')

  function validateForm(e) {
    if (e.target.keyword.value.trim().length < 3) {
      e.preventDefault()
      alert('Keyword should be at least 3 character.')
    }
  }

  return (
    <div className="modal is-active">
      <div className="modal-background" />
      <div className="modal-content">
        <form
          className="search-overlay-form"
          onSubmit={validateForm}
          action={'/suchen'}>
          <input
            required
            placeholder="Suchen..."
            name="keyword"
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button type="submit">
            <IosSearch fontSize={'3rem'} color={'#c6c6c6'} />
          </button>
        </form>
      </div>
      <button
        className="modal-close is-large"
        aria-label="close"
        onClick={() => dispatch(toggleSearchOverlay())}
      />
    </div>
  )
}
