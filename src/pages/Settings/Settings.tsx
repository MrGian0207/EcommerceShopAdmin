import React, { useEffect, useRef, useState } from 'react'

import classNames from 'classnames/bind'
import { useTranslation } from 'react-i18next'

import Loading from '~/components/Loading'

import styles from './Setting.module.scss'

import { SettingsRoute } from '~/constant/PageRoute'
import { useUser } from '~/context/UserContext'
import DefaultLayout from '~/layouts/DefaultLayout'
import AddRole from '~/pages/Settings/AddRole'
import ChangePassword from '~/pages/Settings/ChangePassword'
import ProfileSetting from '~/pages/Settings/ProfileSetting'
import Roles from '~/pages/Settings/Roles'

const cx = classNames.bind(styles)
function Settings() {
  const { t } = useTranslation('settings')
  const [component, setComponent] = useState<string>('Profile Setting')
  const profileSettingRef = useRef<HTMLButtonElement>(null)
  const rolesRef = useRef<HTMLButtonElement>(null)
  const addRoleRef = useRef<HTMLButtonElement>(null)
  const changePasswordRef = useRef<HTMLButtonElement>(null)
  const { dataUser, loadingUser } = useUser()

  useEffect(() => {
    document.title = 'Setting | MrGianStore'
  }, [])

  const renderComponent = () => {
    switch (component) {
      case 'Roles':
        return <Roles />
      case 'Add Role':
        return <AddRole />
      case 'Change Password':
        return <ChangePassword />
      default:
        profileSettingRef?.current && profileSettingRef?.current.classList.add(cx('active'))
        return <ProfileSetting />
    }
  }

  const removeActiveButton = (nameButton: string) => {
    switch (nameButton) {
      case 'Profile Setting':
        profileSettingRef?.current && profileSettingRef?.current.classList.remove(cx('active'))
        break
      case 'Roles':
        rolesRef?.current && rolesRef?.current.classList.remove(cx('active'))
        break
      case 'Add Role':
        addRoleRef?.current && addRoleRef?.current.classList.remove(cx('active'))
        break
      case 'Change Password':
        changePasswordRef?.current && changePasswordRef?.current.classList.remove(cx('active'))
        break
      default:
    }
  }

  return (
    <div className={cx('settings-container')}>
      <DefaultLayout active={'settings'} page={SettingsRoute.SettingsPage}>
        {loadingUser ? (
          <Loading />
        ) : (
          <div className={cx('settings')}>
            <nav className={cx('navigator')}>
              <button
                ref={profileSettingRef}
                className={cx('active')}
                onClick={() => {
                  profileSettingRef?.current &&
                    profileSettingRef?.current.classList.add(cx('active'))
                  setComponent((prevComponent) => {
                    removeActiveButton(prevComponent)
                    return 'Profile Setting'
                  })
                }}
              >
                {t('profile_setting')}
              </button>
              {dataUser?.role === 'Admin' && (
                <React.Fragment>
                  <button
                    ref={rolesRef}
                    onClick={() => {
                      rolesRef?.current && rolesRef?.current.classList.add(cx('active'))
                      setComponent((prevComponent) => {
                        removeActiveButton(prevComponent)
                        return 'Roles'
                      })
                    }}
                  >
                    {t('roles')}
                  </button>
                  <button
                    ref={addRoleRef}
                    onClick={() => {
                      addRoleRef?.current && addRoleRef?.current.classList.add(cx('active'))
                      setComponent((prevComponent) => {
                        removeActiveButton(prevComponent)
                        return 'Add Role'
                      })
                    }}
                  >
                    {t('add_role')}
                  </button>
                </React.Fragment>
              )}
              <button
                ref={changePasswordRef}
                onClick={() => {
                  changePasswordRef?.current &&
                    changePasswordRef?.current.classList.add(cx('active'))
                  setComponent((prevComponent) => {
                    removeActiveButton(prevComponent)
                    return 'Change Password'
                  })
                }}
              >
                {t('change_password')}
              </button>
            </nav>
            <div className={cx('content')}>{renderComponent()}</div>
          </div>
        )}
      </DefaultLayout>
    </div>
  )
}

export default Settings
