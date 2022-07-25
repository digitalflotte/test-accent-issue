import { useDispatch, useSelector } from 'react-redux'
import classnames from 'classnames'
import React, { useEffect } from 'react'
import { hideSnackBar } from '../../redux/uiHelper/actions'

export default function SnackBar() {
  const {
    snackBarVisible,
    snackBarMessage,
    snackBarType,
    snackBarPosition,
    snackBarTimeout,
    snackBarSticky,
  } = useSelector((store) => store.uiHelper)
  const dispatch = useDispatch()

  const handleClose = () => {
    dispatch(hideSnackBar())
  }

  useEffect(() => {
    if (
      snackBarVisible === true &&
      snackBarTimeout !== null &&
      snackBarSticky === false
    ) {
      setTimeout(function () {
        handleClose()
      }, snackBarTimeout)
    }
  }, [snackBarVisible])

  return (
    snackBarVisible && (
      <div
        className={classnames(
          'snackbar-wrapper',
          `snackbar-wrapper--${snackBarPosition}`
        )}>
        <div
          className={classnames(
            'snackbar-wrapper__snackbar',
            `snackbar-wrapper__snackbar--${snackBarType}`
          )}>
          <div className="snackbar-wrapper__snackbar__message">
            {snackBarMessage}
          </div>
          <div
            className="snackbar-wrapper__snackbar__close"
            onClick={handleClose}>
            <i className="fas fa-times" aria-hidden />
          </div>
        </div>
      </div>
    )
  )
}
