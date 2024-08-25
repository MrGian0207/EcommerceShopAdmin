import { TableCustomActionsCellType } from '~/types/TableType'
import classNames from 'classnames/bind'

import styles from '../TableLayout.module.scss'
import TableDataCell from './TableDataCell'

const cx = classNames.bind(styles)

export default function TableCustomActionsCell({ children }: TableCustomActionsCellType) {
  return (
    <TableDataCell style={{ textAlign: 'center' }}>
      <div className={cx('actions')}>{children}</div>
    </TableDataCell>
  )
}
