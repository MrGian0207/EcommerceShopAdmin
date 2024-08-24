import React, { useRef, useState } from 'react'
import { ErrorMessage } from '@hookform/error-message'
import images from '~/assets/Image'
import * as HandleImageFile from '~/utils/HandleImageFile'
import classNames from 'classnames/bind'
import { Controller, RegisterOptions, useFormContext } from 'react-hook-form'

import styles from '../Slides.module.scss'

interface IFormValues {
  image: FileList
}

const cx = classNames.bind(styles)

export default function SlideImage({
  imageSaved,
  children,
  rules,
}: {
  imageSaved?: string
  children: React.ReactNode
  rules?:
    | Omit<
        RegisterOptions<IFormValues, keyof IFormValues>,
        'setValueAs' | 'disabled' | 'valueAsNumber' | 'valueAsDate'
      >
    | undefined
}) {
  const { control, formState } = useFormContext<IFormValues>()
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [imageSelected, setImageSelected] = useState<File | string | undefined>(imageSaved || '')

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
    <div className={cx('image')}>
      <div className={cx('title')}>
        <label htmlFor="brands-image">Cover</label>
        <p>1920 * 768</p>
      </div>
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
          <img src={images.uploadImage} alt="" />
        </div>
        {imageSelected && (
          <div className={cx('preview-image')}>
            <img src={imagePreview} alt="preview" />
          </div>
        )}
      </div>
      {children}
      <p className={cx('errorMessage')}>
        <ErrorMessage errors={formState.errors} name={'image'} />
      </p>
    </div>
  )
}
