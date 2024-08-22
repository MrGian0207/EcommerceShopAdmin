import classNames from 'classnames/bind'

import styles from '../VariantForm.module.scss'

const cx = classNames.bind(styles)

export function VariantName({ ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className={cx('variant-name-box')}>
      <label htmlFor="variantName">Variant Name</label>
      <input {...props} name="variantName" id="variantName" type="text" />
    </div>
  )
}

export function VariantSize({ ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className={cx('variant-size-box')}>
      <label htmlFor="variantSize">Size</label>
      <input {...props} name="variantSize" id="variantSize" type="text" />
    </div>
  )
}

export function VariantColor({ ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className={cx('variant-color-box')}>
      <label htmlFor="variantColor">Color</label>
      <input {...props} name="variantColor" id="variantColor" type="text" />
    </div>
  )
}

export function VariantProductSKU({ ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className={cx('variant-productSKU-box')}>
      <label htmlFor="variantProductSKU">Product SKU</label>
      <input {...props} name="variantProductSKU" id="variantProductSKU" type="text" />
    </div>
  )
}

export function VariantQuantity({ ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className={cx('variant-quantity-box')}>
      <label htmlFor="variantQuantity">Quantity</label>
      <input {...props} name="variantQuantity" id="variantQuantity" type="text" />
    </div>
  )
}

export function VariantRegularPrice({ ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className={cx('variant-regularPrice-box')}>
      <label htmlFor="variantRegularPrice">Regular Price</label>
      <input {...props} name="variantRegularPrice" id="variantRegularPrice" type="text" />
    </div>
  )
}

export function VariantSalePrice({ ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className={cx('variant-salePrice-box')}>
      <label htmlFor="variantSalePrice">Sale Price</label>
      <input {...props} name="variantSalePrice" id="variantSalePrice" type="text" />
    </div>
  )
}
