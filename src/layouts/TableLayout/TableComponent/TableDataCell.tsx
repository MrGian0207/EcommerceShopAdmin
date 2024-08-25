import { TableCellType } from '~/types/TableType'

import '../TableLayout.module.scss'

export default function TableDataCell({ children, ...props }: TableCellType) {
  return <td {...props}>{children}</td>
}
