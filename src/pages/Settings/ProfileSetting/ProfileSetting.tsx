import React, { useEffect, useState } from 'react'
import { Input, Select, TextArea } from '~/components/common/Type2'
import Loading from '~/components/Loading'
import Spinner from '~/components/Spinner'
import { useAuth } from '~/context/AuthContext'
import { useUser } from '~/context/UserContext'
import * as Toastify from '~/services/Toastify'
import { IFormValues } from '~/types/FormValuesType'
import classNames from 'classnames/bind'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { ProfileImageInput } from '../SettingComponent'
import { SettingRules } from '../SettingsRules'
import styles from './ProfileSetting.module.scss'

const cx = classNames.bind(styles)

function ProfileSetting() {
  const { t } = useTranslation('settings')
  const { dataUser, loadingUser } = useUser()
  const [loading, setLoading] = useState<boolean>(false)
  const { accessToken } = useAuth()
  const methods = useForm<IFormValues>()

  const onSubmit: SubmitHandler<IFormValues> = async (data) => {
    setLoading(true)
    Toastify.showToastMessagePending()

    const formData = new FormData()

    formData.append('name', data.name)
    formData.append('email', data.email)
    formData.append('phone', data.phone)
    formData.append('gender', data.gender)
    formData.append('about', data.about)
    if (data.image && data.image.length > 0) {
      formData.append('image', data.image[0])
    }
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${dataUser._id}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      })

      const resData = await res.json()

      resData?.status === 'Success'
        ? Toastify.showToastMessageSuccessfully(resData?.message)
        : Toastify.showToastMessageFailure(resData?.message)
    } catch (error) {
      Toastify.showToastMessageFailure('submit failed')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    document.title = 'Profile Setting | MrGianStore'
  }, [])

  if (loadingUser) {
    return <Loading />
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className={cx('ProfileSetting')}>
          {loadingUser ? (
            <Loading />
          ) : (
            <React.Fragment>
              <ProfileImageInput imageSaved={dataUser.image} />
              <div className={cx('user-update-info')}>
                <div className={cx('row')}>
                  <Input
                    type="text"
                    name="name"
                    label={t('name', { ns: 'form' })}
                    defaultValue={dataUser.name}
                    rules={SettingRules.name}
                  />
                  <Input
                    type="email"
                    name="email"
                    label={t('email', { ns: 'form' })}
                    defaultValue={dataUser.email}
                    rules={SettingRules.email}
                  />
                </div>

                <div className={cx('row')}>
                  <Input
                    type="text"
                    name="phone"
                    label={t('phone', { ns: 'form' })}
                    defaultValue={dataUser.phone}
                    rules={SettingRules.phone}
                  />
                  <Select
                    options={['Male', 'Female']}
                    name="gender"
                    label={t('gender', { ns: 'form' })}
                    defaultValue={dataUser.gender}
                  />
                </div>

                <div className={cx('row')}>
                  <TextArea
                    name="about"
                    cols={10}
                    rows={5}
                    spellCheck="false"
                    label={t('about', { ns: 'form' })}
                    defaultValue={dataUser.about}
                    rules={SettingRules.about}
                  />
                </div>

                <div className={cx('row')}>
                  <button
                    style={{ width: '100%' }}
                    disabled={loading}
                    type="submit"
                    className={cx('submitChangeBtn')}
                  >
                    {loading ? <Spinner /> : t('actions.save_changes')}
                  </button>
                </div>
              </div>
            </React.Fragment>
          )}
        </div>
      </form>
    </FormProvider>
  )
}

export default ProfileSetting
