import styles from './OrdersPreview.module.scss';
import classNames from 'classnames/bind';
import DefaultLayout from '~/layouts/DefaultLayout';
import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faDownload, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useState, memo, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { format } from 'date-fns';
import * as Toastify from '~/services/Toastify';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useAuth } from '~/context/AuthContext';
import { OrderType } from '~/types/OrderType';

type DataType = {
   order?: OrderType;
   imagesOfProduct?: string[];
};

const cx = classNames.bind(styles);

function OrdersPreview(): JSX.Element {
   const pdfRef = useRef<HTMLDivElement>(null);

   const downloadPdf = async () => {
      const input = pdfRef.current;
      if (pdfRef.current) {
      }
      await html2canvas(input as HTMLDivElement).then((canvas) => {
         const imgData = canvas.toDataURL('image/png');
         const pdf = new jsPDF('p', 'mm', 'a4', true);
         const pdfWidth = pdf.internal.pageSize.getWidth();
         const pdfHeight = pdf.internal.pageSize.getHeight();
         const imgWidth = canvas.width;
         const imgHeight = canvas.height;
         const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
         const imgX = (pdfWidth - imgWidth * ratio) / 2;
         const imgY = 30;
         pdf.addImage(
            imgData,
            'PNG',
            imgX,
            imgY,
            imgWidth * ratio,
            imgHeight * ratio,
         );
         pdf.save('invoice.pdf');
      });
   };

   const { accessToken } = useAuth()!;

   const location = useLocation();
   const path = location.pathname;

   const [selectedOption, setSelectedOption] = useState<string>('Loading');
   const [data, setData] = useState<DataType>({});
   const [deleteButtonOnclick, SetDeleteButtonOnclick] = useState(false);

   useEffect(() => {
      document.title = 'Preview Order | MrGianStore';

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   useEffect(() => {
      const fetchData = async () => {
         try {
            const res = await fetch(
               `${process.env.REACT_APP_BACKEND_URL}${path}`,
               {
                  headers: {
                     Authorization: `Bearer ${accessToken}`,
                  },
               },
            );
            const resData = await res.json();
            setData({ ...resData?.data });
            setSelectedOption(resData?.data?.order?.statusDelivery as string);
         } catch (error) {
            console.log(error);
         }
      };
      fetchData();
   }, [path, accessToken]);

   const handleDelete = async () => {
      if (!deleteButtonOnclick) {
         Toastify.handleDeteleToastify(
            data?.order?.customerName as string,
            data?.order?._id as string,
            '/orders',
            SetDeleteButtonOnclick,
            true,
         );
         SetDeleteButtonOnclick(true);
      }
   };

   return (
      <div className={cx('brands')}>
         <DefaultLayout
            active={'orders'}
            page={['Dashboard', 'Orders', 'Details']}
            buttons={[
               <Button onClick={downloadPdf} className="button-download">
                  <FontAwesomeIcon icon={faDownload} />
                  Download
               </Button>,
               <Button onClick={handleDelete} className="button-delete">
                  <FontAwesomeIcon icon={faTrash} />
                  Delete
               </Button>,
               <Button
                  select
                  selectedOption={selectedOption}
                  setSelectedOption={setSelectedOption}
               />,
            ]}
         >
            <div className={cx('ordersPreview')} ref={pdfRef}>
               {/* Orders Detail */}
               <div className={cx('previewDetail')}>
                  <div className={cx('content-wrapper')}>
                     {/* Title preview orders */}
                     <div className={cx('title')}>
                        <h6>Order Details</h6>
                        <p>Order ID: {data?.order?._id}</p>
                     </div>
                     {/* Card box preview orders */}
                     <div className={cx('card-box')}>
                        {/* Customer Details */}
                        <div className={cx('card-item')}>
                           <div className={cx('content-card')}>
                              <div className={cx('title-card')}>
                                 <div className={cx('icon-card')}>
                                    <FontAwesomeIcon icon={faUser} />
                                 </div>
                                 <h6>Customer Details</h6>
                              </div>
                              <div className={cx('card-information')}>
                                 <p>
                                    <strong>Name:</strong>{' '}
                                    {data?.order?.customerName}
                                 </p>
                                 <p>
                                    <strong>Phone:</strong>{' '}
                                    {data?.order?.customerPhone}
                                 </p>
                                 <p>
                                    <strong>Email:</strong>{' '}
                                    {data?.order?.customerEmail}
                                 </p>
                              </div>
                           </div>
                        </div>
                        {/* Shipping Address */}
                        <div className={cx('card-item')}>
                           <div className={cx('content-card')}>
                              <div className={cx('title-card')}>
                                 <div className={cx('icon-card')}>
                                    <FontAwesomeIcon icon={faUser} />
                                 </div>
                                 <h6>Shipping Address</h6>
                              </div>
                              <div className={cx('card-information')}>
                                 <p>
                                    <strong>Address:</strong>{' '}
                                    {data?.order?.customerAddress}
                                 </p>
                                 <p>
                                    <strong>Order Data: </strong>
                                    {data?.order?.createdAt &&
                                       format(
                                          new Date(data?.order?.createdAt),
                                          'dd MMM yyyy',
                                       )}
                                 </p>
                              </div>
                           </div>
                        </div>
                        {/* Customer Details */}
                        <div className={cx('card-item')}>
                           <div className={cx('content-card')}>
                              <div className={cx('title-card')}>
                                 <div className={cx('icon-card')}>
                                    <FontAwesomeIcon icon={faUser} />
                                 </div>
                                 <h6>Customer Details</h6>
                              </div>
                              <div className={cx('card-information')}>
                                 <p>
                                    <strong>Method: </strong>
                                    {data?.order?.methodDelivery}
                                 </p>
                                 <p>
                                    <strong>Status: </strong>
                                    {data?.order?.statusDelivery}
                                 </p>
                                 <p>
                                    <strong>Shipping Fee: </strong> US${' '}
                                    {data?.order?.shippingFee}
                                 </p>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>

               {/* Product Preview In Orders */}
               <div className={cx('previewProduct')}>
                  <h5 className={cx('product-quantity')}>
                     {data?.order?.quantityProducts &&
                        (data?.order?.quantityProducts as number[]).reduce(
                           (acc, value) => acc + value,
                        )}{' '}
                     item
                  </h5>
                  {/* Table preview product */}
                  <div className={cx('product-table')}>
                     <table className={cx('product')}>
                        <thead>
                           <tr>
                              <th>Product</th>
                              <th>Color</th>
                              <th>Quantity</th>
                              <th>Size</th>
                              <th>Price</th>
                           </tr>
                        </thead>
                        <tbody>
                           {data?.order?.products &&
                              data?.order?.products.map((product, index) => {
                                 return (
                                    <tr key={product?.name}>
                                       <td>
                                          <div className={cx('image-product')}>
                                             <img
                                                src={
                                                   data?.imagesOfProduct?.[
                                                      index
                                                   ]
                                                }
                                                alt="product"
                                             />
                                          </div>
                                       </td>
                                       <td>
                                          {data?.order?.colorProducts &&
                                             data?.order?.colorProducts[index]}
                                       </td>
                                       <td>
                                          {data?.order?.quantityProducts &&
                                             data?.order?.quantityProducts[
                                                index
                                             ]}
                                       </td>
                                       <td>
                                          {data?.order?.sizeProducts &&
                                             data?.order?.sizeProducts[index]}
                                       </td>
                                       <td>
                                          {data?.order?.priceProducts &&
                                             data?.order?.priceProducts[index]}
                                       </td>
                                    </tr>
                                 );
                              })}
                        </tbody>
                     </table>
                     {/* Table total price */}
                     <table className={cx('total')}>
                        <tbody>
                           <tr>
                              <td>
                                 <p>Subtotal</p>
                              </td>
                              <td>
                                 <p>US$ {data?.order?.subtotal}</p>
                              </td>
                           </tr>
                           <tr>
                              <td>
                                 <p>Shipping Fee</p>
                              </td>
                              <td>
                                 <p>US$ {data?.order?.shippingFee}</p>
                              </td>
                           </tr>
                           <tr>
                              <td>
                                 <p>Total</p>
                              </td>
                              <td>
                                 <p>$ {data?.order?.total}</p>
                              </td>
                           </tr>
                        </tbody>
                     </table>
                  </div>
               </div>
            </div>
         </DefaultLayout>
      </div>
   );
}

export default memo(OrdersPreview);
