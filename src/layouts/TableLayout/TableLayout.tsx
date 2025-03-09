import { memo } from 'react'

import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames/bind'
import { useSearchParams } from 'react-router-dom'

import styles from './TableLayout.module.scss'

import { useTable } from '~/context/TableContext'
import { TableLayoutType } from '~/types/LayoutType'

const cx = classNames.bind(styles)

function TableLayout({ children }: TableLayoutType) {
  const { numbersOfPage } = useTable()
  const numbersPage = Array.from({ length: numbersOfPage }, (_, index) => index + 1)
  const [searchParams, setSearchParams] = useSearchParams()

  // Lấy giá trị 'page' từ URL, nếu không có thì mặc định là 1
  const currentPage = parseInt(searchParams.get('page') || '1', 10)

  return (
    <>
      <div className={cx('table-layout')}>
        <div className={cx('table-container')}>
          <table className={cx('table')}>{children}</table>
        </div>
      </div>
      {/* Phân trang sản phẩm */}
      <div className={cx('pagination')}>
        <button
          onClick={() => {
            if (currentPage > 1) {
              setSearchParams({ page: `${currentPage - 1}` })
            }
          }}
          className={cx('prev-button')}
        >
          {currentPage === 1 ? (
            <FontAwesomeIcon className={cx('icon', 'blur')} icon={faChevronLeft} />
          ) : (
            <FontAwesomeIcon className={cx('icon')} icon={faChevronLeft} />
          )}
        </button>
        {numbersPage.map((number) => (
          <button
            key={`page-${number}`}
            className={cx('page-number', { active: currentPage === number })}
            onClick={() => setSearchParams({ page: `${number}` })}
          >
            {number}
          </button>
        ))}
        <button
          onClick={() => {
            if (currentPage < numbersPage.length) {
              setSearchParams({ page: `${currentPage + 1}` })
            }
          }}
          className={cx('next-button')}
        >
          {currentPage === numbersPage.length ? (
            <FontAwesomeIcon className={cx('icon', 'blur')} icon={faChevronRight} />
          ) : (
            <FontAwesomeIcon className={cx('icon')} icon={faChevronRight} />
          )}
        </button>
      </div>
    </>
  )
}

export default memo(TableLayout)
