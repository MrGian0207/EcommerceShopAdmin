import React, { memo, useEffect, useState } from 'react'
import { faEnvelope, faEye, faLock } from '@fortawesome/free-solid-svg-icons'
import api from '~/api/api'
import AuthHeader from '~/components/AuthHeader'
import Button from '~/components/Button'
import { Input } from '~/components/common/Type2'
import FormAuth from '~/components/FormAuth'
import Spinner from '~/components/Spinner'
import { useAuth } from '~/context/AuthContext'
import * as Toastify from '~/services/Toastify'
import classNames from 'classnames/bind'
import { useNavigate } from 'react-router-dom'

import styles from './Login.module.scss'

const cx = classNames.bind(styles)

function Login(): JSX.Element {
  const [Loading, setLoading] = useState<boolean>(false)
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    try {
      const formData = new FormData(e.currentTarget)
      Toastify.showToastMessagePending()
      const loginRes = await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.get('email'),
          password: formData.get('password'),
        }),
        credentials: 'include',
        mode: 'cors',
      })

      const res = await loginRes.json()

      if (loginRes.ok) {
        const { accessToken, idUser, message } = res
        localStorage.setItem('access_token', accessToken)
        localStorage.setItem('id_user', idUser)
        login(accessToken)
        navigate('/dashboard')
        Toastify.showToastMessageSuccessfully(message)
      } else {
        Toastify.showToastMessageFailure(res.message)
      }
    } catch (error) {
      Toastify.showToast('Submitted failed', 'error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    document.title = 'Login | MrGianStore'
  }, [])

  return (
    <div className={cx('wrapper')}>
      <AuthHeader
        welcome="Welcome to the"
        nameStore="MrGianStore"
        description="ReactJS Ecommerce script you need"
      />
      <div className={cx('content')}>
        <FormAuth
          title="Login"
          subtitle="Login to your account to continue"
          suggestion="Don't have an account?"
          navigator="Get started"
          navigatorLink={api.register}
        >
          <form onSubmit={handleSubmit} className={cx('formData')}>
            <Input name="email" iconLeft={faEnvelope} label="Email Address" />
            <Input
              iconLeft={faLock}
              iconRight={faEye}
              type="password"
              name="password"
              label="Password"
            />
            <div className={cx('option')}>
              <div className={cx('remember-me')}>
                <div className={cx('remember-input')}>
                  <input type="checkbox" id="remember" />
                </div>
                <label htmlFor="remember-me">Remember me</label>
              </div>
              <span className={cx('forgot-password')}>
                <Button to={api.forgetPassword} children={'Forgot Password'} />
              </span>
            </div>
            <button className={cx('auth-button')} type="submit">
              {Loading ? <Spinner /> : 'Login'}
            </button>
          </form>
        </FormAuth>
      </div>
    </div>
  )
}

export default memo(Login)
