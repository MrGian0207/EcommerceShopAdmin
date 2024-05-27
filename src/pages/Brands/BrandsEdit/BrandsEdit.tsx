import styles from './BrandsEdit.module.scss';
import classNames from 'classnames/bind';
import DefaultLayout from '~/layouts/DefaultLayout';
import ActionLayout from '~/layouts/ActionLayout';
import images from '~/assets/Image';
import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import * as HandleImageFile from '~/utils/HandleImageFile';
import { useAuth } from '~/context/AuthContext';

const cx = classNames.bind(styles);

function BrandsEdit(): JSX.Element {
   const fileInputRef = useRef<HTMLInputElement | null>(null);
   const [imageUrl, setImageUrl] = useState<string>('');
   const [resizedImageUrl, setResizedImageUrl] = useState<string>('');
   const [name, setName] = useState<string>('');
   const [metaTitle, setMetaTitle] = useState<string>('');
   const [slug, setSlug] = useState<string>('');
   const [description, setDescription] = useState<string>('');
   const [imageSource, setImageSource] = useState<string>('');
   const [imageFile, setImageFile] = useState<File | null>(null);
   const nameImageFile = 'brands-image';

   const nameButtonSubmit: string = 'Edit Brand';

   const location = useLocation();
   const path = location.pathname;

   useEffect(() => {
      document.title = 'Edit Brand | MrGianStore';

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   const { accessToken } = useAuth()!;
   useEffect(() => {
      if (path) {
         try {
            fetch(`${process.env.REACT_APP_BACKEND_URL}${path}`, {
               method: 'GET',
               headers: {
                  Authorization: `Bearer ${accessToken}`,
               },
            })
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
                        image: string;
                     } = res?.data;

                     setName(data?.name);
                     setMetaTitle(data?.title);
                     setSlug(data?.slug);
                     setDescription(data?.description);
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
   }, [accessToken]);

   return (
      <div className={cx('add')}>
         <DefaultLayout
            active={'brands'}
            page={['Dashboard', 'Brands', 'Edit']}
         >
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
               name={name}
               metaTitle={metaTitle}
               slug={slug}
               description={description}
               ImageFile={imageFile}
               NameImageFile={nameImageFile}
               nameButtonSubmit={nameButtonSubmit}
            />
         </DefaultLayout>
      </div>
   );
}

export default BrandsEdit;
