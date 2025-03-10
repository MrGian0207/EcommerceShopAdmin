import { useRef, useState } from 'react'

import { faCamera } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ErrorMessage } from '@hookform/error-message'
import classNames from 'classnames/bind'
import { Controller, RegisterOptions, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import styles from './SettingComponent.module.scss'

import { IFormValues } from '~/types/FormValuesType'
import * as HandleImageFile from '~/utils/HandleImageFile'

const cx = classNames.bind(styles)

export default function ProfileImageInput({
  imageSaved,
  rules,
}: {
  imageSaved?: string
  rules?:
    | Omit<
        RegisterOptions<IFormValues, 'image'>,
        'setValueAs' | 'disabled' | 'valueAsNumber' | 'valueAsDate'
      >
    | undefined
}) {
  const { t } = useTranslation('settings')
  const { control, formState } = useFormContext<IFormValues>()
  const imageUploadRef = useRef<HTMLInputElement>(null)
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
    <div className={cx('user-image')}>
      <div
        onClick={() => {
          HandleImageFile.handleFileSelect(imageUploadRef)
        }}
        className={cx('image')}
      >
        <Controller
          name="image"
          control={control}
          rules={{
            ...rules,
          }}
          render={({ field }) => (
            <input
              type="file"
              ref={imageUploadRef}
              onChange={(e) => {
                handleImageChange(e.target.files)
                field.onChange(e.target.files)
              }}
              hidden
            />
          )}
        />
        {imageSelected && <img src={imagePreview} alt="Avatar" />}
        <div className={cx('image-input')}>
          <FontAwesomeIcon className={cx('icon')} icon={faCamera} />
          <p>{t('update_photo')}</p>
        </div>
      </div>
      <span>
        {t('allowed')} *.jpeg, *.jpg, *.png, *.gif
        <br />
        {t('max_size', { size: '3145728' })}
      </span>
      <p className={cx('errorMessage')}>
        <ErrorMessage errors={formState.errors} name={'image'} />
      </p>
    </div>
  )
}
