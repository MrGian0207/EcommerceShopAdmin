import { useEffect, useState } from 'react'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import api from '~/api/api'
import AuthHeader from '~/components/AuthHeader'
import { Input } from '~/components/common/Type2'
import FormAuth from '~/components/FormAuth'
import Spinner from '~/components/Spinner'
import * as Toastify from '~/services/Toastify'
import classNames from 'classnames/bind'

import styles from './ForgotPassword.module.scss'

const cx = classNames.bind(styles)
function ForgotPassword() {
  const [Loading, setLoading] = useState<Boolean>(false)

  useEffect(() => {
    document.title = 'Forgot Password | MrGianStore'
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    try {
      const formData = new FormData(e.currentTarget)
      Toastify.showToastMessagePending()
      const forgotPassword = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/auth/forgot-password`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formData.get('email'),
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

    // if (emailAddress !== '') {
    //   setIsLoading(true)
    //   Toastify.showToastMessagePending()
    //   const fetchRequest = await fetch(
    //     `${process.env.REACT_APP_BACKEND_URL}/auth/forgot-password`,
    //     {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify({
    //         email: emailAddress,
    //       }),
    //       credentials: 'include',
    //       mode: 'cors',
    //     }
    //   )

    //   const resData = await fetchRequest.json()

    //   if (resData) {
    //     setIsLoading(false)
    //     if (resData?.status === 'Success') {
    //       console.log(resData?.data)
    //       Toastify.showToastMessageSuccessfully(resData?.message)
    //     } else {
    //       Toastify.showToastMessageFailure(resData?.message)
    //     }
    //   } else {
    //     setIsLoading(false)
    //   }
    // } else {
    //   alert('Please fill in email address')
    // }
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
          <form onSubmit={handleSubmit} className={cx('formData')}>
            <Input iconLeft={faEnvelope} type="email" name="email" label="Email Address" />
            <button type="submit" className={cx('auth-button')}>
              {Loading ? <Spinner /> : 'Forgot Password'}
            </button>
          </form>
        </FormAuth>
      </div>
    </div>
  )
}

export default ForgotPassword
