import { useEffect, useRef, useState } from 'react'
import images from '~/assets/Image'
import ActionLayout from '~/layouts/ActionLayout'
import DefaultLayout from '~/layouts/DefaultLayout'
import { propsType } from '~/types/ErrorType'
import * as HandleImageFile from '~/utils/HandleImageFile'
import classNames from 'classnames/bind'

import styles from './SlidesAdd.module.scss'

const cx = classNames.bind(styles)

function SlidesAdd(): JSX.Element {
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [imageUrl, setImageUrl] = useState('')
  const [resizedImageUrl, setResizedImageUrl] = useState<string>('')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const nameButtonSubmit = 'Create Slide'

  useEffect(() => {
    document.title = 'Add Slide | MrGianStore'

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={cx('add')}>
      <DefaultLayout active={'slides'} page={['Dashboard', 'Slides', 'Add']}>
        <ActionLayout
          leftColumn={
            <>
              <div className={cx('heading')}>
                <label htmlFor="heading">Heading</label>
                <input name="heading" id="heading" type="text" />
              </div>
              <div className={cx('primary-Button-Text')}>
                <label htmlFor="primaryButtonText">Primary Button Text</label>
                <input name="primaryButtonText" id="primaryButtonText" type="text" />
              </div>
              <div className={cx('primary-Button-Link')}>
                <label htmlFor="primaryButtonLink">Primary Button Link</label>
                <input name="primaryButtonLink" id="primaryButtonLink" type="text" />
              </div>
              <div className={cx('secondary-Button-Text')}>
                <label htmlFor="secondaryButtonText">Secondary Button Text</label>
                <input name="secondaryButtonText" id="secondaryButtonText" type="text" />
              </div>
              <div className={cx('secondary-Button-Link')}>
                <label htmlFor="secondaryButtonLink">Secondary Button Link</label>
                <input name="secondaryButtonLink" id="secondaryButtonLink" type="text" />
              </div>
            </>
          }
          rightColumn={
            <>
              <div className={cx('image-container')}>
                <div className={cx('description')}>
                  <label htmlFor="description">Description</label>
                  <textarea name="description" id="description" rows={9}></textarea>
                </div>
                <div className={cx('image')}>
                  <div className={cx('title')}>
                    <label htmlFor="brands-image">Cover</label>
                    <p>1920 * 768</p>
                  </div>

                  <input
                    ref={fileInputRef}
                    name="slide-image"
                    id="brands-image"
                    type="file"
                    onChange={(e) => {
                      HandleImageFile.handleFileChange(
                        e,
                        setImageFile,
                        setImageUrl,
                        setResizedImageUrl,
                        1920
                      )
                    }}
                  />
                  <div
                    onClick={() => {
                      HandleImageFile.handleFileSelect(fileInputRef)
                    }}
                    className={cx('image-custom')}
                  >
                    <div className="box">
                      <h4>Drop or Select Images</h4>
                      <img src={images.uploadImage} alt="" />
                    </div>
                    <div className={cx('preview-image')}>
                      {imageUrl && <img src={resizedImageUrl} alt="preview" />}
                    </div>
                  </div>

                  <div className={cx('disabled')}>
                    <div className={cx('toggle-box')}>
                      <input
                        // onChange={e => {
                        //    e.target.checked === true
                        //       ? setDisplaySlide('disabled')
                        //       : setDisplaySlide('abled')
                        // }}
                        name="displaySlide"
                        type="checkbox"
                        id="toggle"
                      />
                      <label htmlFor="toggle" className={cx('toggle-switch')}></label>
                    </div>
                    {/* <label>{displaySlide}</label> */}
                  </div>
                </div>
              </div>
            </>
          }
          nameButtonSubmit={nameButtonSubmit}
        />
      </DefaultLayout>
    </div>
  )
}

export default SlidesAdd
