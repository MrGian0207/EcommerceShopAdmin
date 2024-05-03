import DefaultLayout from '~/layouts/DefaultLayout';
import Button from '~/components/Button';
import TableLayout from '~/layouts/TableLayout';
import styles from './MainCategories.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import 'react-toastify/dist/ReactToastify.css';
import * as Toastify from '~/services/Toastify';

const cx = classNames.bind(styles);

function MainCategories() {
   return (
      <div className={cx('main-categories')}>
         <DefaultLayout
            active={'categories'}
            page={['Dashboard', 'Categories']}
            searchEngine={true}
            buttons={[
               <Button
                  to={'/categories/main-categories/add'}
                  className="button-add"
               >
                  <FontAwesomeIcon icon={faPlus} />
                  Add Category
               </Button>,
            ]}
         >
            <TableLayout
               headers={[
                  'Category',
                  'Total Items',
                  'Description',
                  'Created at',
                  'Actions',
               ]}
               category
               totalItems
               description
               createdAt
               actions
               editButton
               deleteButton
               handleDeteleToastify={Toastify.handleDeteleToastify}
            />
         </DefaultLayout>
      </div>
   );
}

export default MainCategories;
