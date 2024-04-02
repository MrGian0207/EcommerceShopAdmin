import DefaultLayout from '~/components/DefaultLayout';
import styles from './MainCategories.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function MainCategories() {
    return (
        <div className={cx('main-categories')}>
            <DefaultLayout
                active={'categories'}
                page={['Dashboard', 'Categories']}
                searchEngine={true}
            ></DefaultLayout>
        </div>
    );
}

export default MainCategories;
