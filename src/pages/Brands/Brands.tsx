import styles from './Brands.module.scss';
import classNames from 'classnames/bind';
import DefaultLayout from '~/components/DefaultLayout';

const cx = classNames.bind(styles);

function Brands() {
    return (
        <div className={cx('brands')}>
            <DefaultLayout active={'brands'} page={['Dashboard', 'Brands']} />
        </div>
    );
}

export default Brands;
