import classNames from 'classnames/bind'

import styles from '../TableLayout.module.scss'
import TableDataCell from './TableDataCell'

const cx = classNames.bind(styles)

interface TableCustomActionsCellType {
  children: React.ReactNode
}

export default function TableCustomActionsCell({ children }: TableCustomActionsCellType) {
  return (
    <TableDataCell style={{ textAlign: 'center' }}>
      <div className={cx('actions')}>{children}</div>
    </TableDataCell>
  )
}
