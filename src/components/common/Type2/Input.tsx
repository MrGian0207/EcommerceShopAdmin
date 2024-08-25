import React, { useMemo, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ErrorMessage } from '@hookform/error-message'
import { InputProps } from '~/types/FormElementType'
import { IFormValues } from '~/types/FormValuesType'
import classNames from 'classnames/bind'
import { useFormContext } from 'react-hook-form'

import styles from './common.module.scss'

const cx = classNames.bind(styles)

export default function Input({
  label,
  name,
  rules,
  iconLeft,
  iconRight,
  type = 'text',
  ...props
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false)
  const handleShowPassword = () => setShowPassword((prev) => !prev)
  const inputType = iconRight && type === 'password' ? (showPassword ? 'text' : 'password') : type

  const { register, formState } = useFormContext<IFormValues>()

  const leftIcon = useMemo(
    () =>
      iconLeft && (
        <span className={cx('icon-left')}>
          <FontAwesomeIcon icon={iconLeft} />
        </span>
      ),
    [iconLeft]
  )

  const rightIcon = useMemo(
    () =>
      iconRight && (
        <span className={cx('icon-right')} onClick={handleShowPassword}>
          <FontAwesomeIcon icon={iconRight} />
        </span>
      ),
    [iconRight]
  )

  return (
    <div>
      <div className={cx('input')}>
        <label className={cx('label')} htmlFor={label}>
          {label}
        </label>
        {leftIcon}
        <input id={label} {...register(name, rules)} type={inputType} {...props} />
        {rightIcon}
      </div>
      <p className={cx('errorMessage')}>
        <ErrorMessage errors={formState.errors} name={name} />
      </p>
    </div>
  )
}
