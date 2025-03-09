import classNames from 'classnames/bind'

import styles from '../TableLayout.module.scss'

import TableDataCell from './TableDataCell'

import { TableCustomActionsCellType } from '~/types/TableType'

const cx = classNames.bind(styles)

export default function TableCustomActionsCell({ children }: TableCustomActionsCellType) {
  return (
    <TableDataCell style={{ textAlign: 'center' }}>
      <div className={cx('actions')}>{children}</div>
    </TableDataCell>
  )
}
