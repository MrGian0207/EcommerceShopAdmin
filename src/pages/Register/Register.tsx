import React, { useEffect, useState } from 'react'
import {
  faEnvelope,
  faEye,
  faLock,
  faPhone,
  faUser,
  faVenus,
} from '@fortawesome/free-solid-svg-icons'
import api from '~/api/api'
import AuthHeader from '~/components/AuthHeader'
import { GenderSelect, Input } from '~/components/common/Type2'
import FormAuth from '~/components/FormAuth'
import Spinner from '~/components/Spinner'
import * as Toastify from '~/services/Toastify'
import classNames from 'classnames/bind'

import styles from './Register.module.scss'

const cx = classNames.bind(styles)

function Register(): JSX.Element {
  const [Loading, setLoading] = useState<boolean>(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    try {
      Toastify.showToastMessagePending()
      const formData = new FormData(e.currentTarget)
      const register = await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.get('name'),
          gender: formData.get('gender'),
          phone: formData.get('phone'),
          email: formData.get('email'),
          password: formData.get('password'),
        }),
      })

      const res = await register.json()
      if (register.ok) {
        Toastify.showToastMessageSuccessfully(res.message)
      } else {
        Toastify.showToastMessageFailure(res.message)
      }
    } catch (error) {
      Toastify.showToast('Submitted form failed', 'error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    document.title = 'Register | MrGianStore'
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
          title="Get Started"
          subtitle="Free forever. No credit card needed."
          suggestion="Already have an account?"
          navigator="Login"
          navigatorLink={api.login}
        >
          <form onSubmit={handleSubmit} className={cx('formData')}>
            <Input iconLeft={faUser} name="name" label="Full Name" />
            <div className={cx('row')}>
              <GenderSelect
                icon={faVenus}
                name="gender"
                label="Gender"
                options={['Male', 'Female']}
              />
              <Input iconLeft={faPhone} name="phone" label="Phone" />
            </div>
            <Input iconLeft={faEnvelope} name="email" label="Email Address" />
            <Input
              iconLeft={faLock}
              iconRight={faEye}
              name="password"
              label="Password"
              type="password"
            />
            <button type="submit" className={cx('auth-button')}>
              {Loading ? <Spinner /> : 'Register'}
            </button>
          </form>
        </FormAuth>
      </div>
    </div>
  )
}

export default Register
