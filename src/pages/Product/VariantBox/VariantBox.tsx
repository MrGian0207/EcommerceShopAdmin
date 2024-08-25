import React from 'react'
import VariantItems from '~/components/VariantItems'
import { VariantType } from '~/types/DataType'
import classNames from 'classnames/bind'

import styles from '../ProductAdd/ProductAdd.module.scss'

const cx = classNames.bind(styles)

function VariantBox({
  variantArray,
  defaultVariant,
}: {
  variantArray: VariantType[]
  defaultVariant?: string
}) {
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
