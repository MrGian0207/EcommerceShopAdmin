import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames/bind'

import styles from '../TableLayout.module.scss'
import TableDataCell from './TableDataCell'

const cx = classNames.bind(styles)

interface TableCustomRatingCellType extends React.HTMLAttributes<HTMLTableCellElement> {}

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
