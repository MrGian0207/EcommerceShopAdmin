import React, { useRef, useState } from 'react'
import images from '~/assets/Image'
import * as HandleImageFile from '~/utils/HandleImageFile'
import classNames from 'classnames/bind'

import styles from '../Slides.module.scss'

const cx = classNames.bind(styles)

export default function SlideImage({
  imageSaved,
  children,
}: {
  imageSaved?: string
  children: React.ReactNode
}) {
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [imageSelected, setImageSelected] = useState<string>(imageSaved || '')

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      setImageSelected(URL.createObjectURL(files[0]))
    }
  }

  return (
    <div className={cx('image')}>
      <div className={cx('title')}>
        <label htmlFor="brands-image">Cover</label>
        <p>1920 * 768</p>
      </div>

      <input
        ref={fileInputRef}
        name="image"
        id="brands-image"
        type="file"
        onChange={handleImageChange}
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
        {imageSelected && (
          <div className={cx('preview-image')}>
            <img src={imageSelected} alt="preview" />
          </div>
        )}
      </div>
      {children}
    </div>
  )
}
