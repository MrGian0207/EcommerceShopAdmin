import { useState } from 'react'
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames/bind'

import styles from '../DefaultLayout.module.scss'

const cx = classNames.bind(styles)

export default function ThemeMode() {
  const [changeTheme, setChangeTheme] = useState(false)

  return (
    <div
      onClick={() => {
        setChangeTheme((prevState) => !prevState)
      }}
      className={cx('theme-mode')}
    >
      <FontAwesomeIcon className={cx('icon')} icon={changeTheme ? faSun : faMoon} />
    </div>
  )
}
