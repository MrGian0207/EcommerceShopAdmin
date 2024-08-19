import classNames from 'classnames/bind'

import styles from './common.module.scss'

const cx = classNames.bind(styles)

interface NameInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
}

export default function NameInput({ label, ...props }: NameInputProps) {
  return (
    <div className={cx('name')}>
      <label htmlFor={label}>{label}</label>
      <input name="name" id={label} type="text" {...props} />
    </div>
  )
}
