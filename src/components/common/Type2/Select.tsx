import React from 'react'
import { IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ErrorMessage } from '@hookform/error-message'
import classNames from 'classnames/bind'
import { RegisterOptions, useFormContext } from 'react-hook-form'

import styles from './common.module.scss'

const cx = classNames.bind(styles)

interface IFormValues {
  gender: string
  role: string
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  name: keyof IFormValues
  rules?: RegisterOptions<IFormValues, keyof IFormValues>
  icon?: IconDefinition
  options: string[]
}

export default function Select({ label, name, rules, icon, options, ...props }: SelectProps) {
  const { register, formState } = useFormContext<IFormValues>()

  return (
    <div className={cx('select')}>
      <label className={cx('label')} htmlFor="gender">
        {label}
      </label>
      {icon && (
        <span className={cx('icon-left')}>
          <FontAwesomeIcon icon={icon} />
        </span>
      )}
      <select id={label} {...register(name, rules)} {...props}>
        {options.map((value, index) => (
          <option key={`${value}-${index}`} value={value}>
            {value}
          </option>
        ))}
      </select>
      <p className={cx('errorMessage')}>
        <ErrorMessage errors={formState.errors} name={name} />
      </p>
    </div>
  )
}
