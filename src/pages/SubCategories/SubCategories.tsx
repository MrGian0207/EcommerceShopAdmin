import DefaultLayout from '~/layouts/DefaultLayout';
import TableLayout from '~/layouts/TableLayout';
import Button from '~/components/Button';
import styles from './SubCategories.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import * as Toastify from '~/services/Toastify';
import { useEffect } from 'react';

const cx = classNames.bind(styles);

function SubCategories(): JSX.Element {

    useEffect(() => {
        document.title = 'Sub Category | NextStore';
  
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
                />{' '}
            </DefaultLayout>
        </div>
    );
}

export default SubCategories;
