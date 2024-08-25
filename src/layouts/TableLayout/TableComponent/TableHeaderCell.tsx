import { TableHeaderCellType } from '~/types/TableType'

import '../TableLayout.module.scss'

export default function TableHeaderCell({ children, ...props }: TableHeaderCellType) {
  return <th {...props}>{children}</th>
}
