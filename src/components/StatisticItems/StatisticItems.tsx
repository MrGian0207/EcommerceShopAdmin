import { faUser, IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames/bind'
import { Link } from 'react-router-dom'

import styles from './StatisticItems.module.scss'

const cx = classNames.bind(styles)

type StatisticItemsType = {
  title: string
  quantity: string
  icon: IconDefinition
}

function StatisticItems({ title, quantity, icon }: StatisticItemsType): JSX.Element {
  return (
    <div className={cx('column-items')}>
      <div className={cx('item-content')}>
        <div className={cx('items-content-title')}>
          <h5>{title}</h5>
          <h2>{quantity}</h2>
        </div>
        <div className={cx('items-content-icon')}>
          <Link className={cx('icon')} to="/dashboard">
            <FontAwesomeIcon icon={icon ? icon : faUser} />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default StatisticItems
