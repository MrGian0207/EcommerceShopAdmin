import styles from './ActionLayout.module.scss';
import classNames from 'classnames/bind';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Toastify from '~/services/Toastify';
import { FormEventHandler, ReactNode, useRef, memo } from 'react';
import { useLocation } from 'react-router-dom';

const cx = classNames.bind(styles);

type ActionLayoutType = {
    leftColumn: ReactNode;
    rightColumn: ReactNode;
    SetImageUrl?: React.Dispatch<React.SetStateAction<string>>;
    name?: string;
    SetName?: React.Dispatch<React.SetStateAction<string>>;
    metaTitle?: string;
    SetMetaTitle?: React.Dispatch<React.SetStateAction<string>>;
    slug?: string;
    SetSlug?: React.Dispatch<React.SetStateAction<string>>;
    description?: string;
    SetDescription?: React.Dispatch<React.SetStateAction<string>>;
    parentCategories?: string;
    SetParentCategories?: React.Dispatch<React.SetStateAction<string>>;
    ImageFile?: File | null;
    NameImageFile?: string | null;
    nameButtonSubmit?: string;
};

function ActionLayout({
    leftColumn,
    rightColumn,
    SetImageUrl,
    name,
    SetName,
    metaTitle,
    SetMetaTitle,
    slug,
    SetSlug,
    description,
    SetDescription,
    parentCategories,
    SetParentCategories,
    ImageFile,
    NameImageFile = '',
    nameButtonSubmit = '',
}: ActionLayoutType) {
    const location = useLocation();
    let path = location.pathname; // Lấy đường dẫn từ URL
    const submit_ButtonRef = useRef<HTMLButtonElement>(null);

    // const handleEmptyInput = () => {
    //     if (SetName) SetName('');
    //     if (SetMetaTitle) SetMetaTitle('');
    //     if (SetSlug) SetSlug('');
    //     if (SetDescription) SetDescription('');
    //     if (SetParentCategories) SetParentCategories('');
    //     if (SetImageUrl) SetImageUrl('');
    // };

    const handleFormSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();

        if (submit_ButtonRef.current) {
            submit_ButtonRef.current.disabled = true;
            submit_ButtonRef.current.classList.add(cx('disable_button'));
        }

        Toastify.showToastMessagePending();
        const formData = new FormData();

        name && formData.append('name', name || '');
        metaTitle && formData.append('title', metaTitle || '');
        slug && formData.append('slug', slug || '');
        description && formData.append('description', description || '');
        parentCategories &&
            formData.append('parentCategories', parentCategories);
        ImageFile &&
            formData.append(NameImageFile as string, ImageFile || null);
            
        try {
            fetch(`http://localhost:8000${path}`, {
                method: 'POST',
                body: formData,
            })
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    if (data) {
                        if (submit_ButtonRef.current) {
                            submit_ButtonRef.current.disabled = false;
                            submit_ButtonRef.current.classList.remove(
                                cx('disable_button'),
                            );
                        }
                        if (data.status === 'Success') {
                            // handleEmptyInput();
                            Toastify.showToastMessageSuccessfully(
                                data?.message,
                            );
                        } else {
                            Toastify.showToastMessageFailure(data?.message);
                        }
                    }
                })
                .catch((err) => {
                    console.log(err);
                    if (submit_ButtonRef.current) {
                        submit_ButtonRef.current.disabled = false;
                        submit_ButtonRef.current.classList.remove(
                            cx('disable_button'),
                        );
                    }
                    Toastify.showToastMessageFailure(
                        'Submit Failure !! Try it again',
                    );
                });
        } catch (error) {
            console.log(error);
            Toastify.showToastMessageFailure(
                'Data Loaded Failure !! Try it again',
            );
        }
    };

    return (
        <>
            <form className={cx('add-layout')} onSubmit={handleFormSubmit}>
                <div className={cx('left-column')}>{leftColumn}</div>
                <div className={cx('right-column')}>
                    {rightColumn}
                    <button
                        ref={submit_ButtonRef}
                        type="submit"
                        className={cx('button')}
                    >
                        {nameButtonSubmit ? nameButtonSubmit : 'Submit'}
                    </button>
                </div>
            </form>
            <ToastContainer />
        </>
    );
}

export default memo(ActionLayout);
