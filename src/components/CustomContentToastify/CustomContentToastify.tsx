import styles from './CustomContentToastify.module.scss';
import classNames from 'classnames/bind';
import Button from '../Button';
import { faCancel, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Toastify from '~/services/Toastify';
import { useUpdateLayout } from '~/context/UpdateLayoutContext';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '~/context/AuthContext';
import { CustomContentToastifyType } from '~/types/CustomContentToastifyType';

const cx = classNames.bind(styles);

function CustomContentToastify({
   title = 'Notifications',
   button = false,
   confirmButton,
   rejectButton,
   id = '',
   path = '',
   handleReject,
   navigate = false,
}: CustomContentToastifyType): JSX.Element {
   const navigator = useNavigate();
   const { SetUpdateLayout } = useUpdateLayout()!;
   const [deleteButtonOnclick, setDeleteButtonOnclick] = useState(false);
   const { accessToken } = useAuth()!;

   const handleConfirm = async () => {
      setDeleteButtonOnclick(true);
      Toastify.showToastMessagePending();
      try {
         await fetch(
            `${process.env.REACT_APP_BACKEND_URL}${path}/delete/${id}`,
            {
               method: 'DELETE',
               headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${accessToken}`,
               },
               body: JSON.stringify({ id }),
            },
         )
            .then((res) => {
               return res.json();
            })
            .then((data) => {
               if (data?.status === 'Success') {
                  Toastify.showToastMessageSuccessfully(data?.message);
                  SetUpdateLayout();
                  navigate && navigator(path as string);
               } else if (data?.status === 'Error') {
                  Toastify.showToastMessageFailure(data?.message);
               }
            })
            .catch((error) => {
               console.log(error);
            });
      } catch (error) {
         console.log(error);
      }
      handleReject && handleReject();
      setDeleteButtonOnclick(false);
   };

   return (
      <div className={cx('msg-container')}>
         <p className={cx('msg-title')}>{title}</p>
         <div className={cx('msg-button')}>
            {button && confirmButton && (
               <Button
                  onClick={() => {
                     !deleteButtonOnclick && handleConfirm();
                  }}
                  className={cx('msg-confirm-button')}
                  rightIcon={<FontAwesomeIcon icon={faTrash} />}
               >
                  {confirmButton}
               </Button>
            )}
            {button && rejectButton && (
               <Button
                  onClick={handleReject}
                  className={cx('msg-reject-button')}
                  rightIcon={<FontAwesomeIcon icon={faCancel} />}
               >
                  {rejectButton}
               </Button>
            )}
         </div>
      </div>
   );
}

export default CustomContentToastify;
