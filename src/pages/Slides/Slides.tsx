import { useEffect, useState } from 'react'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Button from '~/components/Button'
import ImageSlider from '~/components/ImageSlider'
import { useAuth } from '~/context/AuthContext'
import { usePath } from '~/context/PathContext'
import { useUpdateLayout } from '~/context/UpdateLayoutContext'
import DefaultLayout from '~/layouts/DefaultLayout'
import { SlideType } from '~/types/SlideType'
import classNames from 'classnames/bind'

import styles from './Slides.module.scss'
import Loading from '~/components/Loading'

const cx = classNames.bind(styles)

function Slides(): JSX.Element {
  const { updateLayout } = useUpdateLayout()
  const { path } = usePath()
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<SlideType[]>([])
  const { accessToken } = useAuth()

  useEffect(() => {
    document.title = 'Slide | MrGianStore'
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}${path}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        })
        const resData = await res.json()
        setData(resData.data)
      } catch (error) {
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [path, updateLayout, accessToken])

  if (loading) return <Loading />

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
        <ImageSlider data={data} />
      </DefaultLayout>
    </div>
  )
}

export default Slides
