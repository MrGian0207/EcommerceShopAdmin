import React from 'react'
import VariantItems from '~/components/VariantItems'
import classNames from 'classnames/bind'

import styles from '../ProductAdd/ProductAdd.module.scss'

const cx = classNames.bind(styles)

export interface VariantType {
  variantID?: string
  variantName: string
  variantSize: string
  variantColor: string
  variantProductSKU: string
  variantQuantity: number
  variantRegularPrice: number
  variantSalePrice: number
  variantImages: File[] | string[]
}

function VariantBox({
  variantArray,
  defaultVariant,
}: {
  variantArray: VariantType[]
  defaultVariant?: string
}) {
  console.log(defaultVariant)
  return (
    <div className={cx('variant-box')}>
      {variantArray && <h3 className={cx('variant-label')}>Variants</h3>}
      {variantArray &&
        variantArray.map((variant, variantIndex) => (
          <div key={`${variant.variantName}-${variantIndex}`}>
            <VariantItems
              variantID={variant.variantID}
              variantName={variant.variantName}
              variantSize={variant.variantSize}
              variantColor={variant.variantColor}
              variantSalePrice={variant.variantSalePrice}
              isDefaultVariant={defaultVariant === variant.variantName}
            />
          </div>
        ))}
    </div>
  )
}
export default VariantBox
