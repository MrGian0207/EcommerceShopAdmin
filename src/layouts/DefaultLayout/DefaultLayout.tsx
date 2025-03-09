import { memo, useRef, useState } from 'react'

import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames/bind'

import SideBar from '../../components/SideBar'

import Language from './DefaultComponent/Language'
import Navigator from './DefaultComponent/Navigator'
import Notification from './DefaultComponent/Notification'
import SearchEngine from './DefaultComponent/SearchEngine'
import ThemeMode from './DefaultComponent/ThemeMode'
import UserMenu from './DefaultComponent/UserMenu'
import styles from './DefaultLayout.module.scss'

import { DefaultLayoutType } from '~/types/LayoutType'

const cx = classNames.bind(styles)

function DefaultLayout({
  active,
  page,
  children,
  searchEngine = false,
  buttons,
}: DefaultLayoutType) {
  const [sideBarModalToggle, setSideBarModalToggle] = useState(false)
  const sideBarRef = useRef<HTMLDivElement>(null)
  const sideBarModalRef = useRef<HTMLDivElement>(null)
  const defaultLayoutRef = useRef<HTMLDivElement>(null)
  const contentLayoutRef = useRef<HTMLDivElement>(null)
  const modalSidebarRef = useRef<HTMLDivElement>(null)

  const handleOpenSideBar = () => {
    setSideBarModalToggle(true)
  }

  const handleCloseSideBar = () => {
    setSideBarModalToggle(false)
  }

  return (
    <div style={{ height: 'fit-content' }}>
      <div ref={defaultLayoutRef} className={cx('default-layout')}>
        <div ref={sideBarRef} className={cx('sideBar', 'active')}>
          <SideBar active={active} />
        </div>
        <div ref={contentLayoutRef} className={cx('content-layout')}>
          <div className={cx('header')}>
            <div onClick={handleOpenSideBar} className={cx('toggle-sidebar')}>
              <FontAwesomeIcon icon={faBars} />
            </div>

            <div className={cx('header-right')}>
              {searchEngine && <SearchEngine />}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                }}
              >
                <Language />

                <Notification />

                {process.env.NODE_ENV !== 'production' && <ThemeMode />}

                <UserMenu />
              </div>
            </div>
          </div>
          <Navigator page={page} buttons={buttons} />

          <div className={cx('content')}>{children}</div>
        </div>
      </div>
      {sideBarModalToggle && (
        <div ref={modalSidebarRef} className={cx('modal-sidebar')}>
          <div ref={sideBarModalRef} className={cx('sideBarModal')}>
            <SideBar
              active={active}
              handleCloseSideBar={handleCloseSideBar}
              backGroundColor="white"
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default memo(DefaultLayout)
