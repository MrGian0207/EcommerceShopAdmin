import { useRef } from 'react'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSearch } from '~/context/SearchContext'
import classNames from 'classnames/bind'
import { useTranslation } from 'react-i18next'

import styles from '../DefaultLayout.module.scss'

const cx = classNames.bind(styles)
export default function SearchEngine() {
  const { t } = useTranslation('common')
  const { searchText, setSearchText } = useSearch()
  const inputSearchRef = useRef<HTMLInputElement>(null)

  const handleSearchButtonClick = () => {
    if (inputSearchRef.current) {
      inputSearchRef.current.focus()
    }
  }
  return (
    <div className={cx('search-box')}>
      <div className={cx('search-engine')}>
        <div onClick={handleSearchButtonClick} className="icon-search">
          <FontAwesomeIcon icon={faSearch} />
        </div>
        <div className={cx('input-search')}>
          <input
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value)
            }}
            ref={inputSearchRef}
            type="text"
            placeholder={t('label.search')}
          />
        </div>
      </div>
    </div>
  )
}
