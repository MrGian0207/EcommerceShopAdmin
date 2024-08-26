import React from 'react'
import { PreviewOrderTableHeader } from '~/constant/Table'
import {
  TableBody,
  TableDataCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from '~/layouts/TableLayout'
import { OrderType } from '~/types/OrderType'
import classNames from 'classnames/bind'
import { useTranslation } from 'react-i18next'

import styles from '../OrdersPreview.module.scss'

const cx = classNames.bind(styles)

export default function PreviewProduct({ orderData }: { orderData: OrderType }) {
  const { t } = useTranslation('orders')

  return (
    <React.Fragment>
      <h5 className={cx('product-quantity')}>
        <b>
          {t('label.item', {
            count: (orderData.quantityProducts as number[]).reduce((acc, value) => acc + value),
          })}
        </b>
      </h5>
      <table className={cx('product')}>
        <TableHeader>
          <TableRow>
            {PreviewOrderTableHeader.map((header, index) => (
              <TableHeaderCell key={`header-${index}`}>
                {t(header, { ns: 'table' })}
              </TableHeaderCell>
            ))}
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
              <b>{t('label.subtotal')}</b>
            </TableDataCell>
            <TableDataCell>
              <b>USD ${orderData.subtotal}</b>
            </TableDataCell>
          </TableRow>
          <TableRow>
            <TableDataCell>
              <b>{t('label.shipping_fee')}</b>
            </TableDataCell>
            <TableDataCell>
              <b>USD ${orderData.shippingFee}</b>
            </TableDataCell>
          </TableRow>
          <TableRow>
            <TableDataCell>
              <b>{t('label.total')}</b>
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
