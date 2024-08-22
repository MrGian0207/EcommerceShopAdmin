import React, { useEffect, useState } from 'react'
import { Input, TextArea } from '~/components/common/Type1'
import Loading from '~/components/Loading'
import { useAuth } from '~/context/AuthContext'
import { usePath } from '~/context/PathContext'
import ActionLayout from '~/layouts/ActionLayout'
import DefaultLayout from '~/layouts/DefaultLayout'
import classNames from 'classnames/bind'

import styles from '../Slides.module.scss'
import DisplaySlide from '../SlidesComponent/DisplaySlide'
import SlideImage from '../SlidesComponent/SlideImage'

interface SlideType {
  heading: string
  primaryButtonText: string
  primaryButtonLink: string
  secondaryButtonText: string
  secondaryButtonLink: string
  description: string
  displaySlide: string
  image: string
}

const cx = classNames.bind(styles)

function SlidesEdit() {
  const { path } = usePath()
  const { accessToken } = useAuth()
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<SlideType>({
    heading: '',
    primaryButtonText: '',
    primaryButtonLink: '',
    secondaryButtonText: '',
    secondaryButtonLink: '',
    description: '',
    displaySlide: 'off',
    image: '',
  })
  const nameButtonSubmit = 'Edit Slide'

  useEffect(() => {
    document.title = 'Edit Slide | MrGianStore'
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}${path}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        })
        await res.json().then((data) => {
          setData(data)
        })
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [path, accessToken])

  if (loading) return <Loading />

  return (
    <div className={cx('edit')}>
      <DefaultLayout active={'slides'} page={['Dashboard', 'Slides', 'Edit']}>
        <ActionLayout
          leftColumn={
            <React.Fragment>
              <Input name="heading" label="Heading" defaultValue={data.heading} />
              <Input
                name="primaryButtonText"
                label="Primary Button Text"
                defaultValue={data.primaryButtonText}
              />
              <Input
                name="primaryButtonLink"
                label="Primary Button Link"
                defaultValue={data.primaryButtonLink}
              />
              <Input
                name="secondaryButtonText"
                label="Secondary Button Text"
                defaultValue={data.secondaryButtonText}
              />
              <Input
                name="secondaryButtonLink"
                label="Secondary Button Link"
                defaultValue={data.secondaryButtonLink}
              />
            </React.Fragment>
          }
          rightColumn={
            <React.Fragment>
              <div className={cx('image-container')}>
                <TextArea
                  name="description"
                  rows={9}
                  label="Description"
                  defaultValue={data.description}
                />
                <SlideImage imageSaved={data.image}>
                  <DisplaySlide defaultChecked={data.displaySlide === 'on'} />
                </SlideImage>
              </div>
            </React.Fragment>
          }
          nameButtonSubmit={nameButtonSubmit}
        />
      </DefaultLayout>
    </div>
  )
}

export default SlidesEdit
