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
  headers?: string[]
  category?: boolean
  name?: boolean
  role?: boolean
  user?: boolean
  email?: boolean
  phone?: boolean
  joined?: boolean
  parentCategory?: boolean
  totalItems?: boolean
  description?: boolean
  createdAt?: boolean
  status?: boolean
  rating?: boolean
  quantity?: boolean
  price?: boolean
  featured?: boolean
  actions?: boolean
  editButton?: boolean
  deleteButton?: boolean
  previewButton?: boolean
  lockButton?: boolean
  copyButton?: boolean
  handleDeteleToastify?: (
    name: string,
    id: string,
    path: string,
    SetDeleteButtonOnclick?: React.Dispatch<React.SetStateAction<boolean>>
  ) => void
}
