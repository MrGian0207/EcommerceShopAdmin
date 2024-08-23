import { memo, useState } from 'react'
import { faChevronDown, faChevronRight, faCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { SideBarItemsType } from '~/types/SideBarType'
import classNames from 'classnames/bind'
import { Link, useLocation } from 'react-router-dom'

import styles from './SideBarItems.module.scss'

const cx = classNames.bind(styles)

function SideBarItems({
  iconLeft,
  children,
  iconRight = false,
  active = false,
  title,
}: SideBarItemsType): JSX.Element {
  let Button = children.length === 1 ? Link : 'div'
  const [subNavigator, setSubNavigator] = useState(false)
  let childCategoriesIndex: number
  let childCategories: string = ''
  const location = useLocation()
  const path = location.pathname // Lấy đường dẫn từ URL
  const pathArray = path.split('/') // Tách đường dẫn thành mảng các phần tử

  if (pathArray.includes('categories')) {
    childCategoriesIndex = pathArray.indexOf('categories') + 1
    childCategories = pathArray[childCategoriesIndex]
  }
  return (
    <>
      <Button
        onClick={() => {
          setSubNavigator((prevState) => !prevState)
        }}
        to={`/${title}`}
        className={cx('items', {
          active: active,
        })}
      >
        <div className={cx('left')}>
          <FontAwesomeIcon className={cx('iconLeft')} icon={iconLeft} />
        </div>
        <p className={cx('content')}>{children[0]}</p>
        {iconRight && (
          <div className={cx('right')}>
            <FontAwesomeIcon
              className={cx('iconRight')}
              icon={
                (subNavigator && !childCategories) || (!subNavigator && childCategories)
                  ? faChevronDown
                  : faChevronRight
              }
            />
          </div>
        )}
      </Button>
      <>
        {((subNavigator && !childCategories) || (!subNavigator && childCategories)) && (
          <div className={cx('sub-navigator')}>
            {children.slice(1).map((item, index) => (
              <Link
                to={`/${title}/${item.toLowerCase().trim().replace(' ', '-')}`}
                className={cx('items', {
                  subactive:
                    item.toLowerCase().trim().replace(' ', '-') === childCategories ? true : false,
                })}
                key={index}
              >
                <div className={cx('left')}>
                  <FontAwesomeIcon className={cx('iconLeft')} icon={faCircle} />
                </div>
                <p className={cx('content')}>{item}</p>
              </Link>
            ))}
          </div>
        )}
      </>
    </>
  )
}

export default memo(SideBarItems)
