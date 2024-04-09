import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../../components/Button';
import styles from './TableLayout.module.scss';
import classNames from 'classnames/bind';
import {
    faChevronLeft,
    faChevronRight,
    faPen,
    faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';

const cx = classNames.bind(styles);

type TableLayoutType = {
    headers?: string[];
    category?: boolean;
    parentCategory?: boolean;
    totalItems?: boolean;
    decription?: boolean;
    createdAt?: boolean;
    actions?: boolean;
};

type DataType = {
    _id?: string;
    name?: string;
    title?: string;
    slug?: string;
    description?: string;
    image?: string;
    createdAt?: string;
};

function TableLayout({
    headers,
    category = false,
    parentCategory = false,
    totalItems = false,
    decription = false,
    createdAt = false,
    actions = false,
}: TableLayoutType): JSX.Element {
    const location = useLocation();
    const path = location.pathname;
    const [dataArray, setDataArray] = useState<DataType[]>([]); // Use state to store data array

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
                            if (data) {
                                setDataArray(data);
                            }
                        }
                    });
            }
        } catch (err) {
            console.log(err);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
                        {dataArray.map((item) => (
                            <tr key={item._id}>
                                {category && (
                                    <th>
                                        <div className={cx('name-item')}>
                                            <img
                                                alt="Accessories demo"
                                                src={item.image}
                                            />
                                            <h4>{item.name}</h4>
                                        </div>
                                    </th>
                                )}
                                {parentCategory && <td></td>}
                                {totalItems && <td>0</td>}
                                {decription && (
                                    <td>
                                        <div className={cx('description')}>
                                            {item.description}
                                        </div>
                                    </td>
                                )}
                                {createdAt && (
                                    <td>
                                        {format(
                                            new Date(item.createdAt as string),
                                            'dd MMM yyyy',
                                        )}
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
                                                to={`http://localhost:8000${path}/delete/${item._id}`}
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

export default TableLayout;
