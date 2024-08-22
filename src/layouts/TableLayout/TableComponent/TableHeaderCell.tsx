import '../TableLayout.module.scss'

interface TableHeaderCellType extends React.HTMLAttributes<HTMLTableCellElement> {
  children: React.ReactNode
}

export default function TableHeaderCell({ children, ...props }: TableHeaderCellType) {
  return <th {...props}>{children}</th>
}
