import styles from './StatusItems.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

type StatusItemsType = {
    quantity: number;
};

function StatusItems({ quantity }: StatusItemsType): JSX.Element {
    let status: string = '';
    let style: string = '';

    switch (true) {
        case quantity >= 0 && quantity <= 10:
            status = 'Low stock';
            style = 'low';
            break;
        case quantity > 10 && quantity <= 100:
            status = 'Medium stock';
            style = 'medium';
            break;
        case quantity > 50:
            status = 'High stock';
            style = 'high';
            break;
        default:
            status = 'Low stock';
            style = 'low';
    }

    return <div className={cx('status-items', style)}>{status}</div>;
}

export default StatusItems;
