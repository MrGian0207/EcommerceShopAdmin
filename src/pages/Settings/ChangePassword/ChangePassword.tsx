import { useEffect, useState } from 'react'
import ErrorInput from '~/components/ErrorInput'
import Spinner from '~/components/Spinner'
import { useAuth } from '~/context/AuthContext'
import * as Toastify from '~/services/Toastify'
import { propsType } from '~/types/ErrorType'
import checkError from '~/utils/InputError'
import classNames from 'classnames/bind'

import styles from './ChangePassword.module.scss'

const cx = classNames.bind(styles)

function ChangePassword(): JSX.Element {
  const [oldPassword, setOldPassword] = useState<string>('')
  const [newPassword, setNewPassword] = useState<string>('')
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>('')
  const [isLoading, setIsLoading] = useState<Boolean>(false)
  const { accessToken } = useAuth()

  const [Errors, setErrors] = useState<propsType>({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const [isOldPasswordTouched, setIsOldPasswordTouched] = useState<boolean>(false)
  const [isNewPasswordTouched, setIsNewPasswordTouched] = useState<boolean>(false)
  const [isConfirmNewPasswordTouched, setIsConfirmNewPasswordTouched] = useState<boolean>(false)

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setState: React.Dispatch<React.SetStateAction<string>>,
    fieldName: keyof propsType,
    setTouched: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: e.target.value,
    }))
    setState(e.target.value)
    setTouched(true)
  }

  useEffect(() => {
    document.title = 'Change Password | MrGianStore'

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSubmit = async () => {
    if (oldPassword !== '' && newPassword !== '' && confirmNewPassword !== '') {
      setIsLoading(true)
      const id_user: string = (await localStorage.getItem('id_user'))
        ? (localStorage.getItem('id_user') as string)
        : ''
      Toastify.showToastMessagePending()
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/settings/update-password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          oldPassword,
          newPassword,
          confirmNewPassword,
          id: id_user,
        }),
      })
      const resData = await res.json()
      if (resData) {
        setIsLoading(false)
        if (resData?.status === 'Success') {
          Toastify.showToastMessageSuccessfully(resData.message)
        }
      } else {
        setIsLoading(false)
      }
    } else {
      setIsOldPasswordTouched(true)
      setIsNewPasswordTouched(true)
      setIsConfirmNewPasswordTouched(true)
    }
  }

  return (
    <div className={cx('change-password')}>
      <div className={cx('change-passord-form')}>
        <div>
          <div className={cx('user-old-password')}>
            <label className={cx('label')} htmlFor="user-old-password">
              Old Password
            </label>
            <input
              value={oldPassword}
              onChange={(e) => {
                handleInputChange(e, setOldPassword, 'oldPassword', setIsOldPasswordTouched)
              }}
              id="user-old-password"
              type="password"
            />
          </div>
          {isOldPasswordTouched && checkError(Errors).oldPassword && (
            <ErrorInput nameError={checkError(Errors).oldPassword as string} />
          )}
        </div>
        <div>
          <div className={cx('user-new-password')}>
            <label className={cx('label')} htmlFor="user-new-password">
              New Password
            </label>
            <input
              value={newPassword}
              onChange={(e) => {
                handleInputChange(e, setNewPassword, 'newPassword', setIsNewPasswordTouched)
              }}
              id="user-new-password"
              type="password"
            />
          </div>
          {isNewPasswordTouched && checkError(Errors).newPassword && (
            <ErrorInput nameError={checkError(Errors).newPassword as string} />
          )}
        </div>
        <div>
          <div className={cx('user-confirm-new-password')}>
            <label className={cx('label')} htmlFor="user-confirm-new-password">
              Confirm New Password
            </label>

            <input
              value={confirmNewPassword}
              onChange={(e) => {
                handleInputChange(
                  e,
                  setConfirmNewPassword,
                  'confirmPassword',
                  setIsConfirmNewPasswordTouched
                )
              }}
              id="user-confirm-new-password"
              type="password"
            />
          </div>
          {isConfirmNewPasswordTouched && checkError(Errors).confirmPassword && (
            <ErrorInput nameError={checkError(Errors).confirmPassword as string} />
          )}
        </div>
        <button onClick={handleSubmit} className={cx('submitChangebtn')}>
          {isLoading ? <Spinner /> : 'Save changes'}
        </button>
      </div>
    </div>
  )
}

export default ChangePassword
