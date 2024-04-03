import style from './AddLayout.module.scss';
import classNames from 'classnames/bind';
import images from '~/assets/Image';
import { useRef } from 'react';
import Button from '../Button';
const cx = classNames.bind(style);

function AddLayout() {
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleFileSelect = () => {
        if (fileInputRef.current !== null) {
            fileInputRef.current.click();
        }
    };

    return (
        <form className={cx('add-layout')}>
            <div className={cx('add-info')}>
                <div className={cx('category-name')}>
                    <label htmlFor="category-name">Category Name</label>
                    <input
                        name="category-name"
                        id="category-name"
                        type="text"
                    />
                </div>
                <div className={cx('meta-title')}>
                    <label htmlFor="meta-title">Meta Title</label>
                    <input name="meta-title" id="meta-title" type="text" />
                </div>
                <div className={cx('slug')}>
                    <label htmlFor="slug">Slug</label>
                    <input name="slug" id="slug" type="text" />
                </div>
                <div className={cx('description')}>
                    <label htmlFor="description">Description</label>
                    <textarea
                        name="description"
                        id="description"
                        rows={9}
                    ></textarea>
                </div>
            </div>
            <div onClick={handleFileSelect} className={cx('add-submit')}>
                <div className={cx('image-container')}>
                    <div className={cx('image')}>
                        <label htmlFor="category-image">Image 512 * 512</label>
                        <input
                            ref={fileInputRef}
                            name="category-image"
                            id="category-image"
                            type="file"
                        />
                        <div className={cx('image-custom')}>
                            <div className="box">
                                <h4>Drop or Select Images</h4>
                                <img src={images.uploadImage} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
                <button type="submit" className={cx('button')}>
                    Create Category
                </button>
            </div>
        </form>
    );
}

export default AddLayout;
