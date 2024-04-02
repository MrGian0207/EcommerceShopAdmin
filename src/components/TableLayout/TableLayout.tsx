import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../Button';
import styles from './TableLayout.module.scss';
import classNames from 'classnames/bind';
import {
    faChevronLeft,
    faChevronRight,
    faPen,
    faTrash,
} from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function TableLayout(): JSX.Element {
    return (
        <>
            <div className={cx('table-layout')}>
                <table className={cx('table')}>
                    <thead>
                        <tr>
                            <th>Cateogory</th>
                            <th>Total Items</th>
                            <th>Description</th>
                            <th>Created at</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>
                                <div className={cx('name-item')}>
                                    <img
                                        alt="Accessories demo"
                                        src="https://res.cloudinary.com/techgater/image/upload/v1709993047/my-uploads/aw62zeksnh3gn5llokkw.jpg"
                                    />
                                    <h4>Accessories demo</h4>
                                </div>
                            </th>
                            <td>2</td>
                            <td>
                                Accessories are the key to making a style
                                statemen
                            </td>
                            <td>09 Mar 2024</td>
                            <td>
                                <Button to={'/'} className="edit-btn">
                                    <FontAwesomeIcon icon={faPen} />
                                </Button>
                                <Button to={'/'} className="delete-btn">
                                    <FontAwesomeIcon icon={faTrash} />
                                </Button>
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <div className={cx('name-item')}>
                                    <img
                                        alt="Accessories demo"
                                        src="https://res.cloudinary.com/techgater/image/upload/v1709993047/my-uploads/aw62zeksnh3gn5llokkw.jpg"
                                    />
                                    <h4>Accessories demo</h4>
                                </div>
                            </th>
                            <td>2</td>
                            <td>
                                Accessories are the key to making a style
                                statemen
                            </td>
                            <td>09 Mar 2024</td>
                            <td>
                                <Button to={'/'} className="edit-btn">
                                    <FontAwesomeIcon icon={faPen} />
                                </Button>
                                <Button to={'/'} className="delete-btn">
                                    <FontAwesomeIcon icon={faTrash} />
                                </Button>
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <div className={cx('name-item')}>
                                    <img
                                        alt="Accessories demo"
                                        src="https://res.cloudinary.com/techgater/image/upload/v1709993047/my-uploads/aw62zeksnh3gn5llokkw.jpg"
                                    />
                                    <h4>Accessories demo</h4>
                                </div>
                            </th>
                            <td>2</td>
                            <td>
                                Accessories are the key to making a style
                                statemen
                            </td>
                            <td>09 Mar 2024</td>
                            <td>
                                <Button to={'/'} className="edit-btn">
                                    <FontAwesomeIcon icon={faPen} />
                                </Button>
                                <Button to={'/'} className="delete-btn">
                                    <FontAwesomeIcon icon={faTrash} />
                                </Button>
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <div className={cx('name-item')}>
                                    <img
                                        alt="Accessories demo"
                                        src="https://res.cloudinary.com/techgater/image/upload/v1709993047/my-uploads/aw62zeksnh3gn5llokkw.jpg"
                                    />
                                    <h4>Accessories demo</h4>
                                </div>
                            </th>
                            <td>2</td>
                            <td>
                                Accessories are the key to making a style
                                statemen
                            </td>
                            <td>09 Mar 2024</td>
                            <td>
                                <Button to={'/'} className="edit-btn">
                                    <FontAwesomeIcon icon={faPen} />
                                </Button>
                                <Button to={'/'} className="delete-btn">
                                    <FontAwesomeIcon icon={faTrash} />
                                </Button>
                            </td>
                        </tr>
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
