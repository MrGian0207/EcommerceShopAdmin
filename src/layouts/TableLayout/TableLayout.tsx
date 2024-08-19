import { memo, useEffect, useState } from 'react'
import {
  faChevronLeft,
  faChevronRight,
  faCopy,
  faEye,
  faLock,
  faPen,
  faStar,
  faTrash,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import StatusItems from '~/components/StatusItems'
import { useAuth } from '~/context/AuthContext'
import { useSearch } from '~/context/SearchContext'
import { useTable } from '~/context/TableContext'
import { useUpdateLayout } from '~/context/UpdateLayoutContext'
import { useUser } from '~/context/UserContext'
import * as Toastify from '~/services/Toastify'
import { DataType } from '~/types/DataType'
import { TableLayoutType } from '~/types/LayoutType'
import { VariantType } from '~/types/VariantType'
import classNames from 'classnames/bind'
import { useLocation, useSearchParams } from 'react-router-dom'

import Button from '../../components/Button'
import styles from './TableLayout.module.scss'

const cx = classNames.bind(styles)

type TotalProductArrayType = {
  name: string
  total: number
}

type featureType = {
  _id?: string
  feature?: string
}

function TableLayout({
  children,
  headers,
  category = false,
  name = false,
  role = false,
  user = false,
  email = false,
  phone = false,
  joined = false,
  parentCategory = false,
  totalItems = false,
  description = false,
  status = false,
  rating = false,
  quantity = false,
  price = false,
  featured = false,
  createdAt = false,
  actions = false,
  editButton = false,
  deleteButton = false,
  previewButton = false,
  lockButton = false,
  copyButton = false,
  handleDeteleToastify,
}: TableLayoutType): JSX.Element {
  const location = useLocation()
  const path = location.pathname

  const [dataArray, setDataArray] = useState<DataType[]>([])
  const [totalProductArray, setTotalProductArray] = useState<TotalProductArrayType[]>([])
  const [variantArray, setVariantArray] = useState<VariantType[]>([])
  const [quantityArray, setQuantityArray] = useState<number[]>([])
  const [deleteButtonOnclick, SetDeleteButtonOnclick] = useState(false)
  const { updateLayout } = useUpdateLayout()
  const [featureArray, setFeatureArray] = useState<featureType[]>([])
  const { accessToken } = useAuth()
  const [page, setPage] = useState<number>(1)
  const [numbersPage, setNumbersPage] = useState<number[]>([1])
  const [searchParams, setSearchParams] = useSearchParams({ page: '1' })
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const { dataUser } = useUser()!
  const { debouncedSearchText } = useSearch()
  const { loading } = useTable()

  // Lấy dữ liệu từ BE trả về, hiển thị danh sách sản phẩm
  useEffect(() => {}, [updateLayout])

  // Cập nhật hiển thị nội dung trang
  const handleSetFeaturedProduct = async (featureUpdates: featureType) => {
    if (featureArray.length && path) {
      Toastify.showToastMessagePending()
      await fetch(`${process.env.REACT_APP_BACKEND_URL}${path}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(featureUpdates),
      })
        .then((res) => {
          return res.json()
        })
        .then((data) => {
          if (data?.status === 'Success') {
            Toastify.showToastMessageSuccessfully(data?.message)
          } else {
            Toastify.showToastMessageFailure(data?.message)
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  return (
    <>
      <div className={cx('table-layout')}>
        <div className={cx('table-container')}>
          <table className={cx('table')}>{children}</table>
        </div>
      </div>
      {/* Phân trang sản phẩm  */}
      {/* <div className={cx('pagination')}>
        <button
          onClick={() => {
            if (page !== 1) {
              setPage(page - 1)
              setSearchParams({ page: `${page - 1}` })
            }
          }}
          className={cx('prev-button')}
        >
          {page === 1 ? (
            <FontAwesomeIcon className={cx('icon', 'blur')} icon={faChevronLeft} />
          ) : (
            <FontAwesomeIcon className={cx('icon')} icon={faChevronLeft} />
          )}
        </button>
        {numbersPage.map((number) =>
          page === number ? (
            <button
              key={`page-${number}`}
              className={cx('page-number', 'active')}
              onClick={() => {
                setPage(number)
                setSearchParams({ page: `${number}` })
              }}
            >
              {number}
            </button>
          ) : (
            <button
              key={`page-${number}`}
              className={cx('page-number')}
              onClick={() => {
                setPage(number)
                setSearchParams({ page: `${number}` })
              }}
            >
              {number}
            </button>
          )
        )}
        <button
          onClick={() => {
            if (page !== numbersPage?.length) {
              setPage(page + 1)
              setSearchParams({ page: `${page + 1}` })
            }
          }}
          className={cx('next-button')}
        >
          {page === numbersPage?.length ? (
            <FontAwesomeIcon className={cx('icon', 'blur')} icon={faChevronRight} />
          ) : (
            <FontAwesomeIcon className={cx('icon')} icon={faChevronRight} />
          )}
        </button>
      </div> */}
    </>
  )
}

export default memo(TableLayout)
