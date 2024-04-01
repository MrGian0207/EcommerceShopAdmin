import styles from './SideBarItems.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChevronDown,
    faChevronRight,
    faCircle,
    IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

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
    let Button = children.length === 1 ? Link : 'div';
    const [subNavigator, setSubNavigator] = useState(false);

    let childCategoriesIndex: number;
    let childCategories: string = '';
    const location = useLocation();
    const path = location.pathname; // Lấy đường dẫn từ URL
    const pathArray = path.split('/'); // Tách đường dẫn thành mảng các phần tử

    if (pathArray.includes('categories')) {
        childCategoriesIndex = pathArray.indexOf('categories') + 1;
        childCategories = pathArray[childCategoriesIndex];
    }
    return (
        <>
            <Button
                onClick={() => {
                    setSubNavigator((prevState) => !prevState);
                }}
                to={`/${title}`}
                className={cx('items', {
                    active: active,
                })}
            >
                <div className={cx('left')}>
                    <FontAwesomeIcon
                        className={cx('iconLeft')}
                        icon={iconLeft}
                    />
                </div>
                <p className={cx('content')}>{children[0]}</p>
                {iconRight && (
                    <div className={cx('right')}>
                        <FontAwesomeIcon
                            className={cx('iconRight')}
                            icon={subNavigator ? faChevronDown : faChevronRight}
                        />
                    </div>
                )}
            </Button>
            <>
                {(subNavigator || childCategories) && (
                    <div className={cx('sub-navigator')}>
                        {children.slice(1).map((item, index) => (
                            <Link
                                to={`/${title}/${item
                                    .toLowerCase()
                                    .trim()
                                    .replace(' ', '-')}`}
                                className={cx('items', {
                                    subactive:
                                        item
                                            .toLowerCase()
                                            .trim()
                                            .replace(' ', '-') ===
                                        childCategories
                                            ? true
                                            : false,
                                })}
                                key={index}
                            >
                                <div className={cx('left')}>
                                    <FontAwesomeIcon
                                        className={cx('iconLeft')}
                                        icon={faCircle}
                                    />
                                </div>
                                <p className={cx('content')}>{item}</p>{' '}
                            </Link>
                        ))}
                    </div>
                )}
            </>
        </>
    );
}

export default SideBarItems;
