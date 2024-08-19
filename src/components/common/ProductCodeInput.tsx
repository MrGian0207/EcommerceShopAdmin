import classNames from 'classnames/bind'

import styles from './common.module.scss'

const cx = classNames.bind(styles)

interface ProductCodeProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
}

export default function ProductCodeInput({ label, ...props }: ProductCodeProps) {
  return (
    <div className={cx('productCode')}>
      <label htmlFor={label}>{label}</label>
      <input name="productCode" id={label} type="text" {...props} />
    </div>
  )
}
