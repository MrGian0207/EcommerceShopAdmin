import { useEffect, useState } from 'react'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Button from '~/components/common/Button'
import ImageSlider from '~/components/ImageSlider'
import Loading from '~/components/Loading'
import { useAuth } from '~/context/AuthContext'
import { usePath } from '~/context/PathContext'
import { useUpdateLayout } from '~/context/UpdateLayoutContext'
import DefaultLayout from '~/layouts/DefaultLayout'
import classNames from 'classnames/bind'
import { Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'

import { SlideType } from '~/types/DataType'
import { Slide } from '~/types/ImageSliderType'

import styles from './Slides.module.scss'

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
        setTimeout(() => {
          setLoading(false)
        }, 500)
      }
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
        {loading ? (
          <Loading />
        ) : (
          <div className={cx('slider-wrapper')}>
            <Swiper
              style={{
                height: '100%',
              }}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
              }}
              loop={true}
              speed={1000}
              modules={[Autoplay]}
              spaceBetween={50}
              slidesPerView={1}
            >
              {data.map((slider: Slide, index) => {
                return (
                  <SwiperSlide key={`slide-${index}`}>
                    <ImageSlider slider={slider} />
                  </SwiperSlide>
                )
              })}
            </Swiper>
          </div>
        )}
      </DefaultLayout>
    </div>
  )
}

export default Slides
