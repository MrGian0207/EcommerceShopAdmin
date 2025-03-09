import React, { memo, useState } from 'react'

import { faChevronDown, faChevronRight, faCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames/bind'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import styles from './SideBarItems.module.scss'

import { usePath } from '~/context/PathContext'
import { SideBarItemsType } from '~/types/SideBarType'

const cx = classNames.bind(styles)

function SideBarItems({
  iconLeft,
  labels,
  iconRight = false,
  active = false,
  route,
}: SideBarItemsType) {
  const { t } = useTranslation('common')
  const Button = labels.length === 1 ? Link : 'div'
  const [toggleSubNavigator, setToggleSubNavigator] = useState(false)
  let childCategoriesIndex: number
  let childCategories: string = ''
  const { path } = usePath()
  const pathArray = path.split('/') // Tách đường dẫn thành mảng các phần tử

  if (pathArray.includes('categories')) {
    childCategoriesIndex = pathArray.indexOf('categories') + 1
    childCategories = pathArray[childCategoriesIndex]
  }
  return (
    <React.Fragment>
      <Button
        onClick={() => {
          setToggleSubNavigator((prevState) => !prevState)
        }}
        to={`/${route}`}
        className={cx('items', {
          active: active,
        })}
      >
        <div className={cx('left')}>
          <FontAwesomeIcon className={cx('iconLeft')} icon={iconLeft} />
        </div>
        <p className={cx('content')}>{labels[0]}</p>
        {iconRight && (
          <div className={cx('right')}>
            <FontAwesomeIcon
              className={cx('iconRight')}
              icon={
                (toggleSubNavigator && !childCategories) || (!toggleSubNavigator && childCategories)
                  ? faChevronDown
                  : faChevronRight
              }
            />
          </div>
        )}
      </Button>
      <React.Fragment>
        {((toggleSubNavigator && !childCategories) || (!toggleSubNavigator && childCategories)) && (
          <div className={cx('sub-navigator')}>
            {labels.slice(1).map((item, index) => (
              <Link
                to={`/${route}/${item.toLowerCase().trim().replace(' ', '-')}`}
                className={cx('items', {
                  subactive:
                    item.toLowerCase().trim().replace(' ', '-') === childCategories ? true : false,
                })}
                key={index}
              >
                <div className={cx('left')}>
                  <FontAwesomeIcon className={cx('iconLeft')} icon={faCircle} />
                </div>
                <p className={cx('content')}>
                  {t(`sidebar.${item.toLowerCase().replace(' ', '_')}`)}
                </p>
              </Link>
            ))}
          </div>
        )}
      </React.Fragment>
    </React.Fragment>
  )
}

export default memo(SideBarItems)
