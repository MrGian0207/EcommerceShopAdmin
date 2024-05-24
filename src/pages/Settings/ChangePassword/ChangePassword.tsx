import styles from './ChangePassword.module.scss';
import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import * as Toastify from '~/services/Toastify';
import { useAuth } from '~/context/AuthContext';

const cx = classNames.bind(styles);

function ChangePassword(): JSX.Element {
   const [oldPassword, setOldPassword] = useState<string>('');
   const [newPassword, setNewPassword] = useState<string>('');
   const [confirmNewPassword, setConfirmNewPassword] = useState<string>('');
   const { accessToken } = useAuth()!;

   useEffect(() => {
      document.title = 'Change Password | MrGianStore';

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   const handleSubmit = async () => {
      const id_user: string = (await localStorage.getItem('id_user'))
         ? (localStorage.getItem('id_user') as string)
         : '';
      Toastify.showToastMessagePending();
      const res = await fetch(
         `${process.env.REACT_APP_BACKEND_URL}/settings/update-password`,
         {
            method: 'PUT',
            headers: {
               'Content-Type': 'application/json',
               Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
               oldPassword,
               newPassword,
               confirmNewPassword,
               id: id_user,
            }),
         },
      );
      const resData = await res.json();
      if (resData) {
         if (resData?.status === 'Success') {
            Toastify.showToastMessageSuccessfully(resData.message);
         }
      }
   };

   return (
      <div className={cx('change-password')}>
         <div className={cx('change-passord-form')}>
            <div className={cx('user-old-password')}>
               <label className={cx('label')} htmlFor="user-old-password">
                  Old Password
               </label>
               <input
                  value={oldPassword}
                  onChange={(e) => {
                     setOldPassword(e.target.value);
                  }}
                  id="user-old-password"
                  type="password"
               />
            </div>
            <div className={cx('user-new-password')}>
               <label className={cx('label')} htmlFor="user-new-password">
                  New Password
               </label>
               <input
                  value={newPassword}
                  onChange={(e) => {
                     setNewPassword(e.target.value);
                  }}
                  id="user-new-password"
                  type="password"
               />
            </div>
            <div className={cx('user-confirm-new-password')}>
               <label
                  className={cx('label')}
                  htmlFor="user-confirm-new-password"
               >
                  Confirm New Password
               </label>

               <input
                  value={confirmNewPassword}
                  onChange={(e) => {
                     setConfirmNewPassword(e.target.value);
                  }}
                  id="user-confirm-new-password"
                  type="password"
               />
            </div>
            <button onClick={handleSubmit} className={cx('submitChangebtn')}>
               Save changes
            </button>
         </div>
      </div>
   );
}

export default ChangePassword;
