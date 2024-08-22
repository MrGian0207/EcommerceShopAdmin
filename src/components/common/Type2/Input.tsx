import React, { useMemo, useState } from 'react'
import { IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames/bind'

import styles from './common.module.scss'

const cx = classNames.bind(styles)

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  iconLeft?: IconDefinition
  iconRight?: IconDefinition
}

export default function Input({ label, iconLeft, iconRight, type = 'text', ...props }: InputProps) {
  const [showPassword, setShowPassword] = useState(false)
  const handleShowPassword = () => setShowPassword((prev) => !prev)
  const inputType = iconRight && type === 'password' ? (showPassword ? 'text' : 'password') : type

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
    <div className={cx('input')}>
      <label className={cx('label')} htmlFor={label}>
        {label}
      </label>
      {leftIcon}
      <input id={label} type={inputType} {...props} />
      {rightIcon}
    </div>
  )
}
