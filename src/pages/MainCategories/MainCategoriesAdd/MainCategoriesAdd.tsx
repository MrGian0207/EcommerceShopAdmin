import DefaultLayout from '~/components/DefaultLayout';
import styles from './MainCategoriesAdd.module.scss';
import classNames from 'classnames/bind';
import AddLayout from '~/components/AddLayout';

const cx = classNames.bind(styles);

function Edit(): JSX.Element {
    return (
        <div className={cx('edit')}>
            <DefaultLayout
                active={'categories'}
                page={['Dashboard', 'Categories', 'Add']}
            >
                <AddLayout />
            </DefaultLayout>
        </div>
    );
}

export default Edit;
