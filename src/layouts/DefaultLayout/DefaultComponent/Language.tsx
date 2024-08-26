import { useEffect, useRef, useState } from 'react'
import { faCheck, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames/bind'
import { useTranslation } from 'react-i18next'

import styles from '../DefaultLayout.module.scss'

const cx = classNames.bind(styles)

export default function Language() {
  const {
    t,
    i18n: { changeLanguage, language },
  } = useTranslation('common')
  const languagePopperRef = useRef<HTMLDivElement>(null)
  const displayLanguageTitleRef = useRef<HTMLDivElement>(null)
  const [currentLanguage, setCurrentLanguage] = useState(language === 'en' ? 'EN' : 'VI')
  const [languageToggle, setLanguageToggle] = useState(false)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        !languagePopperRef.current?.contains(event.target as Element) &&
        !displayLanguageTitleRef.current?.contains(event.target as Element)
      ) {
        setLanguageToggle(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  return (
    <div
      ref={displayLanguageTitleRef}
      onClick={() => {
        setLanguageToggle((prevState) => !prevState)
      }}
      className={cx('language')}
    >
      {currentLanguage}
      <span>
        <FontAwesomeIcon icon={faChevronDown} />
      </span>
      <div
        ref={languagePopperRef}
        className={cx('language-popper')}
        style={{
          display: languageToggle ? 'block' : 'none',
        }}
      >
        <div onClick={(e) => e.stopPropagation()} className={cx('title')}>
          <h6>{t('label.select_language')}</h6>
        </div>
        <ul onClick={(e) => e.stopPropagation()} className={cx('list-lang')}>
          <li
            onClick={() => {
              setCurrentLanguage('EN')
              changeLanguage('en')
              setLanguageToggle(false)
            }}
          >
            <span className={cx('nation-flag')}>
              <img
                src="https://i.pinimg.com/736x/47/29/c1/4729c12f2d0c55ab7aaba63e09cb5f67.jpg"
                alt="Nation Flag"
              />
            </span>
            <p>English</p>
            {currentLanguage === 'EN' && (
              <span className={cx('check')}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
            )}
          </li>
          <li
            onClick={() => {
              setCurrentLanguage('VI')
              changeLanguage('vi')
              setLanguageToggle(false)
            }}
          >
            <span className={cx('nation-flag')}>
              <img
                src="https://i.pinimg.com/564x/96/ed/5b/96ed5b109524a2705a4e3aaeaa9048f6.jpg"
                alt="Nation Flag"
              />
            </span>
            <p>Việt Nam</p>
            {currentLanguage === 'VI' && (
              <span className={cx('check')}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
            )}
          </li>
        </ul>
      </div>
    </div>
  )
}
