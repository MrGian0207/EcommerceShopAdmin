import { FormEvent, useEffect, useRef, useState } from 'react'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { Input } from '~/components/common/Type2'
import Spinner from '~/components/Spinner'
import { useAuth } from '~/context/AuthContext'
import { useUser } from '~/context/UserContext'
import * as Toastify from '~/services/Toastify'
import classNames from 'classnames/bind'

import styles from './ChangePassword.module.scss'

const cx = classNames.bind(styles)

function ChangePassword(): JSX.Element {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { accessToken } = useAuth()
  const { dataUser } = useUser()
  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const formData = new FormData(e.currentTarget)
      Toastify.showToastMessagePending()

      const oldPassword = formData.get('oldPassword') || ''
      const newPassword = formData.get('newPassword') || ''
      const confirmPassword = formData.get('confirmPassword') || ''

      if (String(newPassword).trim() !== String(confirmPassword).trim()) {
        Toastify.showToastMessageFailure('new password and confirm password does not match')
        return
      }

      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/settings/update-password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          id: dataUser._id,
          oldPassword: oldPassword,
          newPassword: newPassword,
        }),
      })

      const resData = await res.json()

      if (resData?.status === 'Success') {
        Toastify.showToastMessageSuccessfully(resData.message)
        formRef && formRef.current?.reset()
      } else {
        Toastify.showToastMessageFailure(resData.message)
      }
    } catch (error) {
      console.log(error)
      Toastify.showToastMessageFailure('Submit failed')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    document.title = 'Change Password | MrGianStore'
  }, [])

  return (
    <section className={cx('change-password')}>
      <form ref={formRef} onSubmit={handleSubmit} className={cx('change-password-form')}>
        <Input type="password" name="oldPassword" label="Old Password" iconRight={faEye} />
        <Input type="password" name="newPassword" label="New Password" iconRight={faEye} />
        <Input
          type="password"
          name="confirmPassword"
          label="Confirm New Password"
          iconRight={faEye}
        />

        <button type="submit" disabled={isLoading} className={cx('submitChangeBtn')}>
          {isLoading ? <Spinner /> : 'Save changes'}
        </button>
      </form>
    </section>
  )
}

export default ChangePassword
