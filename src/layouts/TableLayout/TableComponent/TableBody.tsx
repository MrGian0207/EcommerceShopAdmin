import '../TableLayout.module.scss'

interface TableBodyType extends React.HTMLAttributes<HTMLTableSectionElement> {
  children: React.ReactNode
}

export default function TableBody({ children, ...props }: TableBodyType) {
  return <tbody {...props}>{children}</tbody>
}
