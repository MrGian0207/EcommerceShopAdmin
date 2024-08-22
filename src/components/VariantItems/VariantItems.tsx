import { faExpand, faPalette, faPen, faTrash, faWallet } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useModal } from '~/context/ModalContext'
import { useProduct } from '~/context/ProductContext'
import { VariantItemsType, VariantType } from '~/types/VariantType'
import classNames from 'classnames/bind'

import styles from './VariantItems.module.scss'

const cx = classNames.bind(styles)

function VariantItems({
  variantID,
  variantName,
  variantSize,
  variantColor,
  variantSalePrice,
  isDefaultVariant = false,
}: VariantItemsType): JSX.Element {
  const { setIsEdit, setToggleModal } = useModal()
  const { setVariantIsEdit, variants, setVariants, setVariantImage } = useProduct()

  const handleEditVariant = () => {
    const variantIsEdit: VariantType = variants.filter(
      (variant) => variant.variantID === variantID
    )[0]
    setIsEdit(true)
    setVariantIsEdit(variantIsEdit)
    setVariantImage(variantIsEdit.variantImages as File[])
    setToggleModal(true)
  }

  const handleDeleteVariant = () => {
    setVariants((prevVariants) => prevVariants.filter((variant) => variant.variantID !== variantID))
  }

  return (
    <div className={cx('variant')}>
      <input
        defaultChecked={isDefaultVariant}
        type="radio"
        name="defaultVariant"
        value={variantName}
      />
      <div className={cx('variant-value')}>
        <div className={cx('column-first')}>
          <div className={cx('description-variant')}>
            <h6>{variantName ? variantName : 'Covermax Full Coverage foundation'}</h6>
            <div className={cx('feature')}>
              <div className={cx('item-feature')}>
                <FontAwesomeIcon icon={faPalette} />
                <span>{variantColor ? variantColor : 'Cream'}</span>
              </div>
              <div className={cx('item-feature')}>
                <FontAwesomeIcon icon={faExpand} />
                <span>{variantSize ? variantSize : 'Medium'}</span>
              </div>
            </div>
          </div>
        </div>

        <div className={cx('column-second')}>
          <div className={cx('variant-priceSale')}>
            <div className={cx('icon')}>
              <FontAwesomeIcon icon={faWallet} />
            </div>
            <span>{variantSalePrice ? variantSalePrice : '37'}</span>
          </div>

          <div className={cx('button-action')}>
            {/* Edit Variant Items */}
            <div className={cx('icon-edit-variant')} onClick={handleEditVariant}>
              <FontAwesomeIcon className={cx('icon')} icon={faPen} />
            </div>

            {/* Delete Variant Items */}
            <div className={cx('icon-delete-variant')} onClick={handleDeleteVariant}>
              <FontAwesomeIcon className={cx('icon')} icon={faTrash} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VariantItems
