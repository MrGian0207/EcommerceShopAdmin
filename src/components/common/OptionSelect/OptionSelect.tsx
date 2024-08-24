import { faChevronDown, IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ErrorMessage } from '@hookform/error-message'
import classNames from 'classnames/bind'
import { RegisterOptions, useFormContext } from 'react-hook-form'

import styles from './OptionSelect.module.scss'

const cx = classNames.bind(styles)

interface IFormValues {
  category: string
  subCategory: string
  brand: string
  gender: string
  status: string
  role: string
}

interface OptionType {
  label: string
  value: string
}

interface OptionSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  name: keyof IFormValues
  rules?: RegisterOptions<IFormValues, keyof IFormValues>
  label?: string
  icon?: IconDefinition
  options?: OptionType[]
}

// Thêm kiểu dữ liệu cho ref
const OptionSelect = ({ name, rules, label, icon, options, ...props }: OptionSelectProps) => {
  const { register, formState } = useFormContext<IFormValues>()
  return (
    <div className={cx('selected-box')}>
      <label>{label}</label>
      {icon && (
        <span className={cx('icon-left')}>
          <FontAwesomeIcon icon={icon} />
        </span>
      )}
      <div className={cx('options-box')}>
        <select className={cx('custom-select')} {...register(name, rules)} {...props}>
          {options?.map((option) => {
            return (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            )
          })}
        </select>
        <div className={cx('custom-select-arrow')}>
          <FontAwesomeIcon className={cx('icon')} icon={faChevronDown} />
        </div>
      </div>
      <p className={cx('errorMessage')}>
        <ErrorMessage errors={formState.errors} name={name} />
      </p>
    </div>
  )
}

export default OptionSelect
