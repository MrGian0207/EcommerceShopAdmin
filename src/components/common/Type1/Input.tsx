import classNames from 'classnames/bind'

import styles from './common.module.scss'

const cx = classNames.bind(styles)

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
}

export default function Input({ label, type = 'text', ...props }: InputProps) {
  return (
    <div className={cx('input')}>
      <label htmlFor={label}>{label}</label>
      <input id={label} type={type} {...props} />
    </div>
  )
}
