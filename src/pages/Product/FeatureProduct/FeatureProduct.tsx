import classNames from 'classnames/bind'

import styles from '../ProductAdd/ProductAdd.module.scss'

const cx = classNames.bind(styles)

function FeatureProduct({ ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className={cx('feature-product')}>
      <div className={cx('toggle-box')}>
        <input name="featureProduct" type="checkbox" id="toggle" {...props} />
        <label htmlFor="toggle" className={cx('toggle-switch')}></label>
      </div>
      <label>Feature Product</label>
    </div>
  )
}

export default FeatureProduct
