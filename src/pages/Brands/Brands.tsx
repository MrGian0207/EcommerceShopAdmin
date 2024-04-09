import styles from './Brands.module.scss';
import classNames from 'classnames/bind';
import DefaultLayout from '~/layouts/DefaultLayout';

const cx = classNames.bind(styles);

function Brands() {
    return (
        <div className={cx('brands')}>
            <DefaultLayout
                active={'brands'}
                page={['Dashboard', 'Brands']}
                searchEngine={true}
            />
        </div>
    );
}

export default Brands;
