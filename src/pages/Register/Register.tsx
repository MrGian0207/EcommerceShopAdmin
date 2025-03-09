import process from 'process'

import { useEffect, useState } from 'react'

import {
  faEnvelope,
  faEye,
  faLock,
  faPhone,
  faUser,
  faVenus,
} from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'

import AuthHeader from '~/components/AuthHeader'
import { Input, Select } from '~/components/common/Type2'
import FormAuth from '~/components/FormAuth'
import Spinner from '~/components/Spinner'

import styles from './Register.module.scss'
import { RegisterRules } from './RegisterRules'

import api from '~/api/api'
import * as Toastify from '~/services/Toastify'
import { IFormValues } from '~/types/FormValuesType'

const cx = classNames.bind(styles)

function Register() {
  const methods = useForm<IFormValues>()
  const [loading, setLoading] = useState<boolean>(false)

  const onSubmit: SubmitHandler<IFormValues> = async (data) => {
    setLoading(true)
    try {
      Toastify.showToastMessagePending()
      const register = await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          gender: data.gender,
          phone: data.phone,
          email: data.email,
          password: data.password,
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
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className={cx('formData')}>
              <Input iconLeft={faUser} name="name" label="Full Name" rules={RegisterRules.name} />
              <div className={cx('row')}>
                <Select icon={faVenus} name="gender" label="Gender" options={['Male', 'Female']} />
                <Input iconLeft={faPhone} name="phone" label="Phone" rules={RegisterRules.phone} />
              </div>
              <Input
                iconLeft={faEnvelope}
                name="email"
                label="Email Address"
                rules={RegisterRules.email}
              />
              <Input
                iconLeft={faLock}
                iconRight={faEye}
                name="password"
                label="Password"
                type="password"
                rules={RegisterRules.password}
              />
              <button type="submit" disabled={loading} className={cx('auth-button')}>
                {loading ? <Spinner /> : 'Register'}
              </button>
            </form>
          </FormProvider>
        </FormAuth>
      </div>
    </div>
  )
}

export default Register
