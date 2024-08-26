import React from 'react'
import { faCircleMinus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import images from '~/assets/Image'
import { useProduct } from '~/context/ProductContext'
import classNames from 'classnames/bind'
import { useTranslation } from 'react-i18next'

import styles from '../VariantForm.module.scss'

const cx = classNames.bind(styles)

export default function VariantImage() {
  const { t } = useTranslation('product')

  const { variantImage, setVariantImage } = useProduct()
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const handleSelectNewImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target
    files && setVariantImage((prevImages) => [...prevImages, files[0]])
  }

  const handleFileSelect = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    e.stopPropagation()
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleDeleteImage = (index: number) => {
    setVariantImage((prevImageFile) => [
      ...prevImageFile.filter((_, newIndex) => newIndex !== index),
    ])
  }

  return (
    <React.Fragment>
      {/* Input field for select new images */}
      <div className={cx('image')}>
        <label htmlFor="brandImage">{t('image', { size: '1080 * 1080', ns: 'form' })}</label>
        <input
          ref={fileInputRef}
          name="brandImage"
          id="brandImage"
          type="file"
          onChange={handleSelectNewImage}
        />
        <button onClick={handleFileSelect} className={cx('image-custom')}>
          <div className={cx('box')}>
            <img src={images.uploadImage} alt="upload" />
            <span className={cx('image-description')}>
              <h4>{t('drop_select_image', { ns: 'form' })}</h4>
              <p>{t('form_description.image', { ns: 'form' })}</p>
            </span>
          </div>
        </button>
      </div>

      {/* Display list images after user select */}
      <div className={cx('row-image')}>
        {variantImage.map((image, index) => {
          const previewImage = typeof image === 'string' ? image : URL.createObjectURL(image)
          return (
            <div key={`imagePreview-${index}`}>
              <div className={cx('preview-image')}>
                <img src={previewImage} alt="preview" />
                <button
                  onClick={() => {
                    handleDeleteImage(index)
                  }}
                  className={cx('delete-image')}
                >
                  <FontAwesomeIcon icon={faCircleMinus} />
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </React.Fragment>
  )
}
