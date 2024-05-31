import styles from './StatusItems.module.scss';
import classNames from 'classnames/bind';
import { StatusItemsType } from '~/types/StatusItemsType';

const cx = classNames.bind(styles);

function StatusItems({
   quantity,
   statusDelivery,
   statusUser,
}: StatusItemsType): JSX.Element {
   let status: string = '';
   let style: string = '';

   if (quantity !== undefined) {
      switch (true) {
         case quantity >= 0 && quantity <= 10:
            status = 'Low stock';
            style = 'low';
            break;
         case quantity > 10 && quantity <= 100:
            status = 'Medium stock';
            style = 'medium';
            break;
         case quantity > 50:
            status = 'High stock';
            style = 'high';
            break;
         default:
            status = 'Low stock';
            style = 'low';
      }
   }

   if (statusDelivery !== undefined) {
      switch (true) {
         case statusDelivery.toUpperCase() === 'PENDING':
            status = 'Pending';
            style = 'pending';
            break;
         case statusDelivery.toUpperCase() === 'ONTHEWAY':
            status = 'Ontheway';
            style = 'ontheway';
            break;
         case statusDelivery.toUpperCase() === 'DELIVERED':
            status = 'Delivered';
            style = 'delivered';
            break;
         case statusDelivery.toUpperCase() === 'RETURNED':
            status = 'Returned';
            style = 'returned';
            break;
         case statusDelivery.toUpperCase() === 'CANCELLED':
            status = 'Cancelled';
            style = 'cancelled';
            break;
         default:
            status = 'Pending';
            style = 'pending';
      }
   }

   if (statusUser !== undefined) {
      switch (true) {
         case statusUser.toUpperCase() === 'NOT-VERIFIED':
            status = 'Not-verified';
            style = 'Not-verified';
            break;
         case statusUser.toUpperCase() === 'ACTIVE':
            status = 'Active';
            style = 'Active';
            break;
         default:
            status = 'Not-verified';
            style = 'Not-verified';
      }
   }

   return <div className={cx('status-items', style)}>{status}</div>;
}

export default StatusItems;
