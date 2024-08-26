import React, { useEffect } from 'react'
import { TextArea } from '~/components/common/Type1'
import Input from '~/components/common/Type1/Input'
import { SlidesRoute } from '~/constant/PageRoute'
import ActionLayout from '~/layouts/ActionLayout'
import DefaultLayout from '~/layouts/DefaultLayout'
import classNames from 'classnames/bind'
import { useTranslation } from 'react-i18next'

import styles from '../Slides.module.scss'
import DisplaySlide from '../SlidesComponent/DisplaySlide'
import SlideImage from '../SlidesComponent/SlideImage'
import { SlidesRules } from '../SlidesRule'

const cx = classNames.bind(styles)

function SlidesAdd(): JSX.Element {
  const { t } = useTranslation('slides')

  useEffect(() => {
    document.title = 'Add Slide | MrGianStore'
  }, [])

  return (
    <div className={cx('add')}>
      <DefaultLayout active={'slides'} page={SlidesRoute.SlidesAddPage}>
        <ActionLayout
          leftColumn={
            <React.Fragment>
              <Input
                name="heading"
                label={t('heading', { ns: 'form' })}
                rules={SlidesRules.heading}
              />
              <Input
                name="primaryButtonText"
                label={t('primary_button_text', { ns: 'form' })}
                rules={SlidesRules.primaryButtonText}
              />
              <Input
                name="primaryButtonLink"
                label={t('primary_button_link', { ns: 'form' })}
                rules={SlidesRules.primaryButtonLink}
              />
              <Input
                name="secondaryButtonText"
                label={t('second_button_text', { ns: 'form' })}
                rules={SlidesRules.secondaryButtonText}
              />
              <Input
                name="secondaryButtonLink"
                label={t('second_button_link', { ns: 'form' })}
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
                  label={t('description', { ns: 'form' })}
                  rules={SlidesRules.description}
                />
                <SlideImage rules={SlidesRules.image}>
                  <DisplaySlide name="displaySlide" />
                </SlideImage>
              </div>
            </React.Fragment>
          }
          nameButtonSubmit={t('actions.create_slide')}
        />
      </DefaultLayout>
    </div>
  )
}

export default SlidesAdd
