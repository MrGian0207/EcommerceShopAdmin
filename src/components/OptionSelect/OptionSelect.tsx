import { forwardRef, ForwardRefRenderFunction } from 'react'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { OptionSelectProps } from '~/types/InputType'
import classNames from 'classnames/bind'

import styles from './OptionSelect.module.scss'

const cx = classNames.bind(styles)

// Thêm kiểu dữ liệu cho ref
const OptionSelect: ForwardRefRenderFunction<HTMLSelectElement, OptionSelectProps> = (
  { name, labelName, options, defaultValue, ...props },
  ref
) => {
  return (
    <div className={cx('selected-box')}>
      <label>{labelName}</label>
      <div className={cx('options-box')}>
        <select
          ref={ref}
          name={name}
          className={cx('custom-select')}
          defaultValue={defaultValue}
          {...props}
        >
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
    </div>
  )
}

export default forwardRef(OptionSelect)
