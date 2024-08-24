import { useEffect, useState } from 'react'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import api from '~/api/api'
import AuthHeader from '~/components/AuthHeader'
import { Input } from '~/components/common/Type2'
import FormAuth from '~/components/FormAuth'
import Spinner from '~/components/Spinner'
import * as Toastify from '~/services/Toastify'
import classNames from 'classnames/bind'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'

import styles from './ForgotPassword.module.scss'
import { ForgotPasswordRules } from './ForgotPasswordRules'

interface IFormValues {
  email: string
}

const cx = classNames.bind(styles)
function ForgotPassword() {
  const methods = useForm<IFormValues>()
  const [Loading, setLoading] = useState<Boolean>(false)

  useEffect(() => {
    document.title = 'Forgot Password | MrGianStore'
  }, [])

  const onSubmit: SubmitHandler<IFormValues> = async (data) => {
    setLoading(true)
    try {
      Toastify.showToastMessagePending()
      const forgotPassword = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/auth/forgot-password`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: data.email,
          }),
          credentials: 'include',
          mode: 'cors',
        }
      )

      const resData = await forgotPassword.json()

      if (forgotPassword.ok) {
        Toastify.showToastMessageSuccessfully(resData.message)
      } else {
        Toastify.showToastMessageFailure(resData.message)
      }
    } catch (error) {
      Toastify.showToast('Submitted failed', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={cx('wrapper')}>
      <AuthHeader
        welcome="Welcome to the"
        nameStore="MrGianStore"
        description="ReactJS Ecommerce script you need"
      />
      <div className={cx('content')}>
        <FormAuth
          title="Forgot your password?"
          subtitle="Please enter the email address associated with your account and We will email you a link to reset your password."
          back={'Back'}
          navigatorLink={api.login}
        >
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className={cx('formData')}>
              <Input
                iconLeft={faEnvelope}
                type="email"
                name="email"
                label="Email Address"
                rules={ForgotPasswordRules.email}
              />
              <button type="submit" className={cx('auth-button')}>
                {Loading ? <Spinner /> : 'Forgot Password'}
              </button>
            </form>
          </FormProvider>
        </FormAuth>
      </div>
    </div>
  )
}

export default ForgotPassword
