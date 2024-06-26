import styles from './VariantItems.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
   faExpand,
   faPalette,
   faPen,
   faTrash,
   faWallet,
} from '@fortawesome/free-solid-svg-icons';
import { VariantItemsType } from '~/types/VariantType';

const cx = classNames.bind(styles);

function VariantItems({
   variantId,
   variantName,
   variantColor,
   variantSize,
   variantSalePrice,
   defaultVariant,
   variantArray,
   setIdVariantArray,
   setIdVariantDeletedArray,
   handleRadioChange,
   setVariantArray,
   setToggleModalVariantEdit,
   setImagePreviewEditArray,
   setIndexVariantEdit,
   setVariantName,
   setSize,
   setColor,
   setProductSKU,
   setQuantity,
   setRegularPrice,
   setSalePrice,
   setImageFileArray,
   setSavedImageVariantPreview,
   savedImageVariantArray,
}: VariantItemsType): JSX.Element {
   return (
      <div className={cx('variant')}>
         <input
            onChange={handleRadioChange}
            value={variantName && variantName}
            checked={defaultVariant === variantName}
            type="radio"
            name="radio-button-group"
         />
         <div className={cx('variant-value')}>
            <div className={cx('column-first')}>
               <div className={cx('description-variant')}>
                  <h6>
                     {variantName
                        ? variantName
                        : 'Covermax Full Coverage foundation'}
                  </h6>
                  <div className={cx('feature')}>
                     <div className={cx('item-feature')}>
                        <FontAwesomeIcon icon={faPalette} />
                        <span>{variantColor ? variantColor : 'Cream'}</span>
                     </div>
                     <div className={cx('item-feature')}>
                        <FontAwesomeIcon icon={faExpand} />
                        <span>{variantSize ? variantSize : 'Medium'}</span>
                     </div>
                  </div>
               </div>
            </div>
            <div className={cx('column-second')}>
               <div className={cx('variant-priceSale')}>
                  <div className={cx('icon')}>
                     <FontAwesomeIcon icon={faWallet} />
                  </div>
                  <span>{variantSalePrice ? variantSalePrice : '37'}</span>
               </div>
               {/* Edit Variant Items */}
               <div className={cx('button-action')}>
                  <div
                     className={cx('icon-edit-variant')}
                     onClick={() => {
                        if (
                           variantArray &&
                           setToggleModalVariantEdit &&
                           setVariantName &&
                           setSize &&
                           setColor &&
                           setProductSKU &&
                           setQuantity &&
                           setRegularPrice &&
                           setSalePrice &&
                           setImageFileArray &&
                           setImagePreviewEditArray
                        ) {
                           variantArray.forEach((variant, index) => {
                              if (variant.variantName === variantName) {
                                 setIndexVariantEdit &&
                                    setIndexVariantEdit(index);
                                 if (
                                    setSavedImageVariantPreview &&
                                    savedImageVariantArray
                                 ) {
                                    setSavedImageVariantPreview(
                                       savedImageVariantArray[index],
                                    );
                                 }
                              }
                           });

                           const variant = variantArray?.filter(
                              (variant) => variant.variantName === variantName,
                           );

                           setVariantName(variant[0].variantName as string);
                           setSize(variant[0].variantSize as string);
                           setColor(variant[0].variantColor as string);
                           setProductSKU(
                              variant[0].variantProductSKU as string,
                           );
                           setQuantity(variant[0].variantQuantity as string);
                           setRegularPrice(
                              variant[0].variantRegularPrice as string,
                           );
                           setSalePrice(variant[0].variantSalePrice as string);

                           if (
                              typeof variant[0].variantImagesFile?.[0] !==
                              'string'
                           ) {
                              setImageFileArray(
                                 variant[0].variantImagesFile as File[],
                              );

                              const imagesURL: string[] =
                                 variant[0].variantImagesFile?.flatMap(
                                    (file) => {
                                       return URL.createObjectURL(file as Blob);
                                    },
                                 ) ?? [];

                              setImagePreviewEditArray(imagesURL);
                           } else {
                              setImagePreviewEditArray([]);
                           }

                           setToggleModalVariantEdit(true);
                        }
                     }}
                  >
                     <FontAwesomeIcon className={cx('icon')} icon={faPen} />
                  </div>
                  {/* Delete Variant Items */}
                  <div
                     className={cx('icon-delete-variant')}
                     onClick={() => {
                        if (setVariantArray) {
                           setVariantArray((prevVariant) => {
                              return [...prevVariant].filter(
                                 (variant) =>
                                    variant.variantName !== variantName,
                              );
                           });
                        }
                        setIdVariantArray &&
                           setIdVariantArray((prevVariantIdArray) => [
                              ...prevVariantIdArray.filter(
                                 (id) => id !== variantId,
                              ),
                           ]);
                        setIdVariantDeletedArray &&
                           setIdVariantDeletedArray(
                              (prevIdVariantDeleteArray) => [
                                 ...prevIdVariantDeleteArray,
                                 variantId as string,
                              ],
                           );
                     }}
                  >
                     <FontAwesomeIcon className={cx('icon')} icon={faTrash} />
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}

export default VariantItems;
