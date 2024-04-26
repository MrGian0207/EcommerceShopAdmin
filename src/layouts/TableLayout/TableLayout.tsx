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
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { useUpdateLayout } from '~/context/UpdateLayoutContext';
import StatusItems from '~/components/StatusItems';
import { memo } from 'react';
import images from '~/assets/Image';

const cx = classNames.bind(styles);

type ProductType = {
   name?: string;
   title?: string;
   slug?: string;
   description?: string;
   category?: string;
   subCategory?: string;
   brand?: string;
   gender?: string;
   status?: string;
   productCode?: string;
   tag?: string;
   featureProduct?: string;
   defaultVariant?: string;
   variants?: Variant[];
};

type Variant = {
   variantName?: string;
   variantSize?: string;
   variantColor?: string;
   variantProductSKU?: string;
   variantQuantity?: string;
   variantRegularPrice?: string;
   variantSalePrice?: string;
   variantImagesFile?: string[];
   product?: ProductType;
};

type TableLayoutType = {
   headers?: string[];
   category?: boolean;
   name?: boolean;
   role?: boolean;
   user?: boolean;
   email?: boolean;
   phone?: boolean;
   joined?: boolean;
   parentCategory?: boolean;
   totalItems?: boolean;
   description?: boolean;
   createdAt?: boolean;
   status?: boolean;
   rating?: boolean;
   quantity?: boolean;
   price?: boolean;
   featured?: boolean;
   actions?: boolean;
   editButton?: boolean;
   deleteButton?: boolean;
   previewButton?: boolean;
   lockButton?: boolean;
   copyButton?: boolean;
   handleDeteleToastify?: (
      name: string,
      id: string,
      path: string,
      SetDeleteButtonOnclick?: React.Dispatch<React.SetStateAction<boolean>>,
   ) => void;
};

type DataType = {
   _id?: string;
   name?: string;
   role?: string;
   fullName?: string;
   customerName?: string;
   emailNewletter?: string;
   emailAddress?: string;
   phoneNumber?: number;
   title?: string;
   slug?: string;
   description?: string;
   image?: string;
   imageDefault?: string;
   createdAt?: string;
   status?: string;
   rating?: number;
   price?: string;
   total?: number;
   quantityProducts?: number[];
   statusDelivery?: string;
   featureProduct?: string;
   parentCategory?: string;
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
   const [variantArray, setVariantArray] = useState<Variant[]>([]);
   const [quantityArray, setQuantityArray] = useState<number[]>([]);
   const [deleteButtonOnclick, SetDeleteButtonOnclick] = useState(false);
   const { updateLayout } = useUpdateLayout()!;
   const [featureArray, setFeatureArray] = useState<featureType[]>([]);
   const [featureUpdates, setFeatureUpdates] = useState<featureType>({});

   // Lấy dữ liệu từ BE trả về, hiển thị danh sách sản phẩmm
   useEffect(() => {
      try {
         if (path) {
            fetch(`http://localhost:8000${path}`)
               .then((res) => {
                  return res.json();
               })
               .then((res) => {
                  if (res?.status === 'Success') {
                     const data: DataType[] = res?.data;
                     const features: featureType[] = [];
                     if (data) {
                        console.log(data);
                        setDataArray(data);
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
   }, [updateLayout]);

   // Cập nhật hiển thị nội dung trang
   useEffect(() => {
      try {
         if (featureArray.length && path) {
            fetch(`http://localhost:8000${path}`, {
               method: 'PUT',
               headers: {
                  'Content-Type': 'application/json',
               },
               body: JSON.stringify(featureUpdates),
            })
               .then((res) => {
                  return res.json();
               })
               .then((data) => {
                  console.log(data);
               })
               .catch((err) => {
                  console.log(err);
               });
         }
      } catch (error) {
         console.log(error);
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [featureUpdates]);

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
                     {dataArray.map((item, index) => (
                        <tr key={item._id}>
                           {/* Tên của sản phẩm và hình ảnh  */}
                           {(category || user || name) && (
                              <th>
                                 <div className={cx('name-item')}>
                                    <img
                                       alt="Accessories demo"
                                       src={
                                          item.image || item.imageDefault
                                             ? item.image || item.imageDefault
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
                           {totalItems && <td>0</td>}
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
                                 {quantityArray && quantityArray.length > 0 && (
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
                                                featureArray[index]?.feature ===
                                                'active'
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
                                             setFeatureArray((featureArray) => {
                                                featureArray.forEach(
                                                   (value, newIndex) => {
                                                      if (newIndex === index) {
                                                         featureArray[index]
                                                            .feature ===
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
                                             });
                                             setFeatureUpdates(
                                                featureArray[index],
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
                                    {editButton && (
                                       <Button
                                          to={`${path}/${item._id}`}
                                          className="edit-btn"
                                       >
                                          <FontAwesomeIcon icon={faPen} />
                                       </Button>
                                    )}
                                    {/* Xóa sản phẩm  */}
                                    {deleteButton && (
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
                                                SetDeleteButtonOnclick(true);
                                             }
                                          }}
                                          className="delete-btn"
                                       >
                                          <FontAwesomeIcon icon={faTrash} />
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
                     ))}
                  </tbody>
               </table>
            </div>
         </div>
         {/* Phân trang sản phẩm  */}
         <div className={cx('pagination')}>
            <Button className="prev-button" to={'/'}>
               <FontAwesomeIcon icon={faChevronLeft} />
            </Button>
            <Button className="page-number" to={'/'}>
               1
            </Button>
            <Button className="next-button" to={'/'}>
               <FontAwesomeIcon icon={faChevronRight} />
            </Button>
         </div>
      </>
   );
}

export default memo(TableLayout);
