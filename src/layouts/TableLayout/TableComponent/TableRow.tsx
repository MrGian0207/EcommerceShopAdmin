import '../TableLayout.module.scss'

interface TableRowType extends React.HTMLAttributes<HTMLTableRowElement> {
  children: React.ReactNode
}

export default function TableRow({ children, ...props }: TableRowType) {
  return <tr {...props}>{children}</tr>
}
