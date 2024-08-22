import React from 'react'
import {
  TableBody,
  TableDataCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from '~/layouts/TableLayout'
import { OrderType } from '~/types/OrderType'
import classNames from 'classnames/bind'

import styles from '../OrdersPreview.module.scss'

interface PreviewDetailType {
  orderData: OrderType
}

const cx = classNames.bind(styles)

export default function PreviewProduct({ orderData }: PreviewDetailType) {
  return (
    <React.Fragment>
      <h5 className={cx('product-quantity')}>
        <b>
          {orderData.quantityProducts &&
            (orderData.quantityProducts as number[]).reduce((acc, value) => acc + value)}{' '}
          item
        </b>
      </h5>
      <table className={cx('product')}>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>Product</TableHeaderCell>
            <TableHeaderCell>Color</TableHeaderCell>
            <TableHeaderCell>Quantity</TableHeaderCell>
            <TableHeaderCell>Size</TableHeaderCell>
            <TableHeaderCell>Price</TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orderData.products.map((product, index) => {
            return (
              <TableRow key={product.name}>
                <TableDataCell>
                  <div className={cx('image-product')}>
                    <img src={orderData.imagesProductOfOrder[index]} alt="product" />
                  </div>
                </TableDataCell>
                <TableDataCell>{orderData.colorProducts}</TableDataCell>
                <TableDataCell>{orderData.quantityProducts}</TableDataCell>
                <TableDataCell>{orderData.sizeProducts}</TableDataCell>
                <TableDataCell>USD ${orderData.priceProducts}</TableDataCell>
              </TableRow>
            )
          })}
        </TableBody>
      </table>

      {/* Table total price */}
      <table className={cx('total')}>
        <TableBody>
          <TableRow>
            <TableDataCell>
              <b>Subtotal</b>
            </TableDataCell>
            <TableDataCell>
              <b>USD ${orderData.subtotal}</b>
            </TableDataCell>
          </TableRow>
          <TableRow>
            <TableDataCell>
              <b>Shipping Fee</b>
            </TableDataCell>
            <TableDataCell>
              <b>USD ${orderData.shippingFee}</b>
            </TableDataCell>
          </TableRow>
          <TableRow>
            <TableDataCell>
              <b>Total</b>
            </TableDataCell>
            <TableDataCell>
              <b>${orderData.total}</b>
            </TableDataCell>
          </TableRow>
        </TableBody>
      </table>
    </React.Fragment>
  )
}
