import classNames from 'classnames/bind'

import styles from '../TableLayout.module.scss'

import TableDataCell from './TableDataCell'

import { TableCustomCellType } from '~/types/TableType'

const cx = classNames.bind(styles)

export default function TableCustomDataCell({ imageSrc, children }: TableCustomCellType) {
  return (
    <TableDataCell>
      <div className={cx('image-cell')}>
        <img src={imageSrc} alt="tableImage" />
        <h4>{children}</h4>
      </div>
    </TableDataCell>
  )
}
