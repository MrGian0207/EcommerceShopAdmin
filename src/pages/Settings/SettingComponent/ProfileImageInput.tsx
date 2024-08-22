import { useRef, useState } from 'react'
import { faCamera } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as HandleImageFile from '~/utils/HandleImageFile'
import classNames from 'classnames/bind'

import styles from './SettingComponent.module.scss'

const cx = classNames.bind(styles)

export default function ProfileImageInput({ imageSaved }: { imageSaved?: string }) {
  const imageUploadRef = useRef<HTMLInputElement>(null)
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
    <div className={cx('user-image')}>
      <div
        onClick={() => {
          HandleImageFile.handleFileSelect(imageUploadRef)
        }}
        className={cx('image')}
      >
        <input
          onChange={handleImageChange}
          name="image"
          id="dataImage"
          ref={imageUploadRef}
          type="file"
          hidden
        />
        {imageSelected && <img src={imagePreview} alt="Avatar" />}
        <div className={cx('image-input')}>
          <FontAwesomeIcon className={cx('icon')} icon={faCamera} />
          <p>Update photo</p>
        </div>
      </div>
      <span>
        Allowed *.jpeg, *.jpg, *.png, *.gif
        <br />
        max size of 3145728
      </span>
    </div>
  )
}
