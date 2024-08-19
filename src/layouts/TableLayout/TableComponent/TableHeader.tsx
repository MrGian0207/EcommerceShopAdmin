import '../TableLayout.module.scss'

interface TableHeaderType extends React.HTMLAttributes<HTMLTableSectionElement> {
  children: React.ReactNode
}

export default function TableHeader({ children, className, ...props }: TableHeaderType) {
  return <thead {...props}>{children}</thead>
}
