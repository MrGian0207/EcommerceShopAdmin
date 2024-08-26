import { ProductType } from './DataType'

export type OrderType = {
  _id: string
  createdAt: string
  customerName: string
  customerPhone: string
  customerEmail: string
  customerAddress: string
  methodDelivery: string
  statusDelivery: string
  shippingFee: number
  imageDefault: string
  colorProducts: string[]
  quantityProducts: number[]
  sizeProducts: string[]
  priceProducts: number[]
  subtotal: number
  total: number
  products: ProductType[]
  imagesProductOfOrder: string[]
}

export const emptyOrder = {
  _id: '',
  createdAt: '',
  customerName: '',
  customerPhone: '',
  customerEmail: '',
  customerAddress: '',
  methodDelivery: '',
  statusDelivery: '',
  shippingFee: 0,
  imageDefault: '',
  colorProducts: [],
  quantityProducts: [],
  sizeProducts: [],
  priceProducts: [],
  subtotal: 0,
  total: 0,
  products: [],
  imagesProductOfOrder: [],
}
