import { ErrorMessage } from '@hookform/error-message'
import { InputProps } from '~/types/FormElementType'
import { IFormValues } from '~/types/FormValuesType'
import classNames from 'classnames/bind'
import { useFormContext } from 'react-hook-form'

import styles from './common.module.scss'

const cx = classNames.bind(styles)

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
