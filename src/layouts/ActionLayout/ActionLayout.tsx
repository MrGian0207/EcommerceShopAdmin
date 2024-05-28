import styles from './ActionLayout.module.scss';
import classNames from 'classnames/bind';
import 'react-toastify/dist/ReactToastify.css';
import * as Toastify from '~/services/Toastify';
import { FormEventHandler, ReactNode, useRef, memo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '~/context/AuthContext';
import Spinner from '~/components/Spinner';

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

type ActionLayoutType = {
   leftColumn: ReactNode;
   rightColumn: ReactNode;
   name?: string;
   metaTitle?: string;
   slug?: string;
   description?: string;
   Categories?: string;
   SubCategories?: string;
   Brand?: string;
   Gender?: string;
   Status?: string;
   ProductCode?: string;
   FeatureProduct?: string;
   Tag?: string[];
   ImageFile?: File | null;
   NameImageFile?: string | null;
   DefaultVariant?: string;
   VariantArray?: VariantType[];
   idVariantArray?: string[];
   idVariantDeletedArray?: string[];
   nameButtonSubmit?: string;
   heading?: string;
   primaryButtonText?: string;
   primaryButtonLink?: string;
   secondaryButtonText?: string;
   secondaryButtonLink?: string;
   displaySlide?: string;
   setIsNameTouched?: React.Dispatch<React.SetStateAction<boolean>>;
   setIsMetaTitleTouched?: React.Dispatch<React.SetStateAction<boolean>>;
   setIsSlugTouched?: React.Dispatch<React.SetStateAction<boolean>>;
   setIsDescriptionTouched?: React.Dispatch<React.SetStateAction<boolean>>;
   setIsImageFileTouched?: React.Dispatch<React.SetStateAction<boolean>>;
};

function ActionLayout({
   leftColumn,
   rightColumn,
   name,
   metaTitle,
   slug,
   description,
   Categories,
   SubCategories,
   Brand,
   Gender,
   Status,
   ProductCode,
   FeatureProduct,
   Tag,
   DefaultVariant,
   VariantArray,
   idVariantArray,
   idVariantDeletedArray,
   ImageFile,
   NameImageFile = '',
   nameButtonSubmit = '',
   heading,
   primaryButtonText,
   primaryButtonLink,
   secondaryButtonText,
   secondaryButtonLink,
   displaySlide,
   setIsNameTouched,
   setIsMetaTitleTouched,
   setIsSlugTouched,
   setIsDescriptionTouched,
   setIsImageFileTouched,
}: ActionLayoutType) {
   const location = useLocation();
   let path = location.pathname; // Lấy đường dẫn từ URL
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const submit_ButtonRef = useRef<HTMLButtonElement>(null);
   const { accessToken } = useAuth()!;
   const isLoadingButtonStyle = isLoading
      ? { opacity: '0.5' }
      : { opacity: '1' };

   //Check if input is empty or not
   const isEmpty = (): boolean => {
      if (
         name === '' ||
         metaTitle === '' ||
         slug === '' ||
         description === '' ||
         Categories === '' ||
         ImageFile === null ||
         heading === '' ||
         primaryButtonText === '' ||
         primaryButtonLink === ''
      ) {
         return true;
      } else {
         return false;
      }
   };

   //Submit Form not varriants
   const handleFormSubmit: FormEventHandler<HTMLFormElement> = (e) => {
      e.preventDefault();
      setIsNameTouched && setIsNameTouched(true);
      setIsMetaTitleTouched && setIsMetaTitleTouched(true);
      setIsSlugTouched && setIsSlugTouched(true);
      setIsDescriptionTouched && setIsDescriptionTouched(true);
      setIsImageFileTouched && setIsImageFileTouched(true);
      if (isEmpty() === false) {
         setIsLoading(true);

         if (submit_ButtonRef.current) {
            submit_ButtonRef.current.disabled = true;
            submit_ButtonRef.current.classList.add(cx('disable_button'));
         }

         Toastify.showToastMessagePending();
         const formData = new FormData();

         // Insert data into the form to request
         name && formData.append('name', name || '');
         metaTitle && formData.append('title', metaTitle || '');
         slug && formData.append('slug', slug || '');
         description && formData.append('description', description || '');
         Categories && formData.append('category', Categories);
         ImageFile &&
            formData.append(NameImageFile as string, ImageFile || null);

         heading && formData.append('heading', heading);
         primaryButtonText &&
            formData.append('primaryButtonText', primaryButtonText);
         primaryButtonLink &&
            formData.append('primaryButtonLink', primaryButtonLink);
         secondaryButtonText &&
            formData.append('secondaryButtonText', secondaryButtonText);
         secondaryButtonLink &&
            formData.append('secondaryButtonLink', secondaryButtonLink);
         displaySlide && formData.append('displaySlide', displaySlide);

         try {
            fetch(`${process.env.REACT_APP_BACKEND_URL}${path}`, {
               method: 'POST',
               headers: {
                  Authorization: `Bearer ${accessToken}`,
               },
               body: formData,
            })
               .then((res) => {
                  setIsLoading(false);
                  return res.json();
               })
               .then((data) => {
                  if (data) {
                     if (submit_ButtonRef.current) {
                        submit_ButtonRef.current.disabled = false;
                        submit_ButtonRef.current.classList.remove(
                           cx('disable_button'),
                        );
                     }
                     if (data.status === 'Success') {
                        Toastify.showToastMessageSuccessfully(data?.message);
                     } else {
                        Toastify.showToastMessageFailure(data?.message);
                     }
                  }
               })
               .catch((err) => {
                  setIsLoading(false);
                  console.log(err);
                  if (submit_ButtonRef.current) {
                     submit_ButtonRef.current.disabled = false;
                     submit_ButtonRef.current.classList.remove(
                        cx('disable_button'),
                     );
                  }
                  Toastify.showToastMessageFailure(
                     'Submit Failure !! Try it again',
                  );
               });
         } catch (error) {
            console.log(error);
            Toastify.showToastMessageFailure(
               'Data Loaded Failure !! Try it again',
            );
         }
      }
   };

   //Submit Form with varriants
   const handleFormSubmitWithVariant: FormEventHandler<HTMLFormElement> = (
      e,
   ) => {
      e.preventDefault();

      if (submit_ButtonRef.current) {
         submit_ButtonRef.current.disabled = true;
         submit_ButtonRef.current.classList.add(cx('disable_button'));
      }

      Toastify.showToastMessagePending();
      const formData = new FormData();

      let variantNumberImagesOfVariant: string = '';
      let variantAllImagesFile: File[] = [];

      VariantArray &&
         VariantArray.forEach((Variant) => {
            variantNumberImagesOfVariant += `${Variant.variantImagesFile?.length?.toString()} `;
            (Variant.variantImagesFile as []).length > 0 &&
               (Variant.variantImagesFile as []).forEach((image) => {
                  variantAllImagesFile.push(image);
               });
         });

      //Insert data into the form to request
      name && formData.append('name', name);
      metaTitle && formData.append('title', metaTitle);
      slug && formData.append('slug', slug);
      description && formData.append('description', description);
      Categories && formData.append('category', Categories);
      SubCategories && formData.append('subCategory', SubCategories);
      Brand && formData.append('brand', Brand);
      Gender && formData.append('gender', Gender);
      Status && formData.append('status', Status);
      ProductCode && formData.append('productCode', ProductCode);
      Tag && formData.append('tag', Tag.join(' '));
      FeatureProduct && formData.append('featureProduct', FeatureProduct);
      DefaultVariant && formData.append('defaultVariant', DefaultVariant);
      if (idVariantArray && idVariantArray.length > 0) {
         idVariantArray.forEach((variantId) => {
            formData.append('idVariantArray', variantId);
         });
      }
      if (idVariantDeletedArray && idVariantDeletedArray.length > 0) {
         idVariantDeletedArray.forEach((variantId) => {
            formData.append('idVariantDeletedArray', variantId);
         });
      }
      if (VariantArray && VariantArray.length > 0) {
         formData.append(
            'variantNumberImagesOfVariants',
            variantNumberImagesOfVariant,
         );
         VariantArray.forEach((variant) => {
            formData.append('variantName', variant.variantName as string);
            formData.append('variantSize', variant.variantSize as string);
            formData.append('variantColor', variant.variantColor as string);
            formData.append(
               'variantProductSKU',
               variant.variantProductSKU as string,
            );
            formData.append(
               'variantQuantity',
               variant.variantQuantity as string,
            );
            formData.append(
               'variantRegularPrice',
               variant.variantRegularPrice as string,
            );
            formData.append(
               'variantSalePrice',
               variant.variantSalePrice as string,
            );
            variant.variantImagesFile &&
               variant.variantImagesFile?.length > 0 &&
               variant.variantImagesFile?.forEach((image) => {
                  formData.append(NameImageFile as string, image);
               });
         });
      }

      try {
         fetch(`${process.env.REACT_APP_BACKEND_URL}${path}`, {
            method: 'POST',
            headers: {
               Authorization: `Bearer ${accessToken}`,
            },
            body: formData,
         })
            .then((res) => {
               return res.json();
            })
            .then((data) => {
               if (data) {
                  if (submit_ButtonRef.current) {
                     submit_ButtonRef.current.disabled = false;
                     submit_ButtonRef.current.classList.remove(
                        cx('disable_button'),
                     );
                  }
                  if (data.status === 'Success') {
                     Toastify.showToastMessageSuccessfully(data?.message);
                  } else {
                     Toastify.showToastMessageFailure(data?.message);
                  }
               }
            })
            .catch((err) => {
               console.log(err);
               if (submit_ButtonRef.current) {
                  submit_ButtonRef.current.disabled = false;
                  submit_ButtonRef.current.classList.remove(
                     cx('disable_button'),
                  );
               }
               Toastify.showToastMessageFailure(
                  'Submit Failure !! Try it again',
               );
            });
      } catch (error) {
         console.log(error);
         Toastify.showToastMessageFailure(
            'Data Loaded Failure !! Try it again',
         );
      }
   };

   return (
      <>
         <form
            className={cx('add-layout')}
            onSubmit={
               VariantArray ? handleFormSubmitWithVariant : handleFormSubmit
            }
         >
            <div className={cx('left-column')}>{leftColumn}</div>
            <div className={cx('right-column')}>
               {rightColumn}
               <button
                  ref={submit_ButtonRef}
                  type="submit"
                  className={cx('button')}
                  disabled={isLoading}
                  style={isLoadingButtonStyle}
               >
                  {isLoading ? (
                     <Spinner />
                  ) : nameButtonSubmit ? (
                     nameButtonSubmit
                  ) : (
                     'Submit'
                  )}
               </button>
            </div>
         </form>
      </>
   );
}

export default memo(ActionLayout);
