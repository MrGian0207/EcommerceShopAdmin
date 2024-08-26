import { useEffect, useRef } from 'react'
import {
  faBars,
  faCartShopping,
  faCopyright,
  faEnvelope,
  faGaugeHigh,
  faGears,
  faImages,
  faLayerGroup,
  faStore,
  faUsers,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { SideBarType } from '~/types/SideBarType'
import classNames from 'classnames/bind'
import { useTranslation } from 'react-i18next'

import SideBarItems from '../SideBarItems'
import styles from './SideBar.module.scss'

const cx = classNames.bind(styles)

function SideBar({ active, handleCloseSideBar, backGroundColor }: SideBarType): JSX.Element {
  const { t } = useTranslation('common')
  const sideBarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (backGroundColor && sideBarRef.current) {
      sideBarRef.current.style.backgroundColor = backGroundColor
    }
  }, [backGroundColor])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (sideBarRef.current && !sideBarRef.current.contains(event.target as Node)) {
        handleCloseSideBar && handleCloseSideBar()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [handleCloseSideBar])

  return (
    <div ref={sideBarRef} className={cx('sidebar')}>
      <div className={cx('logo')}>
        <div>
          <span className={cx('style-logo')}>MrGian</span>
          store
        </div>
        <span onClick={handleCloseSideBar} className={cx('icon-toggleSideBar')}>
          <FontAwesomeIcon icon={faBars} />
        </span>
      </div>
      <div className={cx('sidebar-navigator')}>
        <SideBarItems
          iconLeft={faGaugeHigh}
          children={[t('sidebar.dashboard')]}
          active={active === 'dashboard' && true}
          route={'dashboard'}
        />
        <SideBarItems
          iconLeft={faLayerGroup}
          children={[t('sidebar.categories'), 'Main Categories', 'Sub Categories']}
          iconRight={true}
          active={active === 'categories' && true}
          route={'categories'}
        />
        <SideBarItems
          iconLeft={faCopyright}
          children={[t('sidebar.brands')]}
          active={active === 'brands' && true}
          route={'brands'}
        />
        <SideBarItems
          iconLeft={faStore}
          children={[t('sidebar.products')]}
          active={active === 'product' && true}
          route={'product'}
        />
        <SideBarItems
          iconLeft={faCartShopping}
          children={[t('sidebar.orders')]}
          active={active === 'orders' && true}
          route={'orders'}
        />
        <SideBarItems
          iconLeft={faUsers}
          children={[t('sidebar.users')]}
          active={active === 'users' && true}
          route={'users'}
        />
        <SideBarItems
          iconLeft={faEnvelope}
          children={[t('sidebar.newletter')]}
          active={active === 'newletter' && true}
          route={'newletter'}
        />
        <SideBarItems
          iconLeft={faImages}
          children={[t('sidebar.slides')]}
          active={active === 'slides' && true}
          route={'slides'}
        />
        <SideBarItems
          iconLeft={faGears}
          children={[t('sidebar.setting')]}
          active={active === 'settings' && true}
          route={'settings'}
        />
      </div>
    </div>
  )
}

export default SideBar
