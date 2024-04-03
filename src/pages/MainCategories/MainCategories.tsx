import DefaultLayout from '~/components/DefaultLayout';
import styles from './MainCategories.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '~/components/Button';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import TableLayout from '~/components/TableLayout';
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
                <TableLayout />
            </DefaultLayout>
        </div>
    );
}

export default MainCategories;
