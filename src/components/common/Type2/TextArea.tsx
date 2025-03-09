import React from 'react'

import { ErrorMessage } from '@hookform/error-message'
import classNames from 'classnames/bind'
import { useFormContext } from 'react-hook-form'

import styles from './common.module.scss'

import { TextAreaProps } from '~/types/FormElementType'
import { IFormValues } from '~/types/FormValuesType'

const cx = classNames.bind(styles)

export default function TextArea({ label, name, rules, ...props }: TextAreaProps) {
  const { register, formState } = useFormContext<IFormValues>()

  return (
    <div style={{ width: '100%' }}>
      <div className={cx('textarea')}>
        <label className={cx('label')} htmlFor={label}>
          {label}
        </label>
        <textarea id={label} {...register(name, rules)} {...props}></textarea>
      </div>
      <p className={cx('errorMessage')}>
        <ErrorMessage errors={formState.errors} name={name} />
      </p>
    </div>
  )
}
