import { useRef, useState } from 'react'
import images from '~/assets/Image'
import * as HandleImageFile from '~/utils/HandleImageFile'
import classNames from 'classnames/bind'

import styles from './common.module.scss'

const cx = classNames.bind(styles)

export default function ImageInput({ imageSaved }: { imageSaved?: string }) {
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [imageSelected, setImageSelected] = useState<File | string | undefined>(imageSaved)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      setImageSelected(files[0])
    }
  }

  const imagePreview =
    typeof imageSelected === 'string'
      ? imageSelected
      : imageSelected && URL.createObjectURL(imageSelected)
  return (
    <div className={cx('image-container')}>
      <div className={cx('image')}>
        <label htmlFor="dataImage">Image 512 * 512</label>
        <input
          ref={fileInputRef}
          name="image"
          id="dataImage"
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
            <img src={images.uploadImage} alt="iconImages" />
          </div>
          <div className={cx('preview-image')}>
            {imageSelected && <img src={imagePreview} alt="preview" />}
          </div>
        </div>
      </div>
    </div>
  )
}
