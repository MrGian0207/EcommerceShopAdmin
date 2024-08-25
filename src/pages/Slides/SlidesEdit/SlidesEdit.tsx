import React, { useEffect, useState } from 'react'
import { Input, TextArea } from '~/components/common/Type1'
import { useAuth } from '~/context/AuthContext'
import { usePath } from '~/context/PathContext'
import ActionLayout from '~/layouts/ActionLayout'
import DefaultLayout from '~/layouts/DefaultLayout'
import { emptySlide, SlideType } from '~/types/DataType'
import classNames from 'classnames/bind'

import styles from '../Slides.module.scss'
import DisplaySlide from '../SlidesComponent/DisplaySlide'
import SlideImage from '../SlidesComponent/SlideImage'
import SlideSkeleton from '../SlideSkeleton/SlideSkeleton'
import { SlidesRules } from '../SlidesRule'

const cx = classNames.bind(styles)

function SlidesEdit() {
  const { path } = usePath()
  const { accessToken } = useAuth()
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<SlideType>(emptySlide)

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
        setTimeout(() => {
          setLoading(false)
        }, 500)
      }
    }
    fetchData()
  }, [path, accessToken])

  return (
    <div className={cx('edit')}>
      <DefaultLayout active={'slides'} page={['Dashboard', 'Slides', 'Edit']}>
        {loading ? (
          <SlideSkeleton />
        ) : (
          <ActionLayout
            leftColumn={
              <React.Fragment>
                <Input
                  name="heading"
                  label="Heading"
                  defaultValue={data.heading}
                  rules={SlidesRules.heading}
                />
                <Input
                  name="primaryButtonText"
                  label="Primary Button Text"
                  defaultValue={data.primaryButtonText}
                  rules={SlidesRules.primaryButtonText}
                />
                <Input
                  name="primaryButtonLink"
                  label="Primary Button Link"
                  defaultValue={data.primaryButtonLink}
                  rules={SlidesRules.primaryButtonLink}
                />
                <Input
                  name="secondaryButtonText"
                  label="Secondary Button Text"
                  defaultValue={data.secondaryButtonText}
                  rules={SlidesRules.secondaryButtonText}
                />
                <Input
                  name="secondaryButtonLink"
                  label="Secondary Button Link"
                  defaultValue={data.secondaryButtonLink}
                  rules={SlidesRules.secondaryButtonLink}
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
                    rules={SlidesRules.description}
                  />
                  <SlideImage imageSaved={data.image}>
                    <DisplaySlide
                      defaultChecked={data.displaySlide === 'true'}
                      name="displaySlide"
                    />
                  </SlideImage>
                </div>
              </React.Fragment>
            }
            nameButtonSubmit={'Edit Slide'}
          />
        )}
      </DefaultLayout>
    </div>
  )
}

export default SlidesEdit
