import React, { useEffect } from 'react'
import { TextArea } from '~/components/common/Type1'
import Input from '~/components/common/Type1/Input'
import ActionLayout from '~/layouts/ActionLayout'
import DefaultLayout from '~/layouts/DefaultLayout'
import classNames from 'classnames/bind'

import styles from '../Slides.module.scss'
import DisplaySlide from '../SlidesComponent/DisplaySlide'
import SlideImage from '../SlidesComponent/SlideImage'

const cx = classNames.bind(styles)

function SlidesAdd(): JSX.Element {
  const nameButtonSubmit = 'Create Slide'

  useEffect(() => {
    document.title = 'Add Slide | MrGianStore'
  }, [])

  return (
    <div className={cx('add')}>
      <DefaultLayout active={'slides'} page={['Dashboard', 'Slides', 'Add']}>
        <ActionLayout
          leftColumn={
            <React.Fragment>
              <Input name="heading" label="Heading" />
              <Input name="primaryButtonText" label="Primary Button Text" />
              <Input name="primaryButtonLink" label="Primary Button Link" />
              <Input name="secondaryButtonText" label="Secondary Button Text" />
              <Input name="secondaryButtonLink" label="Secondary Button Link" />
            </React.Fragment>
          }
          rightColumn={
            <React.Fragment>
              <div className={cx('image-container')}>
                <TextArea name="description" rows={9} label="Description" />
                <SlideImage>
                  <DisplaySlide />
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

export default SlidesAdd
