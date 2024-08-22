import React from 'react'
import classNames from 'classnames/bind'

import styles from './common.module.scss'

const cx = classNames.bind(styles)

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
}

export default function TextArea({ label, ...props }: TextAreaProps) {
  return (
    <div style={{ width: '100%' }}>
      <div className={cx('textarea')}>
        <label className={cx('label')} htmlFor={label}>
          {label}
        </label>
        <textarea id={label} {...props}></textarea>
      </div>
    </div>
  )
}
