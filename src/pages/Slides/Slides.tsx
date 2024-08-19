import { useEffect, useState } from 'react'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Button from '~/components/Button'
import ImageSlider from '~/components/ImageSlider'
import { useAuth } from '~/context/AuthContext'
import { useUpdateLayout } from '~/context/UpdateLayoutContext'
import DefaultLayout from '~/layouts/DefaultLayout'
import { SlideType } from '~/types/SlideType'
import classNames from 'classnames/bind'
import { useLocation } from 'react-router-dom'

import styles from './Slides.module.scss'

const cx = classNames.bind(styles)

function Slides(): JSX.Element {
  const { updateLayout } = useUpdateLayout()
  const location = useLocation()
  const path = location.pathname
  const [data, setData] = useState<SlideType[]>([])
  const { accessToken } = useAuth()

  useEffect(() => {
    document.title = 'Slide | MrGianStore'
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}${path}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      })
      const resData = await res.json()
      setData(resData.data)
    }
    fetchData()
  }, [path, updateLayout, accessToken])

  return (
    <div className={cx('slides')}>
      <DefaultLayout
        active={'slides'}
        page={['Dashboard', 'Slides']}
        searchEngine={true}
        buttons={[
          <Button to={'/slides/add'} className="button-add">
            <FontAwesomeIcon icon={faPlus} />
            Add Slide
          </Button>,
        ]}
      >
        {data.length > 0 && <ImageSlider data={data} />}
      </DefaultLayout>
    </div>
  )
}

export default Slides
