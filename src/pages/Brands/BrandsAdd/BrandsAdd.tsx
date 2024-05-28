import styles from './BrandsAdd.module.scss';
import classNames from 'classnames/bind';
import DefaultLayout from '~/layouts/DefaultLayout';
import ActionLayout from '~/layouts/ActionLayout';
import images from '~/assets/Image';
import { useRef, useState, useEffect } from 'react';
import * as HandleImageFile from '~/utils/HandleImageFile';
import checkError, { propsType } from '~/utils/InputError';
import ErrorInput from '~/components/ErrorInput';

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
   const [Errors, setErrors] = useState<propsType>({
      name: '',
      metaTitle: '',
      slug: '',
      description: '',
      imageFile: null,
   });

   const [isNameTouched, setIsNameTouched] = useState<boolean>(false);
   const [isMetaTitleTouched, setIsMetaTitleTouched] = useState<boolean>(false);
   const [isSlugTouched, setIsSlugTouched] = useState<boolean>(false);
   const [isDescriptionTouched, setIsDescriptionTouched] =
      useState<boolean>(false);
   const [isImageFileTouched, setIsImageFileTouched] = useState<boolean>(false);

   const nameImageFile = 'brands-image';
   const nameButtonSubmit = 'Create Brands';

   useEffect(() => {
      document.title = 'Add Brand | MrGianStore';
   }, []);

   const handleInputChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      setState: React.Dispatch<React.SetStateAction<string>>,
      fieldName: keyof propsType,
      setTouched: React.Dispatch<React.SetStateAction<boolean>>,
   ) => {
      setErrors((prevErrors) => ({
         ...prevErrors,
         [fieldName]: e.target.value,
      }));
      setState(e.target.value);
      setTouched(true);
   };

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
                           onChange={(e) =>
                              handleInputChange(
                                 e,
                                 setName,
                                 'name',
                                 setIsNameTouched,
                              )
                           }
                           value={name}
                        />
                        {isNameTouched && checkError(Errors).name && (
                           <ErrorInput
                              nameError={checkError(Errors).name as string}
                           />
                        )}
                     </div>
                     <div className={cx('meta-title')}>
                        <label htmlFor="meta-title">Meta Title</label>
                        <input
                           name="meta-title"
                           id="meta-title"
                           type="text"
                           onChange={(e) =>
                              handleInputChange(
                                 e,
                                 setMetaTitle,
                                 'metaTitle',
                                 setIsMetaTitleTouched,
                              )
                           }
                           value={metaTitle}
                        />
                        {isMetaTitleTouched && checkError(Errors).metaTitle && (
                           <ErrorInput
                              nameError={checkError(Errors).metaTitle as string}
                           />
                        )}
                     </div>
                     <div className={cx('slug')}>
                        <label htmlFor="slug">Slug</label>
                        <input
                           name="slug"
                           id="slug"
                           type="text"
                           onChange={(e) =>
                              handleInputChange(
                                 e,
                                 setSlug,
                                 'slug',
                                 setIsSlugTouched,
                              )
                           }
                           value={slug}
                        />
                        {isSlugTouched && checkError(Errors).slug && (
                           <ErrorInput
                              nameError={checkError(Errors).slug as string}
                           />
                        )}
                     </div>
                     <div className={cx('description')}>
                        <label htmlFor="description">Description</label>
                        <textarea
                           name="description"
                           id="description"
                           onChange={(e) =>
                              handleInputChange(
                                 e,
                                 setDescription,
                                 'description',
                                 setIsDescriptionTouched,
                              )
                           }
                           value={description}
                           rows={9}
                        ></textarea>
                        {isDescriptionTouched &&
                           checkError(Errors).description && (
                              <ErrorInput
                                 nameError={
                                    checkError(Errors).description as string
                                 }
                              />
                           )}
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
                                 setIsImageFileTouched(true);
                                 setErrors((prevErrors) => ({
                                    ...prevErrors,
                                    imageFile: e.target.files?.[0],
                                 }));
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
                           {isImageFileTouched &&
                              checkError(Errors).imageFile && (
                                 <ErrorInput
                                    nameError={
                                       checkError(Errors).imageFile as string
                                    }
                                 />
                              )}
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
               setIsNameTouched={setIsNameTouched}
               setIsMetaTitleTouched={setIsMetaTitleTouched}
               setIsSlugTouched={setIsSlugTouched}
               setIsDescriptionTouched={setIsDescriptionTouched}
               setIsImageFileTouched={setIsImageFileTouched}
            />
         </DefaultLayout>
      </div>
   );
}

export default BrandsAdd;
