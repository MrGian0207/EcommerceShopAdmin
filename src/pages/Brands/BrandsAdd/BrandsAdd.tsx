import styles from './BrandsAdd.module.scss';
import classNames from 'classnames/bind';
import DefaultLayout from '~/layouts/DefaultLayout';
import ActionLayout from '~/layouts/ActionLayout';
import images from '~/assets/Image';
import { useRef, useState } from 'react';
import * as HandleImageFile from '~/utils/HandleImageFile';


const cx = classNames.bind(styles);

function BrandsAdd(): JSX.Element {
   const fileInputRef = useRef<HTMLInputElement | null>(null);
   const [imageUrl, setImageUrl] = useState('');
   const [resizedImageUrl, setResizedImageUrl] = useState<string>('');
   const [name, setName] = useState<string>('');
   const [metaTitle, setMetaTitle] = useState<string>('');
   const [slug, setSlug] = useState<string>('');
   const [description, setDescription] = useState<string>('');
   const [imageFile, setImageFile] = useState<File | null>(null);
   const nameImageFile = 'brands-image';
   const nameButtonSubmit = 'Create Brands';

   return (
      <div className={cx('add')}>
         <DefaultLayout active={'brands'} page={['Dashboard', 'Brands', 'Add']}>
            <ActionLayout
               leftColumn={
                  <>
                     <div className={cx('brands-name')}>
                        <label htmlFor="brands-name">Brand Name</label>
                        <input
                           name="brands-name"
                           id="brands-name"
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
                           onChange={(e) => setMetaTitle(e.target.value)}
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
                           onChange={(e) => setDescription(e.target.value)}
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
                           <label htmlFor="brands-image">Image 512 * 512</label>
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
                                    512,
                                 );
                              }}
                           />
                           <div
                              onClick={() => {
                                 HandleImageFile.handleFileSelect(fileInputRef);
                              }}
                              className={cx('image-custom')}
                           >
                              <div className="box">
                                 <h4>Drop or Select Images</h4>
                                 <img src={images.uploadImage} alt="" />
                              </div>
                              <div className={cx('preview-image')}>
                                 {imageUrl && (
                                    <img src={resizedImageUrl} alt="preview" />
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
               ImageFile={imageFile}
               NameImageFile={nameImageFile}
               nameButtonSubmit={nameButtonSubmit}
            />
         </DefaultLayout>
      </div>
   );
}

export default BrandsAdd;
