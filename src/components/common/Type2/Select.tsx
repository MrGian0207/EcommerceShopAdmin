import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ErrorMessage } from '@hookform/error-message'
import { SelectProps } from '~/types/FormElementType'
import { IFormValues } from '~/types/FormValuesType'
import classNames from 'classnames/bind'
import { useFormContext } from 'react-hook-form'

import styles from './common.module.scss'

const cx = classNames.bind(styles)

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
