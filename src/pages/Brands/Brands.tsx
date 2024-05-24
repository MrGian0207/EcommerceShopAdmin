import styles from './Brands.module.scss';
import classNames from 'classnames/bind';
import DefaultLayout from '~/layouts/DefaultLayout';
import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import 'react-toastify/dist/ReactToastify.css';
import * as Toastify from '~/services/Toastify';
import { useEffect, lazy, Suspense } from 'react';
import Loading from '~/components/Loading';

const TableLayout = lazy(() => import('~/layouts/TableLayout'));
const cx = classNames.bind(styles);

function Brands() {
   useEffect(() => {
      document.title = 'Brand | MrGianStore';

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);
   return (
      <div className={cx('brands')}>
         <DefaultLayout
            active={'brands'}
            page={['Dashboard', 'Brands']}
            searchEngine={true}
            buttons={[
               <Button to={'/brands/add'} className="button-add">
                  <FontAwesomeIcon icon={faPlus} />
                  Add Brand
               </Button>,
            ]}
         >
            <Suspense fallback={<Loading />}>
               <TableLayout
                  headers={['Category', 'Description', 'Created at', 'Actions']}
                  category
                  description
                  createdAt
                  actions
                  editButton
                  deleteButton
                  handleDeteleToastify={Toastify.handleDeteleToastify}
               />
            </Suspense>
         </DefaultLayout>
      </div>
   );
}

export default Brands;
