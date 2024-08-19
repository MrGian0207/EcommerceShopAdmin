import '../TableLayout.module.scss'

interface TableCellType extends React.HTMLAttributes<HTMLTableCellElement> {
  children: React.ReactNode
}

export default function TableDataCell({ children, ...props }: TableCellType) {
  return <td {...props}>{children}</td>
}
