import { FormEvent, useEffect, useState } from 'react'
import {
  faEnvelope,
  faEye,
  faLock,
  faPhone,
  faUser,
  faUserTie,
  faVenusMars,
} from '@fortawesome/free-solid-svg-icons'
import { GenderSelect, Input } from '~/components/common/Type2'
import Spinner from '~/components/Spinner'
import { useAuth } from '~/context/AuthContext'
import * as Toastify from '~/services/Toastify'
import classNames from 'classnames/bind'

import styles from './AddRole.module.scss'

const cx = classNames.bind(styles)

function AddRole(): JSX.Element {
  const [Loading, setLoading] = useState<boolean>(false)
  const { accessToken } = useAuth()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    try {
      Toastify.showToastMessagePending()
      const formData = new FormData(e.currentTarget)

      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/settings/addRole`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          name: formData.get('name'),
          gender: formData.get('gender'),
          email: formData.get('email'),
          phone: formData.get('phone'),
          password: formData.get('password'),
          role: formData.get('role'),
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
    <form onSubmit={handleSubmit}>
      <section className={cx('add-role')}>
        <div className={cx('add-role-form')}>
          <h3>Add Role</h3>

          <Input type="text" name="name" iconLeft={faUser} label="Full Name" />

          <div className={cx('row')}>
            <GenderSelect
              icon={faVenusMars}
              name="gender"
              label="Gender"
              options={['Male', 'Female']}
            />

            <GenderSelect
              icon={faUserTie}
              name="role"
              label="Role"
              options={['Staff', 'Admin', 'Manager', 'Editor']}
            />
          </div>

          <div className={cx('row')}>
            <Input type="text" name="phone" iconLeft={faPhone} label="Phone" />
            <Input type="text" name="email" iconLeft={faEnvelope} label="Email Address" />
          </div>

          <Input
            type="password"
            name="password"
            iconLeft={faLock}
            iconRight={faEye}
            label="Password"
          />

          <button type="submit" className={cx('submitChangeBtn')}>
            {Loading ? <Spinner /> : 'Save'}
          </button>
        </div>
      </section>
    </form>
  )
}

export default AddRole
