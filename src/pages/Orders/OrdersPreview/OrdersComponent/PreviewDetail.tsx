import { faTruck, faUser, faWallet } from '@fortawesome/free-solid-svg-icons'
import { OrderType } from '~/types/OrderType'
import classNames from 'classnames/bind'
import { format } from 'date-fns'

import styles from '../OrdersPreview.module.scss'
import CardItem from './CardItem'

const cx = classNames.bind(styles)

export default function PreviewDetail({ orderData }: { orderData: OrderType }) {
  return (
    <div className={cx('previewDetail')}>
      <div className={cx('content-wrapper')}>
        {/* Title preview orders */}
        <div className={cx('title')}>
          <h6>Order Details</h6>
          <p>Order ID: {orderData._id}</p>
        </div>
        {/* Card box preview orders */}
        <div className={cx('card-box')}>
          {/* Customer Details */}
          <CardItem label="Customer Details" icon={faUser}>
            <p>
              <b>Name:</b> {orderData.customerName}
            </p>
            <p>
              <b>Phone:</b> {orderData.customerPhone}
            </p>
            <p>
              <b>Email:</b> {orderData.customerEmail}
            </p>
          </CardItem>

          {/* Shipping Address */}
          <CardItem label="Shipping Address" icon={faTruck}>
            <p>
              <b>Address:</b> {orderData.customerAddress}
            </p>
            <p>
              <b>Order Data:</b> {format(new Date(orderData.createdAt), 'dd MMM yyyy')}
            </p>
          </CardItem>

          {/* Payment Method */}
          <CardItem label="Payment Method" icon={faWallet}>
            <p>
              <b>Method:</b> {orderData.methodDelivery}
            </p>
            <p>
              <b>Status:</b> {orderData.statusDelivery}
            </p>
            <p>
              <b>Shipping Fee:</b> USD$ {orderData.shippingFee}
            </p>
          </CardItem>
        </div>
      </div>
    </div>
  )
}
