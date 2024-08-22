import { ReactNode } from 'react'

export type ActionLayoutType = {
  leftColumn: ReactNode
  rightColumn: ReactNode
  nameButtonSubmit?: string
  tags?: string[]
  hasVariant?: boolean
}

export type DefaultLayoutType = {
  active?: string
  page: string[]
  children?: ReactNode
  searchEngine?: boolean
  buttons?: JSX.Element[]
}

export type TableLayoutType = {
  children?: ReactNode
}
