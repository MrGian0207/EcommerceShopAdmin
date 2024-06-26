import DefaultLayout from '~/layouts/DefaultLayout';
import Button from '~/components/Button';
import styles from './SubCategories.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import * as Toastify from '~/services/Toastify';
import { useEffect, lazy, Suspense } from 'react';
import Loading from '~/components/Loading';

const cx = classNames.bind(styles);
const TableLayout = lazy(() => import('~/layouts/TableLayout'));

function SubCategories(): JSX.Element {
   useEffect(() => {
      document.title = 'Sub Category | MrGianStore';

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   return (
      <div className={cx('sub-categories')}>
         <DefaultLayout
            active={'categories'}
            page={['Dashboard', 'SubCategories']}
            searchEngine={true}
            buttons={[
               <Button
                  to={'/categories/sub-categories/add'}
                  className="button-add"
               >
                  <FontAwesomeIcon icon={faPlus} />
                  Add Sub Category
               </Button>,
            ]}
         >
            <Suspense fallback={<Loading />}>
               <TableLayout
                  headers={[
                     'Category',
                     'Parent Category',
                     'Created at',
                     'Actions',
                  ]}
                  category
                  parentCategory
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

export default SubCategories;
