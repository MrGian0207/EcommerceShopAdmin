import { useEffect, useRef, useState } from 'react'
import { faHome, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import images from '~/assets/Image'
import { useAuth } from '~/context/AuthContext'
import { useUser } from '~/context/UserContext'
import classNames from 'classnames/bind'
import { Link, useNavigate } from 'react-router-dom'

import styles from '../DefaultLayout.module.scss'

const cx = classNames.bind(styles)

export default function UserMenu() {
  const { dataUser } = useUser()
  const { logout } = useAuth()
  const navigate = useNavigate()
  const [menuToggle, setMenuToggle] = useState(false)
  const imageMenuRef = useRef<HTMLDivElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        !menuRef.current?.contains(event.target as Element) &&
        !imageMenuRef.current?.contains(event.target as Element)
      ) {
        setMenuToggle(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])
  return (
    <div
      ref={imageMenuRef}
      onClick={() => {
        setMenuToggle((prevState) => !prevState)
      }}
      className={cx('user-menu')}
    >
      <img src={dataUser?.image ? dataUser.image : images.userDefaults} alt="user" />
      <div
        onClick={(e) => {
          e.stopPropagation()
        }}
        style={{
          display: menuToggle ? 'block' : 'none',
        }}
        ref={menuRef}
        className={cx('menu-popper')}
      >
        <div onClick={(e) => e.stopPropagation()} className={cx('title')}>
          <b>{dataUser?.name ? dataUser?.name : images.userDefaults}</b>
          <p>{dataUser?.email ? dataUser?.email : ''}</p>
        </div>
        <ul className={cx('list-options-menu')}>
          <li>
            <Link to="/dashboard">
              <FontAwesomeIcon className={cx('icon')} icon={faHome} />
              <p>Home</p>
            </Link>
          </li>
          <li>
            <Link to="/settings">
              <FontAwesomeIcon className={cx('icon')} icon={faUser} />
              <p>Profile Setting</p>
            </Link>
          </li>
        </ul>
        <div className={cx('logout')}>
          <button
            onClick={() => {
              logout()
              navigate('/auth/login')
            }}
            className={cx('button-logout')}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}
