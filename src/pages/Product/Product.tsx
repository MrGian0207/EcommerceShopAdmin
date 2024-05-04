import styles from './Product.module.scss';
import classNames from 'classnames/bind';
import DefaultLayout from '~/layouts/DefaultLayout';
import Button from '~/components/Button';
import TableLayout from '~/layouts/TableLayout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import 'react-toastify/dist/ReactToastify.css';
import * as Toastify from '~/services/Toastify';
import { useEffect } from 'react';

const cx = classNames.bind(styles);

function Product(): JSX.Element {
   useEffect(() => {
      document.title = 'Product | NextStore';

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
         </DefaultLayout>
      </div>
   );
}

export default Product;
