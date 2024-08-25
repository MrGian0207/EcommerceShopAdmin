import { TableBodyType } from '~/types/TableType'

import '../TableLayout.module.scss'

export default function TableBody({ children, ...props }: TableBodyType) {
  return <tbody {...props}>{children}</tbody>
}
