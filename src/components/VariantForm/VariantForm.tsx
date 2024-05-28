import React, { useState } from 'react';
import styles from './VariantForm.module.scss';
import classNames from 'classnames/bind';
import * as HandleImageFile from '~/utils/HandleImageFile';
import images from '~/assets/Image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleMinus } from '@fortawesome/free-solid-svg-icons';
import checkError, { propsType } from '~/utils/InputError';
import ErrorInput from '~/components/ErrorInput';

const cx = classNames.bind(styles);

type VariantType = {
   variantName?: string;
   variantSize?: string;
   variantColor?: string;
   variantProductSKU?: string;
   variantQuantity?: string;
   variantRegularPrice?: string;
   variantSalePrice?: string;
   variantImagesFile?: File[];
};

type VariantFormType = {
   nameForm: string;
   setVariantName: React.Dispatch<React.SetStateAction<string>>;
   setSize: React.Dispatch<React.SetStateAction<string>>;
   setColor: React.Dispatch<React.SetStateAction<string>>;
   setProductSKU: React.Dispatch<React.SetStateAction<string>>;
   setQuantity: React.Dispatch<React.SetStateAction<string>>;
   setRegularPrice: React.Dispatch<React.SetStateAction<string>>;
   setSalePrice: React.Dispatch<React.SetStateAction<string>>;
   setImageFileArray: React.Dispatch<React.SetStateAction<File[]>>;
   setImagePreviewArray: React.Dispatch<React.SetStateAction<string[]>>;
   imagePreviewArray: string[];
   fileInputRef: React.MutableRefObject<HTMLInputElement | null>;
   savedImageVariant?: string[];
   setSavedImageVariant?: React.Dispatch<React.SetStateAction<string[]>>;
   variantArray?: VariantType[];
   indexVariantEdit?: number;
   handleCancelModal: (
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
   ) => void;

   handleSaveModal: (
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
   ) => void;
};

function VariantForm({
   nameForm,
   setVariantName,
   setSize,
   setColor,
   setProductSKU,
   setQuantity,
   setRegularPrice,
   setSalePrice,
   setImageFileArray,
   setImagePreviewArray,
   handleCancelModal,
   handleSaveModal,
   imagePreviewArray,
   fileInputRef,
   savedImageVariant,
   setSavedImageVariant,
   variantArray,
   indexVariantEdit,
}: VariantFormType): JSX.Element {
   const [variantNameEdit, setVariantNameEdit] = useState(
      (variantArray && variantArray[indexVariantEdit as number].variantName) ||
         '',
   );
   const [variantSizeEdit, setVariantSizeEdit] = useState(
      (variantArray && variantArray[indexVariantEdit as number].variantSize) ||
         '',
   );
   const [variantColorEdit, setVariantColorEdit] = useState(
      (variantArray && variantArray[indexVariantEdit as number].variantColor) ||
         '',
   );
   const [variantProductSKUEdit, setVariantProductSKUEdit] = useState(
      (variantArray &&
         variantArray[indexVariantEdit as number].variantProductSKU) ||
         '',
   );
   const [variantQuantityEdit, setVariantQuantityEdit] = useState(
      (variantArray &&
         variantArray[indexVariantEdit as number].variantQuantity) ||
         '',
   );
   const [variantRegularPriceEdit, setVariantRegularPriceEdit] = useState(
      (variantArray &&
         variantArray[indexVariantEdit as number].variantRegularPrice) ||
         '',
   );
   const [variantSalePriceEdit, setVariantSalePriceEdit] = useState(
      (variantArray &&
         variantArray[indexVariantEdit as number].variantSalePrice) ||
         '',
   );

   const [Errors, setErrors] = useState<propsType>({
      variantName: '',
      variantColor: '',
      variantSize: '',
      variantQuantity: '',
      variantProductSKU: '',
      variantRegularPrice: '',
      variantSalePrice: '',
   });

   const [isVariantNameEditTouched, setIsVariantNameEditTouched] =
      useState<boolean>(false);
   const [isVariantSizeEditTouched, setIsVariantSizeEditTouched] =
      useState<boolean>(false);
   const [isVariantColorEditTouched, setIsVariantColorEditTouched] =
      useState<boolean>(false);
   const [isVariantProductSKUEditTouched, setIsVariantProductSKUEditTouched] =
      useState<boolean>(false);
   const [isVariantQuantityEditTouched, setIsVariantQuantityEditTouched] =
      useState<boolean>(false);
   const [
      isVariantRegularPriceEditTouched,
      setIsVariantRegularPriceEditTouched,
   ] = useState<boolean>(false);
   const [isVariantSalePriceEditTouched, setIsVariantSalePriceEditTouched] =
      useState<boolean>(false);

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
      <form className={cx('form-variant')}>
         {/* Name Modal */}
         <h2 className={cx('name-modal')}>{nameForm}</h2>
         {/* TODO: Input variant name */}
         <div className={cx('variant-name-box')}>
            <label htmlFor="name">Variant Name</label>
            <input
               name="variant-name"
               id="variant-name"
               type="text"
               onChange={(e) => {
                  handleInputChange(
                     e,
                     setVariantName,
                     'variantName',
                     setIsVariantNameEditTouched,
                  );
                  setVariantNameEdit(e.target.value);
               }}
               value={variantNameEdit}
            />
            {isVariantNameEditTouched && checkError(Errors).variantName && (
               <ErrorInput
                  nameError={checkError(Errors).variantName as string}
               />
            )}
         </div>
         {/* TODO: Input variant size, variant color and product SKU */}
         <div className={cx('row')}>
            {/* variant size */}
            <div className={cx('variant-size-box')}>
               <label htmlFor="variant-size">Size</label>
               <input
                  name="variant-size"
                  id="variant-size"
                  type="text"
                  onChange={(e) => {
                     handleInputChange(
                        e,
                        setSize,
                        'variantSize',
                        setIsVariantSizeEditTouched,
                     );
                     setSize(e.target.value);
                     setVariantSizeEdit(e.target.value);
                  }}
                  value={variantSizeEdit}
               />
               {isVariantSizeEditTouched && checkError(Errors).variantSize && (
                  <ErrorInput
                     nameError={checkError(Errors).variantSize as string}
                  />
               )}
            </div>
            {/* variant color */}
            <div className={cx('variant-color-box')}>
               <label htmlFor="variant-color">Color</label>
               <input
                  name="variant-color"
                  id="variant-color"
                  type="text"
                  onChange={(e) => {
                     handleInputChange(
                        e,
                        setColor,
                        'variantColor',
                        setIsVariantColorEditTouched,
                     );
                     setVariantColorEdit(e.target.value);
                  }}
                  value={variantColorEdit}
               />
               {isVariantColorEditTouched &&
                  checkError(Errors).variantColor && (
                     <ErrorInput
                        nameError={checkError(Errors).variantColor as string}
                     />
                  )}
            </div>
            {/* variant product SKU */}
            <div className={cx('variant-productSKU-box')}>
               <label htmlFor="variant-productSKU">Product SKU</label>
               <input
                  name="variant-productSKU"
                  id="variant-productSKU"
                  type="text"
                  onChange={(e) => {
                     handleInputChange(
                        e,
                        setProductSKU,
                        'variantProductSKU',
                        setIsVariantProductSKUEditTouched,
                     );
                     setVariantProductSKUEdit(e.target.value);
                  }}
                  value={variantProductSKUEdit}
               />
               {isVariantProductSKUEditTouched &&
                  checkError(Errors).variantProductSKU && (
                     <ErrorInput
                        nameError={
                           checkError(Errors).variantProductSKU as string
                        }
                     />
                  )}
            </div>
         </div>
         {/* TODO: Input variant quantity, regular price and sale price */}
         <div className={cx('row')}>
            {/* variant quantity */}
            <div className={cx('variant-quantity-box')}>
               <label htmlFor="variant-quantity">Quantity</label>
               <input
                  name="variant-quantity"
                  id="variant-quantity"
                  type="text"
                  onChange={(e) => {
                     handleInputChange(
                        e,
                        setQuantity,
                        'variantQuantity',
                        setIsVariantQuantityEditTouched,
                     );
                     setVariantQuantityEdit(e.target.value);
                  }}
                  value={variantQuantityEdit}
               />
               {isVariantQuantityEditTouched &&
                  checkError(Errors).variantQuantity && (
                     <ErrorInput
                        nameError={checkError(Errors).variantQuantity as string}
                     />
                  )}
            </div>
            {/* variant regular price */}
            <div className={cx('variant-regularPrice-box')}>
               <label htmlFor="variant-regularPrice">Regular Price</label>
               <input
                  name="variant-regularPrice"
                  id="variant-regularPrice"
                  type="text"
                  onChange={(e) => {
                     handleInputChange(
                        e,
                        setRegularPrice,
                        'variantRegularPrice',
                        setIsVariantRegularPriceEditTouched,
                     );
                     setVariantRegularPriceEdit(e.target.value);
                  }}
                  value={variantRegularPriceEdit}
               />
               {isVariantRegularPriceEditTouched &&
                  checkError(Errors).variantRegularPrice && (
                     <ErrorInput
                        nameError={
                           checkError(Errors).variantRegularPrice as string
                        }
                     />
                  )}
            </div>
            {/* variant sale price */}
            <div className={cx('variant-salePrice-box')}>
               <label htmlFor="variant-salePrice">Sale Price</label>
               <input
                  name="variant-salePrice"
                  id="variant-salePrice"
                  type="text"
                  onChange={(e) => {
                     handleInputChange(
                        e,
                        setSalePrice,
                        'variantSalePrice',
                        setIsVariantSalePriceEditTouched,
                     );
                     setVariantSalePriceEdit(e.target.value);
                  }}
                  value={variantSalePriceEdit}
               />
               {isVariantSalePriceEditTouched &&
                  checkError(Errors).variantSalePrice && (
                     <ErrorInput
                        nameError={
                           checkError(Errors).variantSalePrice as string
                        }
                     />
                  )}
            </div>
         </div>
         {/* TODO: Input for upload multi images */}
         <div className={cx('image')}>
            <label htmlFor="brands-image">Product Images (1080 * 1080)</label>
            <input
               ref={fileInputRef}
               name="brands-image"
               id="brands-image"
               type="file"
               onChange={(e) => {
                  HandleImageFile.handleMultiFileChange(
                     e,
                     setImageFileArray,
                     setImagePreviewArray,
                  );
               }}
            />
            <div
               onClick={() => {
                  HandleImageFile.handleFileSelect(fileInputRef);
               }}
               className={cx('image-custom')}
            >
               <div className={cx('box')}>
                  <img src={images.uploadImage} alt="upload" />
                  <span className={cx('image-description')}>
                     <h4>Drop or Select Images</h4>
                     <p>Drop Images here or click through your machine</p>
                  </span>
               </div>
            </div>
         </div>
         {/* TODO: Show preview images have been uploaded */}
         <div className={cx('row-image')}>
            {savedImageVariant &&
               savedImageVariant.length > 0 &&
               savedImageVariant.map((imagePreview, index) => {
                  return (
                     <div key={`imagePreview-${index}`}>
                        <div className={cx('preview-image')}>
                           <img src={imagePreview} alt="preview" />
                           {/* button delete preview image */}
                           <span
                              onClick={() => {
                                 setSavedImageVariant &&
                                    setSavedImageVariant((prevImages) => [
                                       ...prevImages.filter(
                                          (image, newindex) =>
                                             newindex !== index,
                                       ),
                                    ]);
                              }}
                              className={cx('delete-image')}
                           >
                              <FontAwesomeIcon icon={faCircleMinus} />
                           </span>
                        </div>
                     </div>
                  );
               })}
            {imagePreviewArray &&
               imagePreviewArray.length > 0 &&
               imagePreviewArray.map((imagePreview, index) => {
                  return (
                     <div key={`imagePreview-${index}`}>
                        <div className={cx('preview-image')}>
                           <img src={imagePreview} alt="preview" />
                           {/* button delete preview image */}
                           <span
                              onClick={() => {
                                 setImageFileArray((prevImageFile) => [
                                    ...prevImageFile.filter(
                                       (imageFile, newIndex) =>
                                          newIndex !== index,
                                    ),
                                 ]);
                                 setImagePreviewArray((prevImages) => [
                                    ...prevImages.filter(
                                       (image, newindex) => newindex !== index,
                                    ),
                                 ]);
                              }}
                              className={cx('delete-image')}
                           >
                              <FontAwesomeIcon icon={faCircleMinus} />
                           </span>
                        </div>
                     </div>
                  );
               })}
         </div>
         {/* TODO: Button cancel and save of variant modal */}
         <div className={cx('row-button')}>
            {/* TODO: Button cancel modal */}
            <button className={cx('btn-cancel')} onClick={handleCancelModal}>
               Cancel
            </button>
            {/* TODO: Button save modal*/}
            <button
               className={cx('btn-save')}
               onClick={(e) => {
                  setIsVariantNameEditTouched &&
                     setIsVariantNameEditTouched(true);
                  setIsVariantSizeEditTouched &&
                     setIsVariantSizeEditTouched(true);
                  setIsVariantColorEditTouched &&
                     setIsVariantColorEditTouched(true);
                  setIsVariantProductSKUEditTouched &&
                     setIsVariantProductSKUEditTouched(true);
                  setIsVariantQuantityEditTouched &&
                     setIsVariantQuantityEditTouched(true);
                  setIsVariantRegularPriceEditTouched &&
                     setIsVariantRegularPriceEditTouched(true);
                  setIsVariantSalePriceEditTouched &&
                     setIsVariantSalePriceEditTouched(true);
                  handleSaveModal(e);
               }}
            >
               Save
            </button>
         </div>
      </form>
   );
}

export default VariantForm;
