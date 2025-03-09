import { faTruck, faUser, faWallet } from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames/bind'
import { format } from 'date-fns'
import { useTranslation } from 'react-i18next'

import styles from '../OrdersPreview.module.scss'

import CardItem from './CardItem'

import { OrderType } from '~/types/OrderType'

const cx = classNames.bind(styles)

export default function PreviewDetail({ orderData }: { orderData: OrderType }) {
  const { t } = useTranslation('orders')
  return (
    <div className={cx('previewDetail')}>
      <div className={cx('content-wrapper')}>
        {/* Title preview orders */}
        <div className={cx('title')}>
          <h6>{t('label.order_details')}</h6>
          <p>{t('label.order_id', { id: orderData._id })}</p>
        </div>
        {/* Card box preview orders */}
        <div className={cx('card-box')}>
          {/* Customer Details */}
          <CardItem label={t('label.customer_details')} icon={faUser}>
            <p>
              <b>{t('label.name')}</b> {orderData.customerName}
            </p>
            <p>
              <b>{t('label.phone')}</b> {orderData.customerPhone}
            </p>
            <p>
              <b>{t('label.email')}</b> {orderData.customerEmail}
            </p>
          </CardItem>

          {/* Shipping Address */}
          <CardItem label={t('label.shipping_address')} icon={faTruck}>
            <p>
              <b>{t('label.address')}</b> {orderData.customerAddress}
            </p>
            <p>
              <b>{t('label.order_date')}</b> {format(new Date(orderData.createdAt), 'dd MMM yyyy')}
            </p>
          </CardItem>

          {/* Payment Method */}
          <CardItem label={t('label.payment_method')} icon={faWallet}>
            <p>
              <b>{t('label.method')}</b> {orderData.methodDelivery}
            </p>
            <p>
              <b>{t('label.status')}</b> {orderData.statusDelivery}
            </p>
            <p>
              <b>{t('label.shipping_fee')}</b> USD$ {orderData.shippingFee}
            </p>
          </CardItem>
        </div>
      </div>
    </div>
  )
}
