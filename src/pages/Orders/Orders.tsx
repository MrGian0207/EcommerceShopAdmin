import styles from './Orders.module.scss';
import classNames from 'classnames/bind';
import DefaultLayout from '~/layouts/DefaultLayout';
import { useEffect, lazy, Suspense } from 'react';
import Loading from '~/components/Loading';

const cx = classNames.bind(styles);
const TableLayout = lazy(() => import('~/layouts/TableLayout'));

function Orders(): JSX.Element {
   useEffect(() => {
      document.title = 'Order | MrGianStore';

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   return (
      <div className={cx('orders')}>
         <DefaultLayout
            active={'orders'}
            page={['Dashboard', 'Orders']}
            searchEngine={true}
         >
            <Suspense fallback={<Loading />}>
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
            </Suspense>
         </DefaultLayout>
      </div>
   );
}

export default Orders;
