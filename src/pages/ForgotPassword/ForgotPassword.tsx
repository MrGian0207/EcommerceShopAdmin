import AuthHeader from '~/components/AuthHeader';
import classNames from 'classnames/bind';
import styles from './ForgotPassword.module.scss';
import * as Toastify from '~/services/Toastify';
import FormAuth from '~/components/FormAuth';
import Input from '~/components/Input';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';

import api from '~/api/api';
import Spinner from '~/components/Spinner';

const cx = classNames.bind(styles);
function ForgotPassword() {
   const [isLoading, setIsLoading] = useState<Boolean>(false);
   const [emailAddress, setEmailAddress] = useState<string | number>('');

   useEffect(() => {
      document.title = 'Forgot Password | MrGianStore';
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   const handleSubmit = async (
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
   ) => {
      e.preventDefault();
      setIsLoading(false);
      Toastify.showToastMessagePending();
      const fetchRequest = await fetch(
         `${process.env.REACT_APP_BACKEND_URL}/auth/forgot-password`,
         {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({
               email: emailAddress,
            }),
            credentials: 'include',
            mode: 'cors',
         },
      );

      const resData = await fetchRequest.json();

      if (resData) {
         setIsLoading(false);
         if (resData?.status === 'Success') {
            console.log(resData?.data);
            Toastify.showToastMessageSuccessfully(resData?.message);
         } else {
            Toastify.showToastMessageFailure(resData?.message);
         }
      } else {
         setIsLoading(false);
      }
   };

   return (
      <div className={cx('wrapper')}>
         <AuthHeader
            welcome="Welcome to the"
            nameStore="MrGianStore"
            discription="Reactjs Ecommerce script you need"
         />
         <div className={cx('content')}>
            <FormAuth
               title="Forgot your password?"
               subtitle="Please enter the email address associated with your account and We will email you a link to reset your password."
               back={'Back'}
               navigatorLink={api.login}
            >
               <Input
                  name="emailAddress"
                  value={emailAddress}
                  setValue={setEmailAddress}
                  index="Email Address"
                  label="Email Address"
                  iconLeft={faEnvelope}
                  type="email"
                  autocomplete="email"
               />
               <button
                  type="submit"
                  className={cx('auth-button')}
                  onClick={handleSubmit}
               >
                  {isLoading ? <Spinner /> : 'Forgot Password'}
               </button>
            </FormAuth>
         </div>
      </div>
   );
}

export default ForgotPassword;
