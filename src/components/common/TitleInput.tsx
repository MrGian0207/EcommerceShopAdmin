import classNames from 'classnames/bind'

import styles from './common.module.scss'

const cx = classNames.bind(styles)

interface TitleInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
}

export default function TitleInput({ label, ...props }: TitleInputProps) {
  return (
    <div className={cx('title')}>
      <label htmlFor={label}>{label}</label>
      <input name="title" id={label} type="text" {...props} />
    </div>
  )
}
