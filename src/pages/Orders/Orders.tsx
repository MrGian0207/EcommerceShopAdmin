import styles from './Orders.module.scss';
import classNames from 'classnames/bind';
import DefaultLayout from '~/layouts/DefaultLayout';
import TableLayout from '~/layouts/TableLayout';
import { useEffect } from 'react';

const cx = classNames.bind(styles);

function Orders(): JSX.Element {
   useEffect(() => {
      document.title = 'Order | NextStore';

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   return (
      <div className={cx('orders')}>
         <DefaultLayout
            active={'orders'}
            page={['Dashboard', 'Orders']}
            searchEngine={true}
         >
            <TableLayout
               headers={[
                  'Category',
                  'Created at',
                  'Status',
                  'Price',
                  'Quantity',
                  'Actions',
               ]}
               category
               createdAt
               status
               price
               quantity
               actions
               previewButton
            />
         </DefaultLayout>
      </div>
   );
}

export default Orders;
