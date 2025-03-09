import process from 'process'

import { useEffect, useRef, useState } from 'react'

import { faEye } from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames'
import { SubmitHandler, useForm, FormProvider } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { Input } from '~/components/common/Type2'
import Spinner from '~/components/Spinner'

import { SettingRules } from '../SettingsRules'

import styles from './ChangePassword.module.scss'

import { useAuth } from '~/context/AuthContext'
import { useUser } from '~/context/UserContext'
import * as Toastify from '~/services/Toastify'
import { IFormValues } from '~/types/FormValuesType'

const cx = classNames.bind(styles)

function ChangePassword() {
  const { t } = useTranslation()
  const methods = useForm<IFormValues>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { accessToken } = useAuth()
  const { dataUser } = useUser()
  const formRef = useRef<HTMLFormElement>(null)

  const onSubmit: SubmitHandler<IFormValues> = async (data) => {
    setIsLoading(true)
    try {
      Toastify.showToastMessagePending()

      if (String(data.newPassword).trim() !== String(data.confirmPassword).trim()) {
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
          oldPassword: data.oldPassword,
          newPassword: data.newPassword,
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
      <FormProvider {...methods}>
        <form
          ref={formRef}
          onSubmit={methods.handleSubmit(onSubmit)}
          className={cx('change-password-form')}
        >
          <Input
            type="password"
            name="oldPassword"
            label={t('old_password', { ns: 'form' })}
            iconRight={faEye}
            rules={SettingRules.password}
          />
          <Input
            type="password"
            name="newPassword"
            label={t('new_password', { ns: 'form' })}
            iconRight={faEye}
            rules={SettingRules.password}
          />
          <Input
            type="password"
            name="confirmPassword"
            label={t('confirm_password', { ns: 'form' })}
            iconRight={faEye}
            rules={SettingRules.password}
          />

          <button type="submit" disabled={isLoading} className={cx('submitChangeBtn')}>
            {isLoading ? <Spinner /> : 'Save changes'}
          </button>
        </form>
      </FormProvider>
    </section>
  )
}

export default ChangePassword
