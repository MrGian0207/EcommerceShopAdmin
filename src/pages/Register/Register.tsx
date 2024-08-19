import React, { useEffect, useState } from 'react'
import {
  faAngleDown,
  faEnvelope,
  faLock,
  faPhone,
  faUser,
  faVenus,
} from '@fortawesome/free-solid-svg-icons'
import api from '~/api/api'
import AuthHeader from '~/components/AuthHeader'
import FormAuth from '~/components/FormAuth'
import Input from '~/components/Input'
import Spinner from '~/components/Spinner'
import * as Toastify from '~/services/Toastify'
import classNames from 'classnames/bind'

import styles from './Register.module.scss'

const cx = classNames.bind(styles)

function Register(): JSX.Element {
  const [fullName, setFullName] = useState<string | number>('')
  const [gender, setGender] = useState<string | number>('Male')
  const [phoneNumber, setPhoneNumber] = useState<string | number>('')
  const [emailAddress, setEmailAddress] = useState<string | number>('')
  const [password, setPassword] = useState<string | number>('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    switch (true) {
      case fullName === '':
        alert('Full name is required')
        break
      case phoneNumber === '':
        alert('Phone number is required')
        break
      case emailAddress === '':
        alert('Email address is required')
        break
      case password === '':
        alert('Password is required')
        break
      default:
        setIsSubmitted(true)
    }
  }

  useEffect(() => {
    document.title = 'Register | MrGianStore'

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (isSubmitted) {
      setIsLoading(true)
      Toastify.showToastMessagePending()
      fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName,
          gender,
          phoneNumber,
          emailAddress,
          password,
        }),
      })
        .then((res) => {
          setIsSubmitted(false)
          return res.json()
        })
        .then((data) => {
          setIsLoading(false)
          if (data?.status === 'Success') {
            Toastify.showToastMessageSuccessfully(data?.message)
          } else {
            Toastify.showToastMessageFailure(data?.message)
          }
        })
        .catch((e) => {
          setIsLoading(false)
          setIsSubmitted(false)
          console.log(e)
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitted])

  return (
    <div className={cx('wrapper')}>
      <AuthHeader
        welcome="Welcome to the"
        nameStore="MrGianStore"
        description="Reactjs Ecommerce script you need"
      />
      <div className={cx('content')}>
        <FormAuth
          title="Get Started"
          subtitle="Free forever. No credit card needed."
          suggestion="Already have an account?"
          navigator="Login"
          navigatorLink={api.login}
        >
          <form className={cx('formData')}>
            <Input
              name="nameUser"
              value={fullName}
              setValue={setFullName}
              index="Full Name"
              label="Full Name"
              iconLeft={faUser}
              type="text"
              autocomplete="name"
            />
            <div
              className={cx('row')}
              style={{
                display: 'inline-flex',
                width: '100%',
              }}
            >
              <div>
                <Input
                  name="gender"
                  value={gender}
                  setValue={setGender}
                  space="space"
                  index="Gender"
                  label="Gender"
                  iconLeft={faVenus}
                  iconRight={faAngleDown}
                  onclick={true}
                  type="text"
                  autocomplete="name"
                />
              </div>
              <div>
                <Input
                  name="phoneUser"
                  value={phoneNumber}
                  setValue={setPhoneNumber}
                  index="Phone"
                  label="Phone"
                  iconLeft={faPhone}
                  type="text"
                  autocomplete="name"
                />
              </div>
            </div>
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
            <Input
              name="password"
              value={password}
              setValue={setPassword}
              index="Password"
              label="Password"
              iconLeft={faLock}
              type="password"
              autocomplete="current-password"
            />
            <button type="submit" onClick={handleSubmit} className={cx('auth-button')}>
              {isLoading ? <Spinner /> : 'Register'}
            </button>
          </form>
        </FormAuth>
      </div>
    </div>
  )
}

export default Register
