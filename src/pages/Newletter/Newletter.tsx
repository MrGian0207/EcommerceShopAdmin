import styles from './Newletter.module.scss';
import classNames from 'classnames/bind';
import DefaultLayout from '~/layouts/DefaultLayout';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, lazy, Suspense } from 'react';
import Loading from '~/components/Loading';

const cx = classNames.bind(styles);
const TableLayout = lazy(() => import('~/layouts/TableLayout'));

function Newletters() {
   useEffect(() => {
      document.title = 'Newletter | MrGianStore';

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);
   return (
      <div className={cx('newletter')}>
         <DefaultLayout
            active={'newletter'}
            page={['Dashboard', 'Newletter']}
            searchEngine={true}
         >
            <Suspense fallback={<Loading />}>
               <TableLayout
                  headers={['Email', 'Created at', 'Actions']}
                  email
                  createdAt
                  actions
                  copyButton
               />
            </Suspense>
         </DefaultLayout>
      </div>
   );
}

export default Newletters;
