import React from 'react'
import { IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames/bind'

import styles from '../OrdersPreview.module.scss'

const cx = classNames.bind(styles)

export default function CardItem({
  label,
  children,
  icon,
}: {
  icon: IconDefinition
  label: string
  children: React.ReactNode
}) {
  return (
    <div className={cx('card-item')}>
      <div className={cx('content-card')}>
        <div className={cx('title-card')}>
          <div className={cx('icon-card')}>
            <FontAwesomeIcon icon={icon} />
          </div>
          <h6>{label}</h6>
        </div>
        <div className={cx('card-information')}>{children}</div>
      </div>
    </div>
  )
}
