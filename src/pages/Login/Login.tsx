import process from 'process'

import { memo, useEffect, useState } from 'react'

import { faEnvelope, faEye, faLock } from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import AuthHeader from '~/components/AuthHeader'
import Button from '~/components/common/Button'
import { Input } from '~/components/common/Type2'
import FormAuth from '~/components/FormAuth'
import Spinner from '~/components/Spinner'

import styles from './Login.module.scss'
import { LoginRules } from './LoginRules'

import api from '~/api/api'
import { useAuth } from '~/context/AuthContext'
import * as Toastify from '~/services/Toastify'
import { IFormValues } from '~/types/FormValuesType'

const cx = classNames.bind(styles)

function Login() {
  const methods = useForm<IFormValues>()
  const [loading, setLoading] = useState<boolean>(false)
  const navigate = useNavigate()
  const { setAccessToken } = useAuth()

  const onSubmit: SubmitHandler<IFormValues> = async (data) => {
    setLoading(true)
    try {
      Toastify.showToastMessagePending()
      const loginRes = await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
        credentials: 'include',
        mode: 'cors',
      })

      const res = await loginRes.json()

      if (loginRes.ok) {
        const { accessToken, idUser, message } = res
        localStorage.setItem('access_token', accessToken)
        localStorage.setItem('id_user', idUser)
        setAccessToken(accessToken)
        navigate('/dashboard')
        Toastify.showToastMessageSuccessfully(message)
      } else {
        Toastify.showToastMessageFailure(res.message)
      }
    } catch (error) {
      console.log(error)
      Toastify.showToastMessageFailure('Submitted failed')
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
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className={cx('formData')}>
              <Input
                name="email"
                type="email"
                iconLeft={faEnvelope}
                label="Email Address"
                rules={LoginRules.email}
              />
              <Input
                iconLeft={faLock}
                iconRight={faEye}
                type="password"
                name="password"
                label="Password"
                rules={LoginRules.password}
              />
              <div className={cx('option')}>
                <div className={cx('remember-me')}>
                  <div className={cx('remember-input')}>
                    <input type="checkbox" id="remember" />
                  </div>
                  <label htmlFor="remember-me">Remember me</label>
                </div>
                <span className={cx('forgot-password')}>
                  <Button to={api.forgetPassword}>Forgot Password</Button>
                </span>
              </div>
              <button disabled={loading} className={cx('auth-button')} type="submit">
                {loading ? <Spinner /> : 'Login'}
              </button>
            </form>
          </FormProvider>
        </FormAuth>
      </div>
    </div>
  )
}

export default memo(Login)
