import React from 'react'
import classNames from 'classnames/bind'

import styles from '../Slides.module.scss'

interface DisplaySlideType extends React.InputHTMLAttributes<HTMLInputElement> {}

const cx = classNames.bind(styles)

export default function DisplaySlide({ ...props }: DisplaySlideType) {
  return (
    <div className={cx('disabled')}>
      <div className={cx('toggle-box')}>
        <input {...props} name="displaySlide" type="checkbox" id="toggle" />
        <label htmlFor="toggle" className={cx('toggle-switch')}></label>
      </div>
    </div>
  )
}
