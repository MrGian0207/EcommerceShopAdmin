import React from 'react'
import classNames from 'classnames/bind'
import { useFormContext } from 'react-hook-form'

import styles from './Toggle.module.scss'

const cx = classNames.bind(styles)

interface IFormValues {
  featureProduct: boolean
}

interface ToggleProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  name: keyof IFormValues
}

export default function Toggle({ label, name, ...props }: ToggleProps) {
  const { register } = useFormContext<IFormValues>()

  return (
    <div className={cx('container')}>
      <div className={cx('toggle-box')}>
        <input id={label} type="checkbox" {...register(name)} {...props} />
        <label htmlFor={label} className={cx('toggle-switch')}></label>
      </div>
      <label>{label}</label>
    </div>
  )
}
