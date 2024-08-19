import { useEffect, useState } from 'react'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import api from '~/api/api'
import AuthHeader from '~/components/AuthHeader'
import FormAuth from '~/components/FormAuth'
import Input from '~/components/Input'
import Spinner from '~/components/Spinner'
import * as Toastify from '~/services/Toastify'
import classNames from 'classnames/bind'

import styles from './ForgotPassword.module.scss'

const cx = classNames.bind(styles)
function ForgotPassword() {
  const [isLoading, setIsLoading] = useState<Boolean>(false)
  const [emailAddress, setEmailAddress] = useState<string | number>('')

  useEffect(() => {
    document.title = 'Forgot Password | MrGianStore'
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()

    if (emailAddress !== '') {
      setIsLoading(true)
      Toastify.showToastMessagePending()
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
        }
      )

      const resData = await fetchRequest.json()

      if (resData) {
        setIsLoading(false)
        if (resData?.status === 'Success') {
          console.log(resData?.data)
          Toastify.showToastMessageSuccessfully(resData?.message)
        } else {
          Toastify.showToastMessageFailure(resData?.message)
        }
      } else {
        setIsLoading(false)
      }
    } else {
      alert('Please fill in email address')
    }
  }

  return (
    <div className={cx('wrapper')}>
      <AuthHeader
        welcome="Welcome to the"
        nameStore="MrGianStore"
        description="Reactjs Ecommerce script you need"
      />
      <div className={cx('content')}>
        <FormAuth
          title="Forgot your password?"
          subtitle="Please enter the email address associated with your account and We will email you a link to reset your password."
          back={'Back'}
          navigatorLink={api.login}
        >
          <form className={cx('formData')}>
            <Input
              name="emailAddressUser"
              value={emailAddress}
              setValue={setEmailAddress}
              index="Email Address"
              label="Email Address"
              iconLeft={faEnvelope}
              type="email"
              autocomplete="email"
            />
            <button type="submit" className={cx('auth-button')} onClick={handleSubmit}>
              {isLoading ? <Spinner /> : 'Forgot Password'}
            </button>
          </form>
        </FormAuth>
      </div>
    </div>
  )
}

export default ForgotPassword
