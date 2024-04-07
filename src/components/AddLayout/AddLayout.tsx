import styles from './AddLayout.module.scss';
import classNames from 'classnames/bind';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Toastify from '~/services/Toastify';
import { FormEventHandler, ReactNode, useRef } from 'react';
const cx = classNames.bind(styles);

type AddLayoutType = {
    leftColumn: ReactNode;
    rightColumn: ReactNode;
    imageUrl?: string;
    SetImageUrl?: React.Dispatch<React.SetStateAction<string>>;
    name?: string;
    SetName?: React.Dispatch<React.SetStateAction<string>>;
    metaTitle?: string;
    SetMetaTitle?: React.Dispatch<React.SetStateAction<string>>;
    slug?: string;
    SetSlug?: React.Dispatch<React.SetStateAction<string>>;
    description?: string;
    SetDescription?: React.Dispatch<React.SetStateAction<string>>;
    ImageFile?: File | null;
};

function AddLayout({
    leftColumn,
    rightColumn,
    imageUrl,
    SetImageUrl,
    name,
    SetName,
    metaTitle,
    SetMetaTitle,
    slug,
    SetSlug,
    description,
    SetDescription,
    ImageFile,
}: AddLayoutType) {
    const submit_ButtonRef = useRef<HTMLButtonElement>(null);

    const handleEmptyInput = () => {
        if (SetName) SetName('');
        if (SetMetaTitle) SetMetaTitle('');
        if (SetSlug) SetSlug('');
        if (SetDescription) SetDescription('');
        if (SetImageUrl) SetImageUrl('');
    };

    const handleFormSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();

        if (submit_ButtonRef.current) {
            submit_ButtonRef.current.disabled = true;
            submit_ButtonRef.current.classList.add(cx('disable_button'));
        }

        Toastify.showToastMessagePending();
        const formData = new FormData();

        formData.append('name', name || '');
        formData.append('title', metaTitle || '');
        formData.append('slug', slug || '');
        formData.append('description', description || '');
        if (ImageFile) formData.append('category-image', ImageFile || null);

        fetch('http://localhost:8000/categories/main-categories/add', {
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
                        handleEmptyInput();
                        Toastify.showToastMessageSuccessfully(data?.message);
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
                        Create Category
                    </button>
                </div>
            </form>
            <ToastContainer />
        </>
    );
}

export default AddLayout;
