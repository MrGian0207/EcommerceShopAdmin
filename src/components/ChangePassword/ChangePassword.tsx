import styles from './ChangePassword.module.scss';
import classNames from 'classnames/bind';
import { useState } from 'react';

const cx = classNames.bind(styles);

function ChangePassword(): JSX.Element {
   const [oldPassword, setOldPassword] = useState<string>('');
   const [newPassword, setNewPassword] = useState<string>('');
   const [confirmNewPassword, setConfirmNewPassword] = useState<string>('');

   const handleSubmit = async () => {
      const res = await fetch(
         'http://localhost:8000/settings/update-password',
         {
            method: 'PUT',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({
               oldPassword,
               newPassword,
               confirmNewPassword,
               id: '6626b9e07e036b53efa99caa',
            }),
         },
      );
      const resData = await res.json();
      console.log(resData);
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
