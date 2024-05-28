import styles from './SubCategoriesAdd.module.scss';
import classNames from 'classnames/bind';
import DefaultLayout from '~/layouts/DefaultLayout';
import ActionLayout from '~/layouts/ActionLayout';
import images from '~/assets/Image';
import { useRef, useState, useEffect } from 'react';
import * as HandleImageFile from '~/utils/HandleImageFile';
import OptionSelect from '~/components/OptionSelect';
import { useAuth } from '~/context/AuthContext';
import checkError, { propsType } from '~/utils/InputError';
import ErrorInput from '~/components/ErrorInput';

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
   const [parentCategories, setParentCategories] = useState<string>('');
   const nameImageFile = 'sub-category-image';
   const nameButtonSubmit = 'Create Sub Category';
   const { accessToken } = useAuth()!;

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

   const CategoryOptionSelectRef = useRef<HTMLSelectElement>(null);

   useEffect(() => {
      document.title = 'Add Sub Category | MrGianStore';

      // eslint-disable-next-line react-hooks/exhaustive-deps
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

   useEffect(() => {
      fetch(
         `${process.env.REACT_APP_BACKEND_URL}/categories/main-categories/name`,
         {
            method: 'GET',
            headers: {
               'Content-Type': 'application/json',
               Accept: 'application/json',
               Authorization: `Bearer ${accessToken}`,
            },
         },
      )
         .then((res) => {
            return res.json();
         })
         .then((mainCategoriesData) => {
            if (
               mainCategoriesData?.status === 'Success' &&
               mainCategoriesData?.data
            ) {
               const selectElement = CategoryOptionSelectRef.current;
               if (selectElement) {
                  selectElement.innerHTML = '';

                  const option = document.createElement('option');
                  option.value = 'None';
                  option.textContent = 'None';
                  selectElement.appendChild(option);

                  mainCategoriesData.data.forEach((item: string) => {
                     const option = document.createElement('option');
                     option.value = item;
                     option.textContent = item;
                     selectElement.appendChild(option);
                  });
               }
            }
         })
         .catch((err) => {
            console.log(err);
         });
   }, [accessToken]);

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
                        <label htmlFor="category-name">Category Name</label>
                        <input
                           name="category-name"
                           id="category-name"
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
                     <div className={cx('right-column')}>
                        <OptionSelect
                           dataOptions={parentCategories}
                           setDataOptions={setParentCategories}
                           ref={CategoryOptionSelectRef}
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
               Categories={parentCategories}
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

export default SubCategoriesAdd;
