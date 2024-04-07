import DefaultLayout from '~/components/DefaultLayout';
import styles from './MainCategoriesAdd.module.scss';
import classNames from 'classnames/bind';
import AddLayout from '~/components/AddLayout';
import images from '~/assets/Image';
import { useRef, useState } from 'react';

const cx = classNames.bind(styles);

function Edit(): JSX.Element {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [imageUrl, setImageUrl] = useState('');
    const [resizedImageUrl, setResizedImageUrl] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [metaTitle, setMetaTitle] = useState<string>('');
    const [slug, setSlug] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [imageFile, setImageFile] = useState<File | null>(null);

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

    return (
        <div className={cx('edit')}>
            <DefaultLayout
                active={'categories'}
                page={['Dashboard', 'Categories', 'Add']}
            >
                <AddLayout
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
                            <div className={cx('image-container')}>
                                <div className={cx('image')}>
                                    <label htmlFor="category-image">
                                        Image 512 * 512
                                    </label>
                                    <input
                                        ref={fileInputRef}
                                        name="category-image"
                                        id="category-image"
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
                    imageUrl={resizedImageUrl}
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
                />
            </DefaultLayout>
        </div>
    );
}

export default Edit;
