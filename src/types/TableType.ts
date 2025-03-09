import React from 'react'

export interface DataTableType {
  _id: string
  name: string
  description: string
  image: string
  totalProducts: number
  parentCategory: string
  createdAt: string
  priceDefault: number
  totalPrice: number
  statusDelivery: string
  email: string
  phone: string
  statusUser: string
  featureProduct: string
  role: string
}

export interface TableBodyType extends React.HTMLAttributes<HTMLTableSectionElement> {
  children: React.ReactNode
}

export interface TableCustomActionsCellType {
  children: React.ReactNode
}

export interface TableCustomCellType {
  imageSrc: string
  children: React.ReactNode
}

export interface TableCustomRatingCellType extends React.HTMLAttributes<HTMLTableCellElement> {}

export interface TableCellType extends React.HTMLAttributes<HTMLTableCellElement> {
  children: React.ReactNode
}

export interface TableHeaderType extends React.HTMLAttributes<HTMLTableSectionElement> {
  children: React.ReactNode
}

export interface TableHeaderCellType extends React.HTMLAttributes<HTMLTableCellElement> {
  children: React.ReactNode
}

export interface TableRowType extends React.HTMLAttributes<HTMLTableRowElement> {
  children: React.ReactNode
}
