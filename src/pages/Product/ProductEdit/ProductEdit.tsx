import styles from './ProductEdit.module.scss';
import classNames from 'classnames/bind';
import DefaultLayout from '~/layouts/DefaultLayout';
import ActionLayout from '~/layouts/ActionLayout';
import { useRef, useState, useEffect, memo } from 'react';
import OptionSelect from '~/components/OptionSelect';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import ReactModal from 'react-modal';
import VariantItems from '~/components/VariantItems';
import VariantForm from '~/components/VariantForm';
import { useLocation } from 'react-router-dom';
import { useAuth } from '~/context/AuthContext';

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
   _id?: string;
};

function ProductEdit(): JSX.Element {
   const location = useLocation();
   const path = location.pathname;

   // Set state for input belonging to the product
   const fileInputRef = useRef<HTMLInputElement | null>(null);
   const [name, setName] = useState<string>('');
   const [metaTitle, setMetaTitle] = useState<string>('');
   const [slug, setSlug] = useState<string>('');
   const [description, setDescription] = useState<string>('');
   const [categories, setCategories] = useState('');
   const [subCategories, setSubCategories] = useState('None');
   const [brand, setBrand] = useState('');
   const [gender, setGender] = useState('None');
   const [status, setStatus] = useState('Sale');
   const [productCode, setProductCode] = useState('');
   const [tags, setTags] = useState<string[]>([]);
   const [featureProduct, setFeatureProduct] = useState('inactive');
   const [toggleModalVariant, setToggleModalVariant] = useState<boolean>(false);
   const [toggleModalVariantEdit, setToggleModalVariantEdit] =
      useState<boolean>(false);

   /// Set state for input inside the Modal Variant
   const [indexVariantEdit, setIndexVariantEdit] = useState<number>(0);
   const [variantName, setVariantName] = useState<string>('');
   const [size, setSize] = useState<string>('');
   const [color, setColor] = useState<string>('');
   const [productSKU, setProductSKU] = useState<string>('');
   const [quantity, setQuantity] = useState<string>('');
   const [regularPrice, setRegularPrice] = useState<string>('');
   const [salePrice, setSalePrice] = useState<string>('');
   const [imagePreviewArray, setImagePreviewArray] = useState<string[]>([]);
   const [imagePreviewEditwArray, setImagePreviewEditArray] = useState<
      string[]
   >([]);

   // Image have saved to show preview in variant form modal
   const [savedImageVariantArray, setSavedImageVariantArray] = useState<
      Array<string>[]
   >([]);
   const [savedImageVariantPreview, setSavedImageVariantPreview] = useState<
      string[]
   >([]);

   const [imageFileArray, setImageFileArray] = useState<File[]>([]);
   const [defaultVariant, setDefaultVariant] = useState<string>('');

   // Array of variants
   const [variantArray, setVariantArray] = useState<VariantType[]>([]);
   const [idVariantArray, setIdVariantArray] = useState<string[]>([]);
   const [idVariantDeletedArray, setIdVariantDeletedArray] = useState<string[]>(
      [],
   );

   // TODO: name for upload image with format
   const nameImageFile = 'product-variant-image';

   // TODO: name button creat product
   const nameButtonSubmit = 'Edit Product';

   // TODO: useRef to write options element inside select element
   const CategoryOptionSelectRef = useRef<HTMLSelectElement>(null);
   const SubCategoryOptionSelectRef = useRef<HTMLSelectElement>(null);
   const BrandOptionSelectRef = useRef<HTMLSelectElement>(null);
   const GenderOptionSelectRef = useRef<HTMLSelectElement>(null);
   const GenderOptionData: string[] = [
      'None',
      'Men',
      'Women',
      'Kids',
      'Others',
   ];
   const StatusOptionSelectRef = useRef<HTMLSelectElement>(null);
   const StatusOptionData: string[] = ['Sale', 'New', 'Regular', 'Disabled'];
   const TagInputRef = useRef<HTMLInputElement>(null);

   // Handle Raido Change
   const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setDefaultVariant(e.target.value);
   };

   // Handle Save Modal
   const handleSaveModal = (
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
   ) => {
      e.preventDefault();
      e.stopPropagation();
      setVariantArray((prevVariantArray) => {
         return [
            ...prevVariantArray,
            {
               variantName: variantName,
               variantSize: size,
               variantColor: color,
               variantProductSKU: productSKU,
               variantQuantity: quantity,
               variantRegularPrice: regularPrice,
               variantSalePrice: salePrice,
               variantImagesFile: imageFileArray,
            },
         ];
      });
      HandleResetValueVariantModal();
      closeModalVariant();
   };

   const handleSaveEditModal = (
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
   ) => {
      e.preventDefault();
      e.stopPropagation();

      setVariantArray((prevVariantArray) => {
         prevVariantArray.forEach((prevVariant, index) => {
            if (index === indexVariantEdit) {
               prevVariant.variantName = variantName;
               prevVariant.variantSize = size;
               prevVariant.variantColor = color;
               prevVariant.variantProductSKU = productSKU;
               prevVariant.variantQuantity = quantity;
               prevVariant.variantRegularPrice = regularPrice;
               prevVariant.variantSalePrice = salePrice;
               prevVariant.variantImagesFile = imageFileArray;
            }
         });
         return [...prevVariantArray];
      });
      closeModalVariant();
   };

   //  Handle Cancel Modal
   const handleCancelModal = (
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
   ) => {
      e.preventDefault();
      e.stopPropagation();
      closeModalVariant();
   };

   // Handle Open Modal
   const openModalVariant = () => {
      setToggleModalVariant(true);
      HandleResetValueVariantModal();
   };

   // Handle Close Modal
   const closeModalVariant = () => {
      setToggleModalVariant(false);
      setToggleModalVariantEdit(false);
   };

   // Handle reset modal value of variants
   const HandleResetValueVariantModal = () => {
      setVariantName(' ');
      setSize(' ');
      setColor(' ');
      setProductSKU(' ');
      setQuantity(' ');
      setRegularPrice(' ');
      setSalePrice(' ');
      setImagePreviewArray([]);
      setImageFileArray([]);
   };

   useEffect(() => {
      document.title = 'Edit Product | MrGianStore';

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   const { accessToken } = useAuth()!;
   // Promise All => Call Api to get Options
   useEffect(() => {
      Promise.all([
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
         ),
         fetch(
            `${process.env.REACT_APP_BACKEND_URL}/categories/sub-categories/name`,
            {
               method: 'GET',
               headers: {
                  'Content-Type': 'application/json',
                  Accept: 'application/json',
                  Authorization: `Bearer ${accessToken}`,
               },
            },
         ),
         fetch(`${process.env.REACT_APP_BACKEND_URL}/brands/name`, {
            method: 'GET',
            headers: {
               'Content-Type': 'application/json',
               Accept: 'application/json',
               Authorization: `Bearer ${accessToken}`,
            },
         }),
      ])
         .then(([mainCategoriesRes, subCategoriesRes, brandsRes]) =>
            Promise.all([
               mainCategoriesRes.json(),
               subCategoriesRes.json(),
               brandsRes.json(),
            ]),
         )
         .then(([mainCategoriesData, subCategoriesData, brandsData]) => {
            if (
               mainCategoriesData?.status === 'Success' &&
               mainCategoriesData?.data
            ) {
               const selectElement = CategoryOptionSelectRef.current;
               if (selectElement) {
                  selectElement.innerHTML = '';
                  setCategories(mainCategoriesData.data[0]);
                  mainCategoriesData.data.forEach((item: string) => {
                     const option = document.createElement('option');
                     option.value = item;
                     option.textContent = item;
                     selectElement.appendChild(option);
                  });
               }
            }

            if (
               subCategoriesData?.status === 'Success' &&
               subCategoriesData?.data
            ) {
               const selectElement = SubCategoryOptionSelectRef.current;
               if (selectElement) {
                  selectElement.innerHTML = '';
                  const option = document.createElement('option');
                  option.value = 'None';
                  option.textContent = 'None';
                  selectElement.appendChild(option);

                  subCategoriesData.data.forEach((item: string) => {
                     const option = document.createElement('option');
                     option.value = item;
                     option.textContent = item;
                     selectElement.appendChild(option);
                  });
               }
            }

            if (brandsData?.status === 'Success' && brandsData?.data) {
               const selectElement = BrandOptionSelectRef.current;
               if (selectElement) {
                  selectElement.innerHTML = '';
                  setBrand(brandsData.data[0]);
                  brandsData.data.forEach((item: string) => {
                     const option = document.createElement('option');
                     option.value = item;
                     option.textContent = item;
                     selectElement.appendChild(option);
                  });
               }
            }

            if (GenderOptionData) {
               const selectElement = GenderOptionSelectRef.current;
               if (selectElement) {
                  selectElement.innerHTML = '';
                  GenderOptionData.forEach((item: string) => {
                     const option = document.createElement('option');
                     option.value = item;
                     option.textContent = item;
                     selectElement.appendChild(option);
                  });
               }
            }

            if (StatusOptionData) {
               const selectElement = StatusOptionSelectRef.current;
               if (selectElement) {
                  selectElement.innerHTML = '';
                  StatusOptionData.forEach((item: string) => {
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
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [path, accessToken]);

   useEffect(() => {
      if (path) {
         try {
            fetch(`${process.env.REACT_APP_BACKEND_URL}${path}`, {
               headers: {
                  Authorization: `Bearer ${accessToken}`,
               },
            })
               .then((res) => {
                  return res.json();
               })
               .then((res) => {
                  if (res?.status === 'Success') {
                     const data = res?.data;
                     setName(data?.name);
                     setMetaTitle(data?.title);
                     setTags((data?.tag).split(' '));
                     setProductCode(data?.productCode);
                     setSlug(data?.slug);
                     setDescription(data?.description);
                     setCategories(data?.category);
                     setSubCategories(data?.subCategory);
                     setGender(data?.gender);
                     setBrand(data?.brand);
                     setStatus(data?.status);
                     setFeatureProduct(data?.featureProduct);
                     setDefaultVariant(data?.defaultVariant);
                     (data?.variants as VariantType[]).forEach((variant) => {
                        setIdVariantArray((idVariantArray) => [
                           ...idVariantArray,
                           variant._id as string,
                        ]);
                        setSavedImageVariantArray((prevSavedImageVariant) => {
                           return [
                              ...prevSavedImageVariant,
                              variant.variantImagesFile as [],
                           ];
                        });
                        setVariantArray((prevVariantArray) => {
                           return [
                              ...prevVariantArray,
                              {
                                 variantName: variant.variantName,
                                 variantSize: variant.variantSize,
                                 variantColor: variant.variantColor,
                                 variantProductSKU: variant.variantProductSKU,
                                 variantQuantity: variant.variantQuantity,
                                 variantRegularPrice:
                                    variant.variantRegularPrice,
                                 variantSalePrice: variant.variantSalePrice,
                                 variantImagesFile: [],
                              },
                           ];
                        });
                     });
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
            active={'product'}
            page={['Dashboard', 'Product', 'Edit']}
         >
            <ActionLayout
               // Left Column
               leftColumn={
                  <>
                     {/* TODO: Input product name */}
                     <div className={cx('product-name')}>
                        <label htmlFor="product-name">Product Name</label>
                        <input
                           name="product-name"
                           id="product-name"
                           type="text"
                           onChange={(e) => setName(e.target.value)}
                           value={name}
                        />
                     </div>
                     {/* TODO: Input product title */}
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
                     {/* TODO: Input product Categories and Sub Categories*/}
                     <div className={cx('row')}>
                        <OptionSelect
                           dataOptions={categories}
                           setDataOptions={setCategories}
                           labelName="Category"
                           ref={CategoryOptionSelectRef}
                        />
                        <OptionSelect
                           dataOptions={subCategories}
                           setDataOptions={setSubCategories}
                           labelName="Sub Category"
                           ref={SubCategoryOptionSelectRef}
                        />
                     </div>
                     {/* TODO: Input product Brand and Gender*/}
                     <div className={cx('row')}>
                        <OptionSelect
                           dataOptions={brand}
                           setDataOptions={setBrand}
                           labelName="Brand"
                           ref={BrandOptionSelectRef}
                        />
                        <OptionSelect
                           dataOptions={gender}
                           setDataOptions={setGender}
                           labelName="Gender"
                           ref={GenderOptionSelectRef}
                        />
                     </div>
                     {/* TODO: Input product Status and Product Code*/}
                     <div className={cx('row')}>
                        <OptionSelect
                           dataOptions={status}
                           setDataOptions={setStatus}
                           labelName="Status"
                           ref={StatusOptionSelectRef}
                        />
                        <div className={cx('product-code')}>
                           <label htmlFor="tag">Product Code</label>
                           <input
                              name="product-code"
                              id="product-code"
                              type="text"
                              onChange={(e) => setProductCode(e.target.value)}
                              value={productCode}
                           />
                        </div>
                     </div>
                     {/* TODO: Input product Tag*/}
                     <div className={cx('tag')}>
                        <label htmlFor="tag">Tags</label>
                        <div className={cx('tag-input-box')}>
                           {tags.length > 0 && (
                              <ul className={cx('show-tagName')}>
                                 {tags.map((tag, index) => (
                                    <li key={`${tag}-${index}`}>
                                       <p>{tag}</p>
                                       <button
                                          onClick={(e) => {
                                             e.preventDefault();
                                             setTags((prevTags: string[]) => {
                                                const index =
                                                   prevTags.indexOf(tag);
                                                if (index !== -1) {
                                                   const newTags = [
                                                      ...prevTags,
                                                   ];
                                                   newTags.splice(index, 1);
                                                   return newTags;
                                                }
                                                return prevTags;
                                             });
                                          }}
                                          className={cx('delete-tag')}
                                       >
                                          <FontAwesomeIcon
                                             icon={faCircleXmark}
                                          />
                                       </button>
                                    </li>
                                 ))}
                              </ul>
                           )}
                           <input
                              ref={TagInputRef}
                              id="tag"
                              type="text"
                              onKeyDown={(e) => {
                                 if (e.key === 'Enter') {
                                    e.preventDefault();
                                    const inputElement =
                                       e.target as HTMLInputElement;
                                    const newTag = inputElement.value.trim();
                                    if (newTag !== '') {
                                       setTags((prevTags: string[]) => {
                                          return [...prevTags, newTag];
                                       });
                                       inputElement.value = '';
                                    }
                                 }
                              }}
                           />

                           {tags.length > 0 && (
                              <div
                                 className={cx('clear-all-tags')}
                                 onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    setTags([]);
                                    TagInputRef.current &&
                                       (TagInputRef.current.value = '');
                                 }}
                              >
                                 <FontAwesomeIcon icon={faCircleXmark} />
                              </div>
                           )}
                        </div>
                     </div>
                  </>
               }
               rightColumn={
                  // Right Column
                  <>
                     <div className={cx('right-column')}>
                        {/* TODO: Input product Slug*/}
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
                        {/* TODO: Input product Description*/}
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
                        {/* TODO: Input product Feature*/}
                        <div className={cx('feature-product')}>
                           <div className={cx('toggle-box')}>
                              <input
                                 onChange={(e) => {
                                    e.target.checked === true
                                       ? setFeatureProduct('active')
                                       : setFeatureProduct('inactive');
                                 }}
                                 checked={
                                    featureProduct === 'active' ? true : false
                                 }
                                 type="checkbox"
                                 id="toggle"
                              />
                              <label
                                 htmlFor="toggle"
                                 className={cx('toggle-switch')}
                              ></label>
                           </div>
                           <label>Feature Product</label>
                        </div>
                        {/* TODO: Show product Variant*/}
                        <div className={cx('variant-box')}>
                           {variantArray && (
                              <h3 className={cx('variant-label')}>Variants</h3>
                           )}
                           {variantArray &&
                              variantArray.map((variant, variantIndex) => (
                                 <div
                                    key={`${variant.variantName}-${variantIndex}`}
                                 >
                                    <VariantItems
                                       variantName={variant.variantName}
                                       variantColor={variant.variantColor}
                                       variantSize={variant.variantSize}
                                       variantSalePrice={
                                          variant.variantSalePrice
                                       }
                                       handleRadioChange={handleRadioChange}
                                       defaultVariant={defaultVariant}
                                       variantArray={variantArray}
                                       setVariantArray={setVariantArray}
                                       setIndexVariantEdit={setIndexVariantEdit}
                                       setVariantName={setVariantName}
                                       setSize={setSize}
                                       setColor={setColor}
                                       setProductSKU={setProductSKU}
                                       setQuantity={setQuantity}
                                       setRegularPrice={setRegularPrice}
                                       setSalePrice={setSalePrice}
                                       setImageFileArray={setImageFileArray}
                                       setSavedImageVariantPreview={
                                          setSavedImageVariantPreview
                                       }
                                       setToggleModalVariantEdit={
                                          setToggleModalVariantEdit
                                       }
                                       savedImageVariantArray={
                                          savedImageVariantArray
                                       }
                                       setImagePreviewEditArray={
                                          setImagePreviewEditArray
                                       }
                                       variantId={
                                          idVariantArray[variantIndex] as string
                                       }
                                       setIdVariantArray={setIdVariantArray}
                                       setIdVariantDeletedArray={
                                          setIdVariantDeletedArray
                                       }
                                    />
                                 </div>
                              ))}
                        </div>
                        {/* Button to Add Variant */}
                        <button
                           className={cx('button')}
                           onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              openModalVariant();
                           }}
                        >
                           Add Variant
                        </button>
                        {/* Variant Modal for Set variants element  */}
                        <ReactModal
                           isOpen={toggleModalVariant}
                           onRequestClose={() => {
                              closeModalVariant();
                           }}
                           ariaHideApp={false}
                           className={cx('custom-modal')}
                           overlayClassName={cx('overlay-custom')}
                           bodyOpenClassName={cx('body-open-custom')}
                        >
                           {/* Form Variant Modal */}
                           <VariantForm
                              nameForm="Variants"
                              setVariantName={setVariantName}
                              setSize={setSize}
                              setColor={setColor}
                              setProductSKU={setProductSKU}
                              setQuantity={setQuantity}
                              setRegularPrice={setRegularPrice}
                              setSalePrice={setSalePrice}
                              setImageFileArray={setImageFileArray}
                              setImagePreviewArray={setImagePreviewArray}
                              handleCancelModal={handleCancelModal}
                              handleSaveModal={handleSaveModal}
                              imagePreviewArray={imagePreviewArray}
                              fileInputRef={fileInputRef}
                           />
                        </ReactModal>
                        {/* Variant Modal for Edit variants element  */}
                        <ReactModal
                           isOpen={toggleModalVariantEdit}
                           onRequestClose={() => {
                              closeModalVariant();
                           }}
                           ariaHideApp={false}
                           className={cx('custom-modal')}
                           overlayClassName={cx('overlay-custom')}
                           bodyOpenClassName={cx('body-open-custom')}
                        >
                           {/* Form Variant Modal */}
                           <VariantForm
                              nameForm="Variants Edit"
                              setVariantName={setVariantName}
                              setSize={setSize}
                              setColor={setColor}
                              setProductSKU={setProductSKU}
                              setQuantity={setQuantity}
                              setRegularPrice={setRegularPrice}
                              setSalePrice={setSalePrice}
                              setImageFileArray={setImageFileArray}
                              setImagePreviewArray={setImagePreviewEditArray}
                              handleCancelModal={handleCancelModal}
                              handleSaveModal={handleSaveEditModal}
                              imagePreviewArray={imagePreviewEditwArray}
                              savedImageVariant={savedImageVariantPreview}
                              setSavedImageVariant={setSavedImageVariantPreview}
                              variantArray={variantArray}
                              indexVariantEdit={indexVariantEdit}
                              fileInputRef={fileInputRef}
                           />
                        </ReactModal>
                     </div>
                  </>
               }
               name={name}
               metaTitle={metaTitle}
               slug={slug}
               description={description}
               NameImageFile={nameImageFile}
               nameButtonSubmit={nameButtonSubmit}
               Categories={categories}
               SubCategories={subCategories}
               Brand={brand}
               Gender={gender}
               Status={status}
               ProductCode={productCode}
               Tag={tags}
               FeatureProduct={featureProduct}
               DefaultVariant={defaultVariant}
               VariantArray={variantArray}
               idVariantArray={idVariantArray}
               idVariantDeletedArray={idVariantDeletedArray}
            />
         </DefaultLayout>
      </div>
   );
}

export default memo(ProductEdit);
