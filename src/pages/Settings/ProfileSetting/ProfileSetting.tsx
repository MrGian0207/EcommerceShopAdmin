import styles from './ProfileSetting.module.scss';
import classNames from 'classnames/bind';
import images from '~/assets/Image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { useRef } from 'react';
import * as HandleImageFile from '~/utils/HandleImageFile';
import { useState, useEffect } from 'react';
import * as Toastify from '~/services/Toastify';
import { useAuth } from '~/context/AuthContext';
import Spinner from '~/components/Spinner';

const cx = classNames.bind(styles);

function ProfileSetting() {
   const imageUploadRef = useRef<HTMLInputElement>(null);

   const [name, setName] = useState<string>('');
   const [emailAddress, setEmailAddress] = useState<string>('');
   const [phone, setPhone] = useState<string>('');
   const [gender, setGender] = useState<string>('Male');
   const [about, setAbout] = useState<string>('');

   const [imageUrl, setImageUrl] = useState('');
   const [resizedImageUrl, setResizedImageUrl] = useState<string>('');
   const [imageFile, setImageFile] = useState<File | null>(null);

   const [isLoading, setIsLoading] = useState<boolean>(false);
   const { accessToken } = useAuth()!;

   const handleSubmit = async () => {
      setIsLoading(true);
      const formData = new FormData();
      formData.append(
         'id',
         localStorage.getItem('id_user')
            ? (localStorage.getItem('id_user') as string)
            : '',
      );
      formData.append('name', name);
      formData.append('emailAddress', emailAddress);
      formData.append('phone', phone);
      formData.append('gender', gender);
      formData.append('about', about);
      formData.append('users-image', imageFile as File);

      Toastify.showToastMessagePending();
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users`, {
         method: 'PUT',
         credentials: 'include',
         headers: {
            Authorization: `Bearer ${accessToken}`,
         },
         body: formData,
      });

      const resData = await res.json();
      if (resData) {
         setIsLoading(false);
         if (resData?.status === 'Success') {
            Toastify.showToastMessageSuccessfully(resData?.message);
         }
      } else {
         setIsLoading(false);
      }
   };

   useEffect(() => {
      document.title = 'Profile Setting | MrGianStore';
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   useEffect(() => {
      const fetchData = async () => {
         const id_user: string = localStorage.getItem('id_user')
            ? (localStorage.getItem('id_user') as string)
            : '';
         try {
            const res = await fetch(
               `${process.env.REACT_APP_BACKEND_URL}/users/${id_user}`,
               {
                  method: 'GET',
                  headers: {
                     'Content-Type': 'application/json',
                     Authorization: `Bearer ${accessToken}`,
                  },
                  credentials: 'include',
               },
            );
            const resData = await res.json();
            if (resData) {
               setName(resData?.data.fullName);
               setEmailAddress(resData?.data.emailAddress);
               setPhone(resData?.data.phoneNumber);
               setGender(resData?.data.gender);
               resData?.data.about && setAbout(resData?.data.about);
               setResizedImageUrl(resData?.data.image);
            }
         } catch (error) {
            console.log(error);
         }
      };
      fetchData();
   }, [accessToken]);

   return (
      <div className={cx('ProfileSetting')}>
         {/* Update User Image */}
         <div className={cx('user-image')}>
            <div
               onClick={() => {
                  imageUploadRef.current?.click();
               }}
               className={cx('image')}
            >
               <input
                  onChange={(e) => {
                     HandleImageFile.handleFileChange(
                        e,
                        setImageFile,
                        setImageUrl,
                        setResizedImageUrl,
                        512,
                     );
                  }}
                  ref={imageUploadRef}
                  type="file"
                  hidden
               />
               <img
                  src={
                     resizedImageUrl || imageUrl
                        ? resizedImageUrl
                        : images.userDefaults
                  }
                  alt="Avatar"
               />
               <div className={cx('image-input')}>
                  <FontAwesomeIcon className={cx('icon')} icon={faCamera} />
                  <p>Update photo</p>
               </div>
            </div>
            <span>
               Allowed *.jpeg, *.jpg, *.png, *.gif
               <br />
               max size of 3145728
            </span>
         </div>

         {/* Update information user */}
         <div className={cx('user-update-info')}>
            {/* Row for userName and EmailAdress */}
            <div className={cx('row')}>
               <div className={cx('user-name')}>
                  <label className={cx('label')} htmlFor="user-name">
                     Name
                  </label>
                  <input
                     value={name}
                     onChange={(e) => {
                        setName(e.target.value);
                     }}
                     id="user-name"
                     type="text"
                  />
               </div>
               <div className={cx('user-email-address')}>
                  <label className={cx('label')} htmlFor="user-email-address">
                     Email Address
                  </label>
                  <input
                     value={emailAddress}
                     onChange={(e) => {
                        setEmailAddress(e.target.value);
                     }}
                     id="user-email-address"
                     type="email"
                     placeholder="MrGianStore@gmail.com"
                  />
               </div>
            </div>
            {/* Row for userPhone and userGender */}
            <div className={cx('row')}>
               <div className={cx('user-phone')}>
                  <label className={cx('label')} htmlFor="user-phone">
                     Phone
                  </label>
                  <input
                     value={phone}
                     onChange={(e) => {
                        setPhone(e.target.value);
                     }}
                     id="user-phone"
                     type="text"
                  />
               </div>
               <div className={cx('user-gender')}>
                  <label className={cx('label')} htmlFor="user-gender">
                     Gender
                  </label>
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
            {/* Row for user about */}
            <div className={cx('row')}>
               <div className={cx('user-about')}>
                  <label className={cx('label')} htmlFor="user-about">
                     About
                  </label>
                  <textarea
                     value={about}
                     onChange={(e) => {
                        setAbout(e.target.value);
                     }}
                     name="user-about"
                     id="user-about"
                     cols={10}
                     rows={5}
                  ></textarea>
               </div>
            </div>
            {/* Row for Submit Change */}
            <div className={cx('row')}>
               <button onClick={handleSubmit} className={cx('submitChangebtn')}>
                  {isLoading ? <Spinner /> : 'Save Changes'}
               </button>
            </div>
         </div>
      </div>
   );
}

export default ProfileSetting;
