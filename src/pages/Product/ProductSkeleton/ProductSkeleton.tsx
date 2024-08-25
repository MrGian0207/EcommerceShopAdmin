import classNames from 'classnames/bind'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

import styles from './Skeleton.module.scss'

const cx = classNames.bind(styles)

export default function ProductSkeleton() {
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
          <div className={cx('row')}>
            <span>
              <Skeleton height={10} width={150} />
              <Skeleton height={50} />
            </span>
            <span>
              <Skeleton height={10} width={150} />
              <Skeleton height={50} />
            </span>
          </div>
          <div className={cx('row')}>
            <span>
              <Skeleton height={10} width={150} />
              <Skeleton height={50} />
            </span>
            <span>
              <Skeleton height={10} width={150} />
              <Skeleton height={50} />
            </span>
          </div>
          <div className={cx('row')}>
            <span>
              <Skeleton height={10} width={150} />
              <Skeleton height={50} />
            </span>
            <span>
              <Skeleton height={10} width={150} />
              <Skeleton height={50} />
            </span>
          </div>
          <span>
            <Skeleton height={10} width={150} />
            <Skeleton height={100} />
          </span>
        </div>
        <div className={cx('right-column')}>
          <div className={cx('segment')}>
            <span>
              <Skeleton height={10} width={150} />
              <Skeleton height={50} />
            </span>
            <span>
              <Skeleton height={10} width={150} />
              <Skeleton height={50} />
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Skeleton height={25} width={50} borderRadius={20} />
              <Skeleton height={20} width={150} borderRadius={100} />
            </span>
            <Skeleton height={30} width={120} borderRadius={20} />
            <span style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '100%' }}>
              <Skeleton height={15} width={15} borderRadius={100} />
              <Skeleton height={100} width={650} />
            </span>
            <Skeleton height={30} borderRadius={5} />
          </div>
          <div className={cx('button')}>
            <Skeleton height={40} />
          </div>
        </div>
      </section>
    </SkeletonTheme>
  )
}
