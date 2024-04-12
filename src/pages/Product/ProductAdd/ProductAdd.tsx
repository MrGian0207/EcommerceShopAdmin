import styles from './ProductAdd.module.scss';
import classNames from 'classnames/bind';
import DefaultLayout from '~/layouts/DefaultLayout';
import ActionLayout from '~/layouts/ActionLayout';
import images from '~/assets/Image';
import { useRef, useState } from 'react';
import * as HandleImageFile from '~/utils/HandleImageFile';
import OptionSelect from '~/components/OptionSelect';

const cx = classNames.bind(styles);

function ProductAdd(): JSX.Element {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [imageUrl, setImageUrl] = useState('');
    const [resizedImageUrl, setResizedImageUrl] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [metaTitle, setMetaTitle] = useState<string>('');
    const [slug, setSlug] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [categories, setCategories] = useState('');
    const [categoriesArray, setCategoriesArray] = useState([]);
    const [subcategories, setSubCategories] = useState('');
    const [subCategoriesArray, setSubCategoriesArray] = useState([]);
    const [brand, setBrand] = useState('');
    const [brandArray, setBrandArray] = useState([]);
    const [gender, setGender] = useState('');
    const [genderArray, setGenderArray] = useState([]);
    const [status, setStatus] = useState('');
    const [statusArray, setStatusArray] = useState([]);
    const nameImageFile = 'product-image';
    const nameButtonSubmit = 'Create Product';

    return (
        <div className={cx('add')}>
            <DefaultLayout
                active={'product'}
                page={['Dashboard', 'Product', 'Add']}
            >
                <ActionLayout
                    leftColumn={
                        <>
                            <div className={cx('product-name')}>
                                <label htmlFor="product-name">
                                    Product Name
                                </label>
                                <input
                                    name="product-name"
                                    id="product-name"
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
                            <div className={cx('row')}>
                                <OptionSelect
                                    dataOptions={categories}
                                    setDataOptions={setCategories}
                                    dataOptionsArray={categoriesArray as []}
                                    labelName="Category"
                                />
                                <OptionSelect
                                    dataOptions={subcategories}
                                    setDataOptions={setSubCategories}
                                    dataOptionsArray={subCategoriesArray as []}
                                    labelName="Sub Category"
                                />
                            </div>
                            <div className={cx('row')}>
                                <OptionSelect
                                    dataOptions={brand}
                                    setDataOptions={setBrand}
                                    dataOptionsArray={brandArray as []}
                                    labelName="Brand"
                                />
                                <OptionSelect
                                    dataOptions={gender}
                                    setDataOptions={setGender}
                                    dataOptionsArray={genderArray as []}
                                    labelName="Gender"
                                />
                            </div>
                            <div className={cx('row')}>
                                <OptionSelect
                                    dataOptions={status}
                                    setDataOptions={setStatus}
                                    dataOptionsArray={statusArray as []}
                                    labelName="Status"
                                />
                                <div className={cx('product-code')}>
                                    <label htmlFor="tag">Product Code</label>
                                    <input
                                        name="product-code"
                                        id="product-code"
                                        type="text"
                                        // onChange={(e) => setTag(e.target.value)}
                                        // value={tag}
                                    />
                                </div>
                            </div>
                            <div className={cx('tag')}>
                                <label htmlFor="tag">Tags</label>
                                <input
                                    name="tag"
                                    id="tag"
                                    type="text"
                                    // onChange={(e) => setTag(e.target.value)}
                                    // value={tag}
                                />
                            </div>
                        </>
                    }
                    rightColumn={
                        <>
                            <div className={cx('right-column')}>
                                <div className={cx('slug')}>
                                    <label htmlFor="slug">Slug</label>
                                    <input
                                        name="slug"
                                        id="slug"
                                        type="text"
                                        onChange={(e) =>
                                            setSlug(e.target.value)
                                        }
                                        value={slug}
                                    />
                                </div>
                                <div className={cx('description')}>
                                    <label htmlFor="description">
                                        Description
                                    </label>
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
                                {/* <div className={cx('image')}>
                                    <label htmlFor="brands-image">
                                        Image 512 * 512
                                    </label>
                                    <input
                                        ref={fileInputRef}
                                        name="brands-image"
                                        id="brands-image"
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
                                </div> */}
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
                    ImageFile={imageFile}
                    NameImageFile={nameImageFile}
                    nameButtonSubmit={nameButtonSubmit}
                />
            </DefaultLayout>
        </div>
    );
}

export default ProductAdd;
