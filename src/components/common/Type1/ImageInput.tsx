import { useRef, useState } from 'react'
import { ErrorMessage } from '@hookform/error-message'
import images from '~/assets/Image'
import { IFormValues } from '~/types/FormValuesType'
import * as HandleImageFile from '~/utils/HandleImageFile'
import classNames from 'classnames/bind'
import { Controller, RegisterOptions, useFormContext } from 'react-hook-form'

import styles from './common.module.scss'

const cx = classNames.bind(styles)

export default function ImageInput({
  imageSaved,
  rules,
}: {
  imageSaved?: string
  rules?: RegisterOptions<IFormValues, 'image'>
}) {
  const { control, formState } = useFormContext<IFormValues>()
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [imageSelected, setImageSelected] = useState<File | string | undefined>(imageSaved)

  const handleImageChange = (files: FileList | null) => {
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
        <Controller
          name="image"
          control={control}
          rules={{
            ...rules,
          }}
          render={({ field }) => (
            <input
              type="file"
              ref={fileInputRef}
              onChange={(e) => {
                handleImageChange(e.target.files)
                field.onChange(e.target.files)
              }}
            />
          )}
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
        <p className={cx('errorMessage')}>
          <ErrorMessage errors={formState.errors} name={'image'} />
        </p>
      </div>
    </div>
  )
}
