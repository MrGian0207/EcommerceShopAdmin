import { ErrorMessage } from '@hookform/error-message'
import classNames from 'classnames/bind'
import { RegisterOptions, useFormContext } from 'react-hook-form'

import styles from './common.module.scss'

const cx = classNames.bind(styles)

interface IFormValues {
  description: string
}
interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  name: keyof IFormValues
  rules?: RegisterOptions<IFormValues, keyof IFormValues>
}

export default function TextArea({ label, name, rules, ...props }: TextAreaProps) {
  const { register, formState } = useFormContext<IFormValues>()
  return (
    <div style={{ width: '100%' }}>
      <div className={cx('textarea')}>
        <label className={cx('label')} htmlFor={label}>
          {label}
        </label>
        <textarea id={label} {...register(name, rules)} {...props}></textarea>
        <p className={cx('errorMessage')}>
          <ErrorMessage errors={formState.errors} name={name} />
        </p>
      </div>
    </div>
  )
}
