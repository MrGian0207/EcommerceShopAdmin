import styles from './AddRole.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
   faEnvelope,
   faEye,
   faLock,
   faPhone,
   faUser,
   faUserTie,
   faVenusMars,
} from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import * as Toastify from '~/services/Toastify';
import { useAuth } from '~/context/AuthContext';
import Spinner from '~/components/Spinner';
import { propsType } from '~/types/ErrorType';
import checkError from '~/utils/InputError';
import ErrorInput from '~/components/ErrorInput';

const cx = classNames.bind(styles);

function AddRole(): JSX.Element {
   const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
   const [fullName, setFullName] = useState<string>('');
   const [gender, setGender] = useState<string>('Male');
   const [role, setRole] = useState<string>('Staff');
   const [phone, setPhone] = useState<string>('');
   const [emailAddress, setEmailAddress] = useState<string>('');
   const [password, setPassword] = useState<string>('');
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const { accessToken } = useAuth()!;

   const [Errors, setErrors] = useState<propsType>({
      emailAddressUser: '',
   });

   const [isEmailAddressUserTouched, setIsEmailAddressUserTouched] =
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

   const handleSubmit = async () => {
      if (emailAddress !== '') {
         setIsLoading(true);
         Toastify.showToastMessagePending();
         const res = await fetch(
            `${process.env.REACT_APP_BACKEND_URL}/settings`,
            {
               method: 'POST',
               headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${accessToken}`,
               },
               body: JSON.stringify({
                  fullName,
                  gender,
                  phoneNumber: phone,
                  emailAddress,
                  password,
                  role,
               }),
            },
         );
         const resData = await res.json();
         if (resData) {
            setIsLoading(false);
            if (resData?.status === 'Success') {
               Toastify.showToastMessageSuccessfully(resData?.message);
            }
         } else {
            setIsLoading(false);
         }
      } else {
         setIsEmailAddressUserTouched(true);
      }
   };

   useEffect(() => {
      document.title = 'Add Role | MrGianStore';

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   return (
      <div className={cx('add-role')}>
         <div className={cx('add-role-form')}>
            <h3>Add Role</h3>

            <div className={cx('row')}>
               <div style={{ width: '100%' }}>
                  <div className={cx('user-name')}>
                     <label className={cx('label')} htmlFor="user-name">
                        Full Name
                     </label>
                     <span className={cx('icon-left')}>
                        <FontAwesomeIcon icon={faUser} />
                     </span>
                     <input
                        value={fullName}
                        onChange={(e) => {
                           setFullName(e.target.value);
                        }}
                        id="user-name"
                        type="text"
                     />
                  </div>
               </div>
            </div>

            <div className={cx('row')}>
               <div>
                  <div className={cx('user-gender')}>
                     <label className={cx('label')} htmlFor="user-gender">
                        Gender
                     </label>
                     <span className={cx('icon-left')}>
                        <FontAwesomeIcon icon={faVenusMars} />
                     </span>
                     <select
                        value={gender}
                        onChange={(e) => {
                           setGender(e.target.value);
                        }}
                        name="user-gender"
                        id="user-gender"
                     >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                     </select>
                  </div>
               </div>
               <div>
                  <div className={cx('user-role')}>
                     <label className={cx('label')} htmlFor="user-role">
                        Role
                     </label>
                     <span className={cx('icon-left')}>
                        <FontAwesomeIcon icon={faUserTie} />
                     </span>
                     <select
                        value={role}
                        onChange={(e) => {
                           setRole(e.target.value);
                        }}
                        name="user-role"
                        id="user-role"
                     >
                        <option value="Staff">Staff</option>
                        <option value="Admin">Admin</option>
                        <option value="Manager">Manager</option>
                        <option value="Editor">Editor</option>
                     </select>
                  </div>
               </div>
            </div>

            <div className={cx('row')}>
               <div>
                  <div className={cx('user-phone')}>
                     <label className={cx('label')} htmlFor="user-phone">
                        Phone
                     </label>
                     <span className={cx('icon-left')}>
                        <FontAwesomeIcon icon={faPhone} />
                     </span>
                     <input
                        value={phone}
                        onChange={(e) => {
                           setPhone(e.target.value);
                        }}
                        id="user-phone"
                        type="text"
                     />
                  </div>
               </div>
               <div>
                  <div className={cx('user-email')}>
                     <label className={cx('label')} htmlFor="user-email">
                        Email Address
                     </label>
                     <span className={cx('icon-left')}>
                        <FontAwesomeIcon icon={faEnvelope} />
                     </span>
                     <input
                        value={emailAddress}
                        onChange={(e) => {
                           handleInputChange(
                              e,
                              setEmailAddress,
                              'emailAddressUser',
                              setIsEmailAddressUserTouched,
                           );
                        }}
                        id="user-email"
                        type="email"
                     />
                  </div>
                  {isEmailAddressUserTouched &&
                     checkError(Errors).emailAddressUser && (
                        <ErrorInput
                           nameError={
                              checkError(Errors).emailAddressUser as string
                           }
                        />
                     )}
               </div>
            </div>

            <div className={cx('row')}>
               <div style={{ width: '100%' }}>
                  <div className={cx('user-passWord')}>
                     <label className={cx('label')} htmlFor="user-passWord">
                        Passsword
                     </label>
                     <span className={cx('icon-left')}>
                        <FontAwesomeIcon icon={faLock} />
                     </span>
                     <input
                        value={password}
                        onChange={(e) => {
                           setPassword(e.target.value);
                        }}
                        id="user-passWord"
                        type={isShowPassword ? 'text' : 'password'}
                     />
                     <span
                        onClick={() => {
                           setIsShowPassword(!isShowPassword);
                        }}
                        className={cx('icon-right')}
                     >
                        <FontAwesomeIcon icon={faEye} />
                     </span>
                  </div>
               </div>
            </div>

            <div className={cx('row')}>
               <button onClick={handleSubmit} className={cx('submitChangebtn')}>
                  {isLoading ? <Spinner /> : 'Save'}
               </button>
            </div>
         </div>
      </div>
   );
}

export default AddRole;
