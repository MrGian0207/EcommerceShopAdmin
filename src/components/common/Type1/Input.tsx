import React from 'react'
import { ErrorMessage } from '@hookform/error-message'
import classNames from 'classnames/bind'
import { RegisterOptions, useFormContext } from 'react-hook-form'

import styles from './common.module.scss'

const cx = classNames.bind(styles)

interface IFormValues {
  name: string
  title: string
  slug: string
  description: string
  image: FileList
  productCode: string
  heading: string
  primaryButtonText: string
  primaryButtonLink: string
  secondaryButtonText: string
  secondaryButtonLink: string
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  name: keyof IFormValues
  rules?: RegisterOptions<IFormValues, keyof IFormValues>
}

const Input = ({ label, name, rules, ...props }: InputProps) => {
  const { register, formState } = useFormContext<IFormValues>()
  return (
    <div className={cx('input')}>
      <label htmlFor={label}>{label}</label>
      <input id={label} {...register(name, rules)} {...props} />
      <p className={cx('errorMessage')}>
        <ErrorMessage errors={formState.errors} name={name} />
      </p>
    </div>
  )
}

export default Input
