import styles from './SideBarItems.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChevronRight,
    IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);

type SideBarItemsType = {
    iconLeft: IconDefinition;
    children: string[];
    iconRight?: boolean;
    active?: boolean;
    title?: string;
};

function SideBarItems({
    iconLeft,
    children,
    iconRight = false,
    active = false,
    title,
}: SideBarItemsType): JSX.Element {
    return (
        <Link
            to={`/${title}`}
            className={cx('items', {
                active: active,
            })}
        >
            <div className={cx('left')}>
                <FontAwesomeIcon className={cx('iconLeft')} icon={iconLeft} />
            </div>
            <p className={cx('content')}>{children[0]}</p>
            {iconRight && (
                <div className={cx('right')}>
                    <FontAwesomeIcon
                        className={cx('iconRight')}
                        icon={faChevronRight}
                    />
                </div>
            )}
        </Link>
    );
}

export default SideBarItems;
