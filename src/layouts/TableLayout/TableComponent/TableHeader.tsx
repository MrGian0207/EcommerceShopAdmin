import { TableHeaderType } from '~/types/TableType'

import '../TableLayout.module.scss'

export default function TableHeader({ children, ...props }: TableHeaderType) {
  return <thead {...props}>{children}</thead>
}
