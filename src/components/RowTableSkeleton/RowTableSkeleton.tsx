import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

import 'react-loading-skeleton/dist/skeleton.css'

import classNames from 'classnames/bind'

import styles from './RowTableSkeleton.module.scss'

const cx = classNames.bind(styles)

function RowTableSkeleton({ numberOfColumn }: { numberOfColumn: number }) {
  return (
    <SkeletonTheme baseColor="#ccc" highlightColor="#ddd">
      {Array(3)
        .fill(0)
        .map((_, index) => {
          return (
            <tr key={index} className={cx('row-table-skeleton')}>
              <td>
                <Skeleton height={50} width={50} />
              </td>
              {new Array(numberOfColumn - 1).fill(0).map((_, index) => (
                <td className={cx('col')} key={index}>
                  <Skeleton />
                </td>
              ))}
            </tr>
          )
        })}
    </SkeletonTheme>
  )
}

export default RowTableSkeleton
