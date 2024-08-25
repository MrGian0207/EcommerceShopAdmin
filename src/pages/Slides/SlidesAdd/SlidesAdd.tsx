import React, { useEffect } from 'react'
import { TextArea } from '~/components/common/Type1'
import Input from '~/components/common/Type1/Input'
import ActionLayout from '~/layouts/ActionLayout'
import DefaultLayout from '~/layouts/DefaultLayout'
import classNames from 'classnames/bind'

import styles from '../Slides.module.scss'
import DisplaySlide from '../SlidesComponent/DisplaySlide'
import SlideImage from '../SlidesComponent/SlideImage'
import { SlidesRules } from '../SlidesRule'

const cx = classNames.bind(styles)

function SlidesAdd(): JSX.Element {
  useEffect(() => {
    document.title = 'Add Slide | MrGianStore'
  }, [])

  return (
    <div className={cx('add')}>
      <DefaultLayout active={'slides'} page={['Dashboard', 'Slides', 'Add']}>
        <ActionLayout
          leftColumn={
            <React.Fragment>
              <Input name="heading" label="Heading" rules={SlidesRules.heading} />
              <Input
                name="primaryButtonText"
                label="Primary Button Text"
                rules={SlidesRules.primaryButtonText}
              />
              <Input
                name="primaryButtonLink"
                label="Primary Button Link"
                rules={SlidesRules.primaryButtonLink}
              />
              <Input
                name="secondaryButtonText"
                label="Secondary Button Text"
                rules={SlidesRules.secondaryButtonText}
              />
              <Input
                name="secondaryButtonLink"
                label="Secondary Button Link"
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
                  rules={SlidesRules.description}
                />
                <SlideImage rules={SlidesRules.image}>
                  <DisplaySlide name="displaySlide" />
                </SlideImage>
              </div>
            </React.Fragment>
          }
          nameButtonSubmit={'Create Slide'}
        />
      </DefaultLayout>
    </div>
  )
}

export default SlidesAdd
