import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../../components/Button';
import styles from './TableLayout.module.scss';
import classNames from 'classnames/bind';
import {
   faChevronLeft,
   faChevronRight,
   faCopy,
   faEye,
   faLock,
   faPen,
   faStar,
   faTrash,
} from '@fortawesome/free-solid-svg-icons';
import images from '~/assets/Image';
import StatusItems from '~/components/StatusItems';
import * as Toastify from '~/services/Toastify';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { useUpdateLayout } from '~/context/UpdateLayoutContext';
import { memo } from 'react';
import { useAuth } from '~/context/AuthContext';
import { useSearchParams } from 'react-router-dom';
import { useSearch } from '~/context/SearchContext';
import { useUser } from '~/context/UserContext';
import RowTableSkeleton from '~/components/RowTableSkeleton';
import { TableLayoutType } from '~/types/LayoutType';
import { VariantType } from '~/types/VariantType';
import { DataType } from '~/types/DataType';

const cx = classNames.bind(styles);

type TotalProductArrayType = {
   name: string;
   total: number;
};

type featureType = {
   _id?: string;
   feature?: string;
};

function TableLayout({
   headers,
   category = false,
   name = false,
   role = false,
   user = false,
   email = false,
   phone = false,
   joined = false,
   parentCategory = false,
   totalItems = false,
   description = false,
   status = false,
   rating = false,
   quantity = false,
   price = false,
   featured = false,
   createdAt = false,
   actions = false,
   editButton = false,
   deleteButton = false,
   previewButton = false,
   lockButton = false,
   copyButton = false,
   handleDeteleToastify,
}: TableLayoutType): JSX.Element {
   const location = useLocation();
   const path = location.pathname;

   const [dataArray, setDataArray] = useState<DataType[]>([]);
   const [totalProductArray, setTotalProductArray] = useState<
      TotalProductArrayType[]
   >([]);
   const [variantArray, setVariantArray] = useState<VariantType[]>([]);
   const [quantityArray, setQuantityArray] = useState<number[]>([]);
   const [deleteButtonOnclick, SetDeleteButtonOnclick] = useState(false);
   const { updateLayout } = useUpdateLayout()!;
   const [featureArray, setFeatureArray] = useState<featureType[]>([]);
   const { accessToken } = useAuth()!;
   const [page, setPage] = useState<number>(1);
   const [numbersPage, setNumbersPage] = useState<number[]>([1]);
   const [searchParams, setSearchParams] = useSearchParams({ page: '1' });
   const [isLoading, setIsLoading] = useState<boolean>(true);

   const { dataUser } = useUser()!;
   const { debouncedSearchText } = useSearch()!;

   // Lấy dữ liệu từ BE trả về, hiển thị danh sách sản phẩmm
   useEffect(() => {
      try {
         if (path) {
            fetch(
               `${
                  process.env.REACT_APP_BACKEND_URL
               }${path}?page=${searchParams.get(
                  'page',
               )}&search=${debouncedSearchText}`,
               {
                  method: 'GET',
                  headers: {
                     Authorization: `Bearer ${accessToken}`,
                  },
               },
            )
               .then((res) => {
                  return res.json();
               })
               .then((res) => {
                  setIsLoading(false);
                  if (res?.status === 'Success') {
                     const data: DataType[] = res?.data;
                     const features: featureType[] = [];
                     if (data) {
                        setDataArray(data);
                     }

                     if (res?.products) {
                        setTotalProductArray(res?.products);
                     }

                     if (res?.numbers) {
                        setNumbersPage((_) => {
                           const arrIndex: number[] = [];
                           for (let i = 1; i <= res?.numbers; i++) {
                              arrIndex.push(i);
                           }
                           return arrIndex;
                        });
                     }
                     if (res?.variants) {
                        setVariantArray(res?.variants);
                     }
                     if (res?.quantity) {
                        setQuantityArray(res?.quantity);
                     }
                     data.forEach((value, index) => {
                        if (value?.featureProduct) {
                           const _id = value?._id;
                           const active = value?.featureProduct;
                           features[index] = {
                              _id: _id,
                              feature: active,
                           };
                        }
                     });

                     if (features.length > 0) {
                        setFeatureArray(features);
                     }
                  }
               });
         }
      } catch (err) {
         console.log(err);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [updateLayout, accessToken, page, debouncedSearchText]);

   // Cập nhật hiển thị nội dung trang
   const handleSetFeaturedProduct = async (featureUpdates: featureType) => {
      if (featureArray.length && path) {
         Toastify.showToastMessagePending();
         await fetch(`${process.env.REACT_APP_BACKEND_URL}${path}`, {
            method: 'PUT',
            headers: {
               'Content-Type': 'application/json',
               Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify(featureUpdates),
         })
            .then((res) => {
               return res.json();
            })
            .then((data) => {
               if (data?.status === 'Success') {
                  Toastify.showToastMessageSuccessfully(data?.message);
               } else {
                  Toastify.showToastMessageFailure(data?.message);
               }
            })
            .catch((err) => {
               console.log(err);
            });
      }
   };

   return (
      <>
         <div className={cx('table-layout')}>
            <div className={cx('table-container')}>
               <table className={cx('table')}>
                  {/* Các tiêu để của một table sản phẩm  */}
                  <thead>
                     <tr>
                        {headers &&
                           headers.map((header) => {
                              return <th key={header}>{header}</th>;
                           })}
                     </tr>
                  </thead>
                  <tbody>
                     {isLoading === false ? (
                        dataArray.map((item, index) => (
                           <tr key={item._id}>
                              {/* Tên của sản phẩm và hình ảnh  */}
                              {(category || user || name) && (
                                 <th>
                                    <div className={cx('name-item')}>
                                       <img
                                          alt="Accessories demo"
                                          src={
                                             item.image || item.imageDefault
                                                ? item.image ||
                                                  item.imageDefault
                                                : variantArray[index]
                                                     ?.variantImagesFile?.[0] ||
                                                  images.userDefaults
                                          }
                                       />
                                       <h4>
                                          {item.name || item.fullName
                                             ? item.name || item.fullName
                                             : item.customerName}
                                       </h4>
                                    </div>
                                 </th>
                              )}
                              {email && (
                                 <td className={cx('email')}>
                                    {item.emailAddress || item.emailNewletter}
                                 </td>
                              )}
                              {phone && <td>0{item.phoneNumber}</td>}
                              {role && <td>{item?.role ? item?.role : ''}</td>}
                              {/* Thành phần cha liên quan của sản phẩm */}
                              {parentCategory && <td>{item.parentCategory}</td>}
                              {/* Tổng số lượng sản phẩm */}
                              {totalItems && totalProductArray && (
                                 <td>{totalProductArray[index]?.total}</td>
                              )}
                              {/* Mô tả của sản phẩm */}
                              {description && (
                                 <td>
                                    <div className={cx('description')}>
                                       {item.description}
                                    </div>
                                 </td>
                              )}
                              {/* Thời gian tạo ra dữ liệu về sản phẩm */}
                              {createdAt && (
                                 <td className={cx('created-at')}>
                                    {format(
                                       new Date(item.createdAt as string),
                                       'dd MMM yyyy',
                                    )}
                                 </td>
                              )}
                              {/* Trạng thái của sản phẩm / users */}
                              {status && (
                                 <td className={cx('status')}>
                                    {quantityArray &&
                                       quantityArray.length > 0 && (
                                          <StatusItems
                                             quantity={quantityArray[index]}
                                          />
                                       )}
                                    {item?.statusDelivery && (
                                       <StatusItems
                                          statusDelivery={item?.statusDelivery}
                                       />
                                    )}
                                    {item?.status && user && (
                                       <StatusItems statusUser={item?.status} />
                                    )}
                                 </td>
                              )}
                              {/* Thời gian users tạo tài khoản */}
                              {joined && (
                                 <td className={cx('created-at')}>
                                    {format(
                                       new Date(item.createdAt as string),
                                       'dd MMM yyyy',
                                    )}
                                 </td>
                              )}
                              {/* Đánh giá về sản phẩm  */}
                              {rating && (
                                 <td>
                                    <div className={cx('rating')}>
                                       <FontAwesomeIcon icon={faStar} />
                                       <FontAwesomeIcon icon={faStar} />
                                       <FontAwesomeIcon icon={faStar} />
                                       <FontAwesomeIcon icon={faStar} />
                                       <FontAwesomeIcon icon={faStar} />
                                    </div>
                                 </td>
                              )}
                              {/* Giá của sản phẩm  */}
                              {price && (
                                 <td className={cx('price')}>
                                    {item.price || item.total
                                       ? `$${item.price || item.total}`
                                       : `$${variantArray[index]?.variantRegularPrice}`}
                                 </td>
                              )}
                              {/* Số lượng của sản phẩm */}
                              {quantity && (
                                 <td>
                                    <p className={cx('quantity')}>
                                       {item.quantityProducts &&
                                          `${item.quantityProducts.reduce(
                                             (acc, item) => acc + item,
                                          )}`}
                                    </p>
                                 </td>
                              )}
                              {/* Hiển thị sản phẩm hay là không trên trang bán hàng */}
                              {featured && (
                                 <td>
                                    <div className={cx('feature-product')}>
                                       <div className={cx('toggle-box')}>
                                          <input
                                             onChange={(e) => {
                                                e.target.checked =
                                                   featureArray[index]
                                                      ?.feature === 'active'
                                                      ? true
                                                      : false;
                                             }}
                                             checked={
                                                featureArray[index]?.feature ===
                                                'active'
                                                   ? true
                                                   : false
                                             }
                                             type="checkbox"
                                             id={`toggle-${index}`}
                                          />
                                          <label
                                             onClick={(e) => {
                                                e.preventDefault();
                                                handleSetFeaturedProduct(
                                                   featureArray[index]
                                                      ?.feature === 'active'
                                                      ? {
                                                           _id: featureArray[
                                                              index
                                                           ]._id,
                                                           feature: 'inactive',
                                                        }
                                                      : {
                                                           _id: featureArray[
                                                              index
                                                           ]._id,
                                                           feature: 'active',
                                                        },
                                                );
                                                setFeatureArray(
                                                   (featureArray) => {
                                                      featureArray.forEach(
                                                         (_, newIndex) => {
                                                            if (
                                                               newIndex ===
                                                               index
                                                            ) {
                                                               featureArray[
                                                                  index
                                                               ].feature ===
                                                               'active'
                                                                  ? (featureArray[
                                                                       newIndex
                                                                    ].feature =
                                                                       'inactive')
                                                                  : (featureArray[
                                                                       newIndex
                                                                    ].feature =
                                                                       'active');
                                                            }
                                                         },
                                                      );
                                                      return [...featureArray];
                                                   },
                                                );
                                             }}
                                             htmlFor={`toggle-${index}`}
                                             className={cx('toggle-switch')}
                                          ></label>
                                       </div>
                                    </div>
                                 </td>
                              )}
                              {/* Các hành động Chỉnh Sửa, Xóa hay Xem Sản Phẩm */}
                              {actions && (
                                 <td>
                                    <div className={cx('actions')}>
                                       {/* Xem sản phẩm */}
                                       {previewButton && (
                                          <Button
                                             to={`${path}/${item._id}`}
                                             className="preview-btn"
                                          >
                                             <FontAwesomeIcon icon={faEye} />
                                          </Button>
                                       )}
                                       {/* Chỉnh sửa sản phẩm  */}
                                       {editButton &&
                                          (dataUser.role as string) !==
                                             'Staff' && (
                                             <Button
                                                to={`${path}/${item._id}`}
                                                className="edit-btn"
                                             >
                                                <FontAwesomeIcon icon={faPen} />
                                             </Button>
                                          )}
                                       {/* Xóa sản phẩm  */}
                                       {deleteButton &&
                                          (dataUser.role as string) !==
                                             'Staff' &&
                                          (dataUser.role as string) !==
                                             'Editor' && (
                                             <Button
                                                onClick={() => {
                                                   if (
                                                      !deleteButtonOnclick &&
                                                      handleDeteleToastify
                                                   ) {
                                                      handleDeteleToastify(
                                                         item?.name as string,
                                                         item?._id as string,
                                                         path,
                                                         SetDeleteButtonOnclick,
                                                      );
                                                      SetDeleteButtonOnclick(
                                                         true,
                                                      );
                                                   }
                                                }}
                                                className="delete-btn"
                                             >
                                                <FontAwesomeIcon
                                                   icon={faTrash}
                                                />
                                             </Button>
                                          )}
                                       {/* Copy email Newletter */}
                                       {copyButton && (
                                          <Button
                                             onClick={() => {
                                                if (item?.emailNewletter) {
                                                   navigator.clipboard.writeText(
                                                      item?.emailNewletter as string,
                                                   );
                                                }
                                             }}
                                             className="copy-btn"
                                          >
                                             <FontAwesomeIcon icon={faCopy} />
                                          </Button>
                                       )}
                                       {lockButton && (
                                          <Button className="lock-btn">
                                             <FontAwesomeIcon icon={faLock} />
                                          </Button>
                                       )}
                                    </div>
                                 </td>
                              )}
                           </tr>
                        ))
                     ) : (
                        <RowTableSkeleton
                           numberOfcolumn={headers?.length as number}
                        />
                     )}
                  </tbody>
               </table>
            </div>
         </div>
         {/* Phân trang sản phẩm  */}
         <div className={cx('pagination')}>
            <button
               onClick={() => {
                  if (page !== 1) {
                     setPage(page - 1);
                     setSearchParams({ page: `${page - 1}` });
                  }
               }}
               className={cx('prev-button')}
            >
               {page === 1 ? (
                  <FontAwesomeIcon
                     className={cx('icon', 'blur')}
                     icon={faChevronLeft}
                  />
               ) : (
                  <FontAwesomeIcon
                     className={cx('icon')}
                     icon={faChevronLeft}
                  />
               )}
            </button>
            {numbersPage.map((number) =>
               page === number ? (
                  <button
                     key={`page-${number}`}
                     className={cx('page-number', 'active')}
                     onClick={() => {
                        setPage(number);
                        setSearchParams({ page: `${number}` });
                     }}
                  >
                     {number}
                  </button>
               ) : (
                  <button
                     key={`page-${number}`}
                     className={cx('page-number')}
                     onClick={() => {
                        setPage(number);
                        setSearchParams({ page: `${number}` });
                     }}
                  >
                     {number}
                  </button>
               ),
            )}
            <button
               onClick={() => {
                  if (page !== numbersPage?.length) {
                     setPage(page + 1);
                     setSearchParams({ page: `${page + 1}` });
                  }
               }}
               className={cx('next-button')}
            >
               {page === numbersPage?.length ? (
                  <FontAwesomeIcon
                     className={cx('icon', 'blur')}
                     icon={faChevronRight}
                  />
               ) : (
                  <FontAwesomeIcon
                     className={cx('icon')}
                     icon={faChevronRight}
                  />
               )}
            </button>
         </div>
      </>
   );
}

export default memo(TableLayout);
