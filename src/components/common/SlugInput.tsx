import classNames from 'classnames/bind'

import styles from './common.module.scss'

const cx = classNames.bind(styles)

interface SlugProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
}

export default function SlugInput({ label, ...props }: SlugProps) {
  return (
    <div className={cx('slug')}>
      <label htmlFor={label}>{label}</label>
      <input name="slug" id={label} type="text" {...props} />
    </div>
  )
}
