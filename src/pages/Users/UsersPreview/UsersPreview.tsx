import { useEffect, useState } from 'react'
import images from '~/assets/Image'
import { UsersRoute } from '~/constant/PageRoute'
import { useAuth } from '~/context/AuthContext'
import DefaultLayout from '~/layouts/DefaultLayout'
import classNames from 'classnames/bind'
import { useLocation } from 'react-router-dom'

import styles from './UsersPreview.module.scss'

const cx = classNames.bind(styles)

type DataType = {
  name?: string
  email?: string
}

function UsersPreview(): JSX.Element {
  const location = useLocation()
  const path = location.pathname
  const [data, setData] = useState<DataType>({})
  const { accessToken } = useAuth()

  useEffect(() => {
    document.title = 'Preview User | MrGianStore'
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}${path}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        })
        const resData = await res.json()
        if (resData) {
          setData(resData)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [path, accessToken])

  return (
    <div className={cx('users')}>
      <DefaultLayout active={'users'} page={UsersRoute.UsersPreviewPage}>
        <div className={cx('user')}>
          <div className={cx('user-description')}>
            <div className={cx('user-info')}>
              <div className={cx('user-image')}>
                <img src={images.userDefaults} alt="default" />
              </div>
              <div className={cx('user-name-email')}>
                <h4>{data.name}</h4>
                <p>{data.email}</p>
              </div>
            </div>
          </div>
          <div className={cx('user-data')}>
            <img src={images.noDataUser} alt="no-data-user" />
          </div>
        </div>
      </DefaultLayout>
    </div>
  )
}

export default UsersPreview
