import { TableRowType } from '~/types/TableType'

import '../TableLayout.module.scss'

export default function TableRow({ children, ...props }: TableRowType) {
  return <tr {...props}>{children}</tr>
}
