import { useEffect, useRef, useState } from 'react'

import { faBell, faClock } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames/bind'
import { useTranslation } from 'react-i18next'

import styles from '../DefaultLayout.module.scss'

const cx = classNames.bind(styles)
export default function Notification() {
  const { t } = useTranslation('common')
  const notificationRef = useRef<HTMLDivElement>(null)
  const notificationIconRef = useRef<HTMLDivElement>(null)
  const [notificationToggle, setNotificationToggle] = useState(false)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        !notificationRef.current?.contains(event.target as Element) &&
        !notificationIconRef.current?.contains(event.target as Element)
      ) {
        setNotificationToggle(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  return (
    <div
      ref={notificationIconRef}
      onClick={() => {
        setNotificationToggle((prevState) => !prevState)
      }}
      className={cx('notification')}
    >
      <FontAwesomeIcon className={cx('icon')} icon={faBell} />
      <span className={cx('quantity-noti')}>2</span>
      <div
        ref={notificationRef}
        style={{
          display: notificationToggle ? 'block' : 'none',
        }}
        className={cx('notification-popper')}
      >
        <div onClick={(e) => e.stopPropagation()} className={cx('title')}>
          <h6>{t('label.notifications')}</h6>
        </div>
        <ul onClick={(e) => e.stopPropagation()} className={cx('list-nofi')}>
          <li>
            <span className={cx('user-img')}>
              <img
                src="https://i.pinimg.com/564x/ed/5a/15/ed5a159c5812ac0f16b620b082a816e7.jpg"
                alt="User"
              />
            </span>
            <div className={cx('content-nofi')}>
              <p className={cx('content')}>
                <b>MrGian</b> is placed an order from Viet Nam
              </p>
              <div className={cx('time')}>
                <FontAwesomeIcon icon={faClock} />
                <span
                  style={{
                    marginLeft: '5px',
                  }}
                >
                  3 days
                </span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}
