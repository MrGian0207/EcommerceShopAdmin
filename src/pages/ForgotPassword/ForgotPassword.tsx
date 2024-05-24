import AuthHeader from '~/components/AuthHeader';
import classNames from 'classnames/bind';
import styles from './ForgotPassword.module.scss';

import FormAuth from '~/components/FormAuth';
import Input from '~/components/Input';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';

import api from '~/api/api';

const cx = classNames.bind(styles);
function ForgotPassword() {
   useEffect(() => {
      document.title = 'Forgot Password | NextStore';

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

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
                  name="emailAdress"
                  index="Email Address"
                  label="Email Address"
                  iconLeft={faEnvelope}
                  type={'text'}
               />
               <button type="submit" className={cx('auth-button')}>
                  Forgot Password
               </button>
            </FormAuth>
         </div>
      </div>
   );
}

export default ForgotPassword;
