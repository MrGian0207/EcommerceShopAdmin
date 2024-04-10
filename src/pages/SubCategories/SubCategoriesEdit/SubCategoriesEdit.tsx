import styles from './SubCategoriesEdit.module.scss';
import classNames from 'classnames/bind';
import DefaultLayout from '~/layouts/DefaultLayout';
import ActionLayout from '~/layouts/ActionLayout';
import images from '~/assets/Image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useRef, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const cx = classNames.bind(styles);

function SubCategoriesEdit() {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [imageUrl, setImageUrl] = useState('');
    const [resizedImageUrl, setResizedImageUrl] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [metaTitle, setMetaTitle] = useState<string>('');
    const [slug, setSlug] = useState<string>('');
    const [imageSource, setImageSource] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [parentCategories, setParentCategories] = useState('');
    const nameImageFile = 'sub-category-image';

    const nameButtonSubmit = 'Edit Sub Category';

    const location = useLocation();
    const path = location.pathname;

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        setImageFile(file);

        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                const result = reader.result as string;
                setImageUrl(result);
                resizeImage(result);
            };
        }
    };

    const resizeImage = (imageUrl: string) => {
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            if (ctx) {
                const maxWidth = 512;
                const maxHeight = 512;
                let width = img.width;
                let height = img.height;

                if (width > height) {
                    if (width > maxWidth) {
                        height *= maxWidth / width;
                        width = maxWidth;
                    }
                } else {
                    if (height > maxHeight) {
                        width *= maxHeight / height;
                        height = maxHeight;
                    }
                }

                canvas.width = width;
                canvas.height = height;

                ctx.drawImage(img, 0, 0, width, height);
                const resizedImageUrl = canvas.toDataURL();
                setResizedImageUrl(resizedImageUrl);
            }
        };
        img.src = imageUrl;
    };

    const handleFileSelect = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    useEffect(() => {
        if (path) {
            try {
                fetch(`http://localhost:8000${path}`)
                    .then((res) => {
                        return res.json();
                    })
                    .then((res) => {
                        if (res?.status === 'Success') {
                            const data: {
                                name: string;
                                title: string;
                                slug: string;
                                description: string;
                                parentCategory: string;
                                image: string;
                            } = res?.data;

                            setName(data?.name);
                            setMetaTitle(data?.title);
                            setSlug(data?.slug);
                            setDescription(data?.description);
                            setParentCategories(data?.parentCategory);
                            setImageSource(data?.image);
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            } catch (error) {
                console.log(error);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={cx('edit')}>
            <DefaultLayout
                active={'categories'}
                page={['Dashboard', 'Sub Categories', 'Edit']}
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
                                        onChange={handleFileChange}
                                    />
                                    <div
                                        onClick={handleFileSelect}
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
                                            {(imageUrl || imageSource) && (
                                                <img
                                                    src={
                                                        resizedImageUrl
                                                            ? resizedImageUrl
                                                            : imageSource
                                                    }
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

export default SubCategoriesEdit;
