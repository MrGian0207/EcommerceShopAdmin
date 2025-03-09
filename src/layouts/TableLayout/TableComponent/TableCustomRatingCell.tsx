import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames/bind'

import styles from '../TableLayout.module.scss'

import TableDataCell from './TableDataCell'

import { TableCustomRatingCellType } from '~/types/TableType'

const cx = classNames.bind(styles)

export default function TableCustomRatingCell({ ...props }: TableCustomRatingCellType) {
  return (
    <TableDataCell {...props}>
      <div className={cx('rating')}>
        <FontAwesomeIcon icon={faStar} />
        <FontAwesomeIcon icon={faStar} />
        <FontAwesomeIcon icon={faStar} />
        <FontAwesomeIcon icon={faStar} />
        <FontAwesomeIcon icon={faStar} />
      </div>
    </TableDataCell>
  )
}
