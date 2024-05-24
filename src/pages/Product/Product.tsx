import styles from './Product.module.scss';
import classNames from 'classnames/bind';
import DefaultLayout from '~/layouts/DefaultLayout';
import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import 'react-toastify/dist/ReactToastify.css';
import * as Toastify from '~/services/Toastify';
import { useEffect, lazy, Suspense } from 'react';
import Loading from '~/components/Loading';

const cx = classNames.bind(styles);
const TableLayout = lazy(() => import('~/layouts/TableLayout'));

function Product(): JSX.Element {
   useEffect(() => {
      document.title = 'Product | MrGianStore';

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   return (
      <div className={cx('product')}>
         <DefaultLayout
            active={'product'}
            page={['Dashboard', 'Product List']}
            searchEngine={true}
            buttons={[
               <Button to={'/products/add'} className="button-add">
                  <FontAwesomeIcon icon={faPlus} />
                  Add Product
               </Button>,
            ]}
         >
            <Suspense fallback={<Loading />}>
               <TableLayout
                  headers={[
                     'Category',
                     'Created at',
                     'Status',
                     'Rating',
                     'Price',
                     'Featured',
                     'Actions',
                  ]}
                  category
                  createdAt
                  status
                  rating
                  price
                  featured
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

export default Product;
