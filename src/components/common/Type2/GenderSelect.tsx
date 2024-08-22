import React from 'react'
import { IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames/bind'

import styles from './common.module.scss'

const cx = classNames.bind(styles)

interface GenderSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  icon?: IconDefinition
  options: string[]
}

export default function Select({ label, icon, options, ...props }: GenderSelectProps) {
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
      <select id={label} {...props}>
        {options.map((value, index) => (
          <option key={`${value}-${index}`} value={value}>
            {value}
          </option>
        ))}
      </select>
    </div>
  )
}
