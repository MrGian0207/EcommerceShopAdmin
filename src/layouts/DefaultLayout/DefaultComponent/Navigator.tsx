import React from 'react'
import { useUser } from '~/context/UserContext'
import classNames from 'classnames/bind'
import { Link } from 'react-router-dom'

import styles from '../DefaultLayout.module.scss'

const cx = classNames.bind(styles)

export default function Navigator({ page, buttons }: { page: string[]; buttons?: JSX.Element[] }) {
  const { dataUser } = useUser()

  return (
    <div className={cx('navigator')}>
      <div className={cx('breadcrumb')}>
        {page?.map((value, index) => {
          const url = value.replace(/\s+/g, '-').toLowerCase()
          const title = value.includes('/') ? value.split('/')[1] : value
          return (
            <span key={index} className={cx('breadcrumb-item')}>
              <Link to={`/${url}`}>{title}</Link>
            </span>
          )
        })}
      </div>

      {dataUser?.role !== 'Staff' && (
        <div className={cx('button')}>
          {buttons && (
            <React.Fragment>
              {buttons?.map((button, index) => {
                return <div key={`${index}-button-edit`}>{button}</div>
              })}
            </React.Fragment>
          )}
        </div>
      )}
    </div>
  )
}
