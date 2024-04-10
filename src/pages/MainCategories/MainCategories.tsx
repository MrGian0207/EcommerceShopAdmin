import DefaultLayout from '~/layouts/DefaultLayout';
import Button from '~/components/Button';
import TableLayout from '~/layouts/TableLayout';
import styles from './MainCategories.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CustomContentToastify from '~/components/CustomContentToastify';
import React from 'react';

const cx = classNames.bind(styles);

function MainCategories() {
    const handleDeteleToastify = (
        name: string,
        id: string,
        path: string,
        SetDeleteButtonOnclick?: React.Dispatch<React.SetStateAction<boolean>>,
    ) => {
        const closeToast = () => {
            SetDeleteButtonOnclick && SetDeleteButtonOnclick(false);
            toast.dismiss(); // Dismiss the toast when reject button is clicked
        };

        toast.warning(
            <CustomContentToastify
                title={`Do you wanna delete ${name}`}
                button={true}
                confirmButton={'Confirm'}
                rejectButton={'Cancel'}
                id={id}
                path={path}
                handleReject={closeToast}
            />,
            {
                position: 'top-center',
                autoClose: 3000,
                onClose: () => {
                    SetDeleteButtonOnclick && SetDeleteButtonOnclick(false);
                },
            },
        );
    };

    return (
        <div className={cx('main-categories')}>
            <DefaultLayout
                active={'categories'}
                page={['Dashboard', 'Categories']}
                searchEngine={true}
                buttons={[
                    <Button
                        to={'/categories/main-categories/add'}
                        className="button-add"
                    >
                        <FontAwesomeIcon icon={faPlus} />
                        Add Category
                    </Button>,
                ]}
            >
                <TableLayout
                    headers={[
                        'Category',
                        'Total Items',
                        'Description',
                        'Created at',
                        'Actions',
                    ]}
                    category
                    totalItems
                    decription
                    createdAt
                    actions
                    handleDeteleToastify={handleDeteleToastify}
                />
                <ToastContainer role="alert" />
            </DefaultLayout>
        </div>
    );
}

export default MainCategories;
