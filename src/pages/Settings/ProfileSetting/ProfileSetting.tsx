import { FormEvent, useEffect, useState } from 'react'
import { GenderSelect, Input, TextArea } from '~/components/common/Type2'
import Spinner from '~/components/Spinner'
import { useAuth } from '~/context/AuthContext'
import { useUser } from '~/context/UserContext'
import * as Toastify from '~/services/Toastify'
import classNames from 'classnames/bind'

import { ProfileImageInput } from '../SettingComponent'
import styles from './ProfileSetting.module.scss'

const cx = classNames.bind(styles)

function ProfileSetting() {
  const { dataUser } = useUser()
  const [loading, setLoading] = useState<boolean>(false)
  const { accessToken } = useAuth()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    Toastify.showToastMessagePending()

    const formData = new FormData(e.currentTarget)

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

  return (
    <form onSubmit={handleSubmit}>
      <div className={cx('ProfileSetting')}>
        <ProfileImageInput imageSaved={dataUser.image} />

        <div className={cx('user-update-info')}>
          <div className={cx('row')}>
            <Input type="text" name="name" label="Name" defaultValue={dataUser.name} />
            <Input type="email" name="email" label="Email Address" defaultValue={dataUser.email} />
          </div>

          <div className={cx('row')}>
            <Input type="text" name="phone" label="Phone" defaultValue={dataUser.phone} />
            <GenderSelect
              options={['Male', 'Female']}
              name="gender"
              label="Gender"
              defaultValue={dataUser.gender}
            />
          </div>

          <div className={cx('row')}>
            <TextArea
              name="about"
              cols={10}
              rows={5}
              spellCheck="false"
              label="About"
              defaultValue={dataUser.about}
            />
          </div>

          <div className={cx('row')}>
            <button
              style={{ width: '100%' }}
              disabled={loading}
              type="submit"
              className={cx('submitChangeBtn')}
            >
              {loading ? <Spinner /> : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default ProfileSetting
