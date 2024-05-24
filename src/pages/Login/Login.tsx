import AuthHeader from '~/components/AuthHeader';
import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import Button from '~/components/Button';
import FormAuth from '~/components/FormAuth';
import Input from '~/components/Input';
import { faEnvelope, faEye, faLock } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '~/context/AuthContext';
import * as Toastify from '~/services/Toastify';
import api from '~/api/api';

const cx = classNames.bind(styles);

function Login(): JSX.Element {
   const [emailAddress, setEmailAddress] = useState<string | number>('');
   const [password, setPassword] = useState<string | number>('');
   const [isSubmitted, setIsSubmitted] = useState(false);
   const navigate = useNavigate();
   const { login } = useAuth()!;

   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitted(true);
   };

   useEffect(() => {
      document.title = 'Login | NextStore';

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   useEffect(() => {
      if (isSubmitted) {
         Toastify.showToastMessagePending();
         fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/login`, {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({
               emailAddress,
               password,
            }),
            credentials: 'include',
            mode: 'cors',
         })
            .then((res) => {
               setIsSubmitted(false);
               return res.json();
            })
            .then((data) => {
               const { accessToken, idUser, response } = data;
               if (accessToken && idUser && response) {
                  localStorage.setItem('access_token', accessToken);
                  localStorage.setItem('id_user', idUser);
                  login(accessToken);
                  navigate('/dashboard');
                  Toastify.showToastMessageSuccessfully(response?.message);
               } else {
                  Toastify.showToastMessageFailure(data?.message);
               }
            })
            .catch((err) => {
               console.log(err);
            });
      }
      return () => {
         setIsSubmitted(false);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [isSubmitted]);

   return (
      <div className={cx('wrapper')}>
         <AuthHeader
            welcome="Welcome to the"
            nameStore="MrGianStore"
            discription="Reactjs Ecommerce script you need"
         />
         <div className={cx('content')}>
            <FormAuth
               title="Login"
               subtitle="Login to your account to continue"
               suggestion="Don't have an account?"
               navigator="Get started"
               navigatorLink={api.register}
            >
               <form className={cx('formData')}>
                  <Input
                     name="emailAdress"
                     value={emailAddress}
                     setValue={setEmailAddress}
                     index="Email Adress"
                     label="Email Adress"
                     iconLeft={faEnvelope}
                     type={'text'}
                     autocomplete="email"
                  />
                  <Input
                     name="password"
                     value={password}
                     setValue={setPassword}
                     index="Password"
                     label="Password"
                     iconLeft={faLock}
                     iconRight={faEye}
                     type={'password'}
                     autocomplete="current-password"
                  />
                  <div className={cx('option')}>
                     <div className={cx('remember-me')}>
                        <div className={cx('remember-input')}>
                           <input type="checkbox" id="remember" />
                        </div>
                        <label htmlFor="remember-me">Remember me</label>
                     </div>
                     <span className={cx('forgot-password')}>
                        <Button
                           to={api.forgetPassword}
                           children={'Forgot Password'}
                        />
                     </span>
                  </div>
                  <button
                     className={cx('auth-button')}
                     type="submit"
                     onClick={handleSubmit}
                  >
                     Login
                  </button>
               </form>
            </FormAuth>
         </div>
      </div>
   );
}

export default memo(Login);
