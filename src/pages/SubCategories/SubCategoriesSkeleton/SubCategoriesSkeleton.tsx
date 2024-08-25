import classNames from 'classnames/bind'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

import styles from './Skeleton.module.scss'

const cx = classNames.bind(styles)

export default function SubCategoriesSkeleton() {
  return (
    <SkeletonTheme baseColor="#ccc" highlightColor="#ddd">
      <section className={cx('layout')}>
        <div className={cx('left-column')}>
          <span>
            <Skeleton height={10} width={150} />
            <Skeleton height={50} />
          </span>
          <span>
            <Skeleton height={10} width={150} />
            <Skeleton height={50} />
          </span>
          <span>
            <Skeleton height={10} width={150} />
            <Skeleton height={50} />
          </span>
          <span>
            <Skeleton height={10} width={150} />
            <Skeleton height={50} />
          </span>
        </div>
        <div className={cx('right-column')}>
          <div className={cx('segment')}>
            <span>
              <Skeleton height={10} width={150} />
              <Skeleton height={50} />
            </span>
            <Skeleton height={10} width={150} />
            <Skeleton height={250} />
          </div>
          <div className={cx('button')}>
            <Skeleton height={40} />
          </div>
        </div>
      </section>
    </SkeletonTheme>
  )
}
