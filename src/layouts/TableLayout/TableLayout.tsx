import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../../components/Button';
import styles from './TableLayout.module.scss';
import classNames from 'classnames/bind';
import {
    faChevronLeft,
    faChevronRight,
    faPen,
    faStar,
    faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { useUpdateLayout } from '~/context/UpdateLayoutContext';
import StatusItems from '~/components/StatusItems';
import { memo } from 'react';

const cx = classNames.bind(styles);

type ProductType = {
    name?: string;
    title?: string;
    slug?: string;
    description?: string;
    category?: string;
    subCategory?: string;
    brand?: string;
    gender?: string;
    status?: string;
    productCode?: string;
    tag?: string;
    featureProduct?: string;
    defaultVariant?: string;
    variants?: Variant[];
};

type Variant = {
    variantName?: string;
    variantSize?: string;
    variantColor?: string;
    variantProductSKU?: string;
    variantQuantity?: string;
    variantRegularPrice?: string;
    variantSalePrice?: string;
    variantImagesFile?: string[];
    product?: ProductType;
};

type TableLayoutType = {
    headers?: string[];
    category?: boolean;
    parentCategory?: boolean;
    totalItems?: boolean;
    description?: boolean;
    createdAt?: boolean;
    status?: boolean;
    rating?: boolean;
    price?: boolean;
    featured?: boolean;
    actions?: boolean;
    handleDeteleToastify?: (
        name: string,
        id: string,
        path: string,
        SetDeleteButtonOnclick?: React.Dispatch<React.SetStateAction<boolean>>,
    ) => void;
};

type DataType = {
    _id?: string;
    name?: string;
    title?: string;
    slug?: string;
    description?: string;
    image?: string;
    createdAt?: string;
    status?: string;
    rating?: number;
    price?: string;
    featureProduct?: string;
    parentCategory?: string;
};

type featureType = {
    _id?: string;
    feature?: string;
};

function TableLayout({
    headers,
    category = false,
    parentCategory = false,
    totalItems = false,
    description = false,
    status = false,
    rating = false,
    price = false,
    featured = false,
    createdAt = false,
    actions = false,
    handleDeteleToastify,
}: TableLayoutType): JSX.Element {
    const location = useLocation();
    const path = location.pathname;
    const [dataArray, setDataArray] = useState<DataType[]>([]);
    const [variantArray, setVariantArray] = useState<Variant[]>([]);
    const [quantityArray, setQuantityArray] = useState<number[]>([]);
    const [deleteButtonOnclick, SetDeleteButtonOnclick] = useState(false);
    const { updateLayout } = useUpdateLayout()!;
    const [featureArray, setFeatureArray] = useState<featureType[]>([]);
    const [featureUpdates, setFeatureUpdates] = useState<featureType>({});

    useEffect(() => {
        try {
            if (path) {
                fetch(`http://localhost:8000${path}`)
                    .then((res) => {
                        return res.json();
                    })
                    .then((res) => {
                        if (res?.status === 'Success') {
                            const data: DataType[] = res?.data;
                            const features: featureType[] = [];
                            if (data) {
                                setDataArray(data);
                            }
                            if (res?.variants) {
                                setVariantArray(res?.variants);
                            }
                            if (res?.quantity) {
                                setQuantityArray(res?.quantity);
                            }
                            data.forEach((value, index) => {
                                if (value?.featureProduct) {
                                    const _id = value?._id;
                                    const active = value?.featureProduct;
                                    features[index] = {
                                        _id: _id,
                                        feature: active,
                                    };
                                }
                            });

                            if (features.length > 0) {
                                setFeatureArray(features);
                            }
                        }
                    });
            }
        } catch (err) {
            console.log(err);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [updateLayout]);

    useEffect(() => {
        try {
            if (featureArray.length && path) {
                fetch(`http://localhost:8000${path}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(featureUpdates),
                })
                    .then((res) => {
                        return res.json();
                    })
                    .then((data) => {
                        console.log(data);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        } catch (error) {
            console.log(error);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [featureUpdates]);

    return (
        <>
            <div className={cx('table-layout')}>
                <table className={cx('table')}>
                    <thead>
                        <tr>
                            {headers &&
                                headers.map((header) => {
                                    return <th key={header}>{header}</th>;
                                })}
                        </tr>
                    </thead>
                    <tbody>
                        {dataArray.map((item, index) => (
                            <tr key={item._id}>
                                {category && (
                                    <th>
                                        <div className={cx('name-item')}>
                                            <img
                                                alt="Accessories demo"
                                                src={
                                                    item.image
                                                        ? item.image
                                                        : variantArray[index]
                                                              ?.variantImagesFile?.[0]
                                                }
                                            />
                                            <h4>{item.name}</h4>
                                        </div>
                                    </th>
                                )}
                                {parentCategory && (
                                    <td>{item.parentCategory}</td>
                                )}
                                {totalItems && <td>0</td>}
                                {description && (
                                    <td>
                                        <div className={cx('description')}>
                                            {item.description}
                                        </div>
                                    </td>
                                )}
                                {createdAt && (
                                    <td className={cx('created-at')}>
                                        {format(
                                            new Date(item.createdAt as string),
                                            'dd MMM yyyy',
                                        )}
                                    </td>
                                )}
                                {status && (
                                    <td className={cx('status')}>
                                        <StatusItems
                                            quantity={quantityArray[index]}
                                        />
                                    </td>
                                )}
                                {rating && (
                                    <td>
                                        <div className={cx('rating')}>
                                            <FontAwesomeIcon icon={faStar} />
                                            <FontAwesomeIcon icon={faStar} />
                                            <FontAwesomeIcon icon={faStar} />
                                            <FontAwesomeIcon icon={faStar} />
                                            <FontAwesomeIcon icon={faStar} />
                                        </div>
                                    </td>
                                )}
                                {price && (
                                    <td className={cx('price')}>
                                        {item.price
                                            ? `$${item.price}`
                                            : `$${variantArray[index]?.variantRegularPrice}`}
                                    </td>
                                )}
                                {featured && (
                                    <td>
                                        <div className={cx('feature-product')}>
                                            <div className={cx('toggle-box')}>
                                                <input
                                                    onChange={(e) => {
                                                        e.target.checked =
                                                            featureArray[index]
                                                                ?.feature ===
                                                            'active'
                                                                ? true
                                                                : false;
                                                    }}
                                                    checked={
                                                        featureArray[index]
                                                            ?.feature ===
                                                        'active'
                                                            ? true
                                                            : false
                                                    }
                                                    type="checkbox"
                                                    id={`toggle-${index}`}
                                                />
                                                <label
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        setFeatureArray(
                                                            (featureArray) => {
                                                                featureArray.forEach(
                                                                    (
                                                                        value,
                                                                        newIndex,
                                                                    ) => {
                                                                        if (
                                                                            newIndex ===
                                                                            index
                                                                        ) {
                                                                            featureArray[
                                                                                index
                                                                            ]
                                                                                .feature ===
                                                                            'active'
                                                                                ? (featureArray[
                                                                                      newIndex
                                                                                  ].feature =
                                                                                      'inactive')
                                                                                : (featureArray[
                                                                                      newIndex
                                                                                  ].feature =
                                                                                      'active');
                                                                        }
                                                                    },
                                                                );
                                                                return [
                                                                    ...featureArray,
                                                                ];
                                                            },
                                                        );
                                                        setFeatureUpdates(
                                                            featureArray[index],
                                                        );
                                                    }}
                                                    htmlFor={`toggle-${index}`}
                                                    className={cx(
                                                        'toggle-switch',
                                                    )}
                                                ></label>
                                            </div>
                                        </div>
                                    </td>
                                )}
                                {actions && (
                                    <td>
                                        <div className={cx('actions')}>
                                            <Button
                                                to={`${path}/${item._id}`}
                                                className="edit-btn"
                                            >
                                                <FontAwesomeIcon icon={faPen} />
                                            </Button>
                                            <Button
                                                onClick={() => {
                                                    if (
                                                        !deleteButtonOnclick &&
                                                        handleDeteleToastify
                                                    ) {
                                                        handleDeteleToastify(
                                                            item?.name as string,
                                                            item?._id as string,
                                                            path,
                                                            SetDeleteButtonOnclick,
                                                        );
                                                        SetDeleteButtonOnclick(
                                                            true,
                                                        );
                                                    }
                                                }}
                                                className="delete-btn"
                                            >
                                                <FontAwesomeIcon
                                                    icon={faTrash}
                                                />
                                            </Button>
                                        </div>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className={cx('pagination')}>
                <Button className="prev-button" to={'/'}>
                    <FontAwesomeIcon icon={faChevronLeft} />
                </Button>
                <Button className="page-number" to={'/'}>
                    1
                </Button>
                <Button className="next-button" to={'/'}>
                    <FontAwesomeIcon icon={faChevronRight} />
                </Button>
            </div>
        </>
    );
}

export default memo(TableLayout);
