import { ErrorMessage } from '@hookform/error-message'
import classNames from 'classnames/bind'
import { RegisterOptions, useFormContext } from 'react-hook-form'

import styles from '../VariantForm.module.scss'

const cx = classNames.bind(styles)

interface IFormValues {
  variantID: string
  variantName: string
  variantSize: string
  variantColor: string
  variantProductSKU: string
  variantQuantity: number
  variantRegularPrice: number
  variantSalePrice: number
}

interface VariantInputProp extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  name: keyof IFormValues
  options?: RegisterOptions<IFormValues, keyof IFormValues>
}

export default function VariantInput({ label, name, options, ...props }: VariantInputProp) {
  const { register, formState } = useFormContext<IFormValues>()

  return (
    <div className={cx('variant-input-box')}>
      <label htmlFor={label}>{label}</label>
      <input id={label} {...register(name, options)} {...props} />
      <p className={cx('errorMessage')}>
        <ErrorMessage errors={formState.errors} name={name} />
      </p>
    </div>
  )
}
