import styles from './SubCategoriesEdit.module.scss';
import classNames from 'classnames/bind';
import DefaultLayout from '~/layouts/DefaultLayout';
import ActionLayout from '~/layouts/ActionLayout';
import images from '~/assets/Image';
import { useRef, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import * as HandleImageFile from '~/utils/HandleImageFile';
import OptionSelect from '~/components/OptionSelect';

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
    const [nameParentCategoryArray, setNameParentCategoryArray] = useState([]);
    const nameImageFile = 'sub-category-image';
    const nameButtonSubmit = 'Edit Sub Category';

    const location = useLocation();
    const path = location.pathname;

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

    useEffect(() => {
        fetch(
            'http://localhost:8000/categories/main-categories/parent-categories',
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            },
        )
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                if (res?.status === 'Success') {
                    if (res?.data) {
                        setNameParentCategoryArray(res?.data);
                    }
                }
            })
            .catch((err) => {
                console.log(err);
            });
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
                                <OptionSelect
                                    dataOptions={parentCategories}
                                    setDataOptions={setParentCategories}
                                    dataOptionsArray={
                                        nameParentCategoryArray as []
                                    }
                                    labelName="Parent Category"
                                />

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
