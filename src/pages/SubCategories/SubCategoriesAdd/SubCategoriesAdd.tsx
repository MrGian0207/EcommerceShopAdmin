import styles from './SubCategoriesAdd.module.scss';
import classNames from 'classnames/bind';
import DefaultLayout from '~/layouts/DefaultLayout';
import ActionLayout from '~/layouts/ActionLayout';
import images from '~/assets/Image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useRef, useState } from 'react';
import * as HandleImageFile from '~/utils/HandleImageFile';

const cx = classNames.bind(styles);

function SubCategoriesAdd() {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [imageUrl, setImageUrl] = useState('');
    const [resizedImageUrl, setResizedImageUrl] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [metaTitle, setMetaTitle] = useState<string>('');
    const [slug, setSlug] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [parentCategories, setParentCategories] = useState('');
    const nameImageFile = 'sub-category-image';
    const nameButtonSubmit = 'Create Sub Category';

    return (
        <div className={cx('edit')}>
            <DefaultLayout
                active={'categories'}
                page={['Dashboard', 'Sub Categories', 'Add']}
            >
                <ActionLayout
                    leftColumn={
                        <>
                            <div className={cx('category-name')}>
                                <label htmlFor="category-name">
                                    Category Name
                                </label>
                                <input
                                    name="category-name"
                                    id="category-name"
                                    type="text"
                                    onChange={(e) => setName(e.target.value)}
                                    value={name}
                                />
                            </div>
                            <div className={cx('meta-title')}>
                                <label htmlFor="meta-title">Meta Title</label>
                                <input
                                    name="meta-title"
                                    id="meta-title"
                                    type="text"
                                    onChange={(e) =>
                                        setMetaTitle(e.target.value)
                                    }
                                    value={metaTitle}
                                />
                            </div>
                            <div className={cx('slug')}>
                                <label htmlFor="slug">Slug</label>
                                <input
                                    name="slug"
                                    id="slug"
                                    type="text"
                                    onChange={(e) => setSlug(e.target.value)}
                                    value={slug}
                                />
                            </div>
                            <div className={cx('description')}>
                                <label htmlFor="description">Description</label>
                                <textarea
                                    name="description"
                                    id="description"
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                    value={description}
                                    rows={9}
                                ></textarea>
                            </div>
                        </>
                    }
                    rightColumn={
                        <>
                            <div className={cx('right-column')}>
                                <div className={cx('selected-box')}>
                                    <label>Parent Category</label>
                                    <div className={cx('options-box')}>
                                        <select
                                            className={cx('custom-select')}
                                            name="sub-categories"
                                            value={parentCategories}
                                            onChange={(e) => {
                                                setParentCategories(
                                                    e.target.value,
                                                );
                                            }}
                                        >
                                            <option disabled></option>
                                            <option>Clothes</option>
                                            <option>Shoes</option>
                                            <option>Accessories</option>
                                        </select>
                                        <div
                                            className={cx(
                                                'custom-select-arrow',
                                            )}
                                        >
                                            <FontAwesomeIcon
                                                className={cx('icon')}
                                                icon={faChevronDown}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className={cx('image')}>
                                    <label htmlFor="sub-category-image">
                                        Image 512 * 512
                                    </label>
                                    <input
                                        ref={fileInputRef}
                                        name="sub-category-image"
                                        id={nameImageFile}
                                        type="file"
                                        onChange={(e) => {
                                            HandleImageFile.handleFileChange(
                                                e,
                                                setImageFile,
                                                setImageUrl,
                                                setResizedImageUrl,
                                            );
                                        }}
                                    />
                                    <div
                                        onClick={() => {
                                            HandleImageFile.handleFileSelect(
                                                fileInputRef,
                                            );
                                        }}
                                        className={cx('image-custom')}
                                    >
                                        <div className="box">
                                            <h4>Drop or Select Images</h4>
                                            <img
                                                src={images.uploadImage}
                                                alt=""
                                            />
                                        </div>
                                        <div className={cx('preview-image')}>
                                            {imageUrl && (
                                                <img
                                                    src={resizedImageUrl}
                                                    alt="preview"
                                                />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    }
                    SetImageUrl={setImageUrl}
                    name={name}
                    SetName={setName}
                    metaTitle={metaTitle}
                    SetMetaTitle={setMetaTitle}
                    slug={slug}
                    SetSlug={setSlug}
                    description={description}
                    SetDescription={setDescription}
                    parentCategories={parentCategories}
                    SetParentCategories={setParentCategories}
                    ImageFile={imageFile}
                    NameImageFile={nameImageFile}
                    nameButtonSubmit={nameButtonSubmit}
                />
            </DefaultLayout>
        </div>
    );
}

export default SubCategoriesAdd;
