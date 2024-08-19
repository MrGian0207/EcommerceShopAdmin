import classNames from 'classnames/bind'

import styles from './common.module.scss'

const cx = classNames.bind(styles)

interface DescriptionInputProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
}

export default function DescriptionInput({ label, ...props }: DescriptionInputProps) {
  return (
    <div className={cx('description')}>
      <label htmlFor={label}>{label}</label>
      <textarea name="description" id={label} rows={9} {...props}></textarea>
    </div>
  )
}
