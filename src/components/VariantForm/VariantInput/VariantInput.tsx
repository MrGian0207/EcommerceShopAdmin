import { ErrorMessage } from '@hookform/error-message'
import { VariantInputProp } from '~/types/FormElementType'
import { IFormValues } from '~/types/FormValuesType'
import classNames from 'classnames/bind'
import { useFormContext } from 'react-hook-form'

import styles from '../VariantForm.module.scss'

const cx = classNames.bind(styles)

export default function VariantInput({ label, name, rules, ...props }: VariantInputProp) {
  const { register, formState } = useFormContext<IFormValues>()

  return (
    <div className={cx('variant-input-box')}>
      <label htmlFor={label}>{label}</label>
      <input id={label} {...register(name, rules)} {...props} />
      <p className={cx('errorMessage')}>
        <ErrorMessage errors={formState.errors} name={name} />
      </p>
    </div>
  )
}
