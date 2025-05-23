import { useEffect, useState } from 'react'

import {
  faEnvelope,
  faEye,
  faLock,
  faPhone,
  faUser,
  faUserTie,
  faVenusMars,
} from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames/bind'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { Input, Select } from '~/components/common/Type2'
import Spinner from '~/components/Spinner'

import { SettingRules } from '../SettingsRules'

import styles from './AddRole.module.scss'

import { useAuth } from '~/context/AuthContext'
import * as Toastify from '~/services/Toastify'
import { IFormValues } from '~/types/FormValuesType'

const cx = classNames.bind(styles)

function AddRole() {
  const { t } = useTranslation('add_role')
  const methods = useForm<IFormValues>()
  const [loading, setLoading] = useState<boolean>(false)
  const { accessToken } = useAuth()

  const onSubmit: SubmitHandler<IFormValues> = async (data) => {
    setLoading(true)
    try {
      Toastify.showToastMessagePending()

      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/settings/addRole`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          name: data.name,
          gender: data.gender,
          email: data.email,
          phone: data.phone,
          password: data.password,
          role: data.role,
        }),
      })
      const resData = await res.json()
      if (resData.status === 'Success') {
        Toastify.showToastMessageSuccessfully(resData?.message)
      } else {
        Toastify.showToastMessageFailure(resData?.message)
      }
    } catch (error) {
      Toastify.showToastMessageFailure('Error while submit')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    document.title = 'Add Role | MrGianStore'
  }, [])

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <section className={cx('add-role')}>
          <div className={cx('add-role-form')}>
            <h3>{t('title')}</h3>

            <Input
              type="text"
              name="name"
              iconLeft={faUser}
              label={t('full_name', { ns: 'form' })}
              rules={SettingRules.name}
            />

            <div className={cx('row')}>
              <Select
                icon={faVenusMars}
                name="gender"
                label={t('gender', { ns: 'form' })}
                options={['Male', 'Female']}
              />

              <Select
                icon={faUserTie}
                name="role"
                label={t('role', { ns: 'form' })}
                options={['Staff', 'Admin', 'Manager', 'Editor']}
              />
            </div>

            <div className={cx('row')}>
              <Input
                type="text"
                name="phone"
                iconLeft={faPhone}
                label={t('phone', { ns: 'form' })}
                rules={SettingRules.phone}
              />
              <Input
                type="text"
                name="email"
                iconLeft={faEnvelope}
                label={t('email', { ns: 'form' })}
                rules={SettingRules.email}
              />
            </div>

            <Input
              type="password"
              name="password"
              iconLeft={faLock}
              iconRight={faEye}
              label={t('password', { ns: 'form' })}
              rules={SettingRules.password}
            />

            <button type="submit" disabled={loading} className={cx('submitChangeBtn')}>
              {loading ? <Spinner /> : t('actions.save', { ns: 'common' })}
            </button>
          </div>
        </section>
      </form>
    </FormProvider>
  )
}

export default AddRole
