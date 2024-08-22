import { useModal } from '~/context/ModalContext'
import { useProduct } from '~/context/ProductContext'
import { VariantFormType, VariantType } from '~/types/VariantType'
import classNames from 'classnames/bind'

import styles from './VariantForm.module.scss'
import {
  VariantColor,
  VariantImage,
  VariantName,
  VariantProductSKU,
  VariantQuantity,
  VariantRegularPrice,
  VariantSalePrice,
  VariantSize,
} from './VariantInput'

const cx = classNames.bind(styles)

function VariantForm({ nameForm, isEdit }: VariantFormType): JSX.Element {
  const { setToggleModal } = useModal()
  const { variantIsEdit, variants, setVariants, variantImage } = useProduct()

  const emptyVariant: VariantType = {
    variantName: ' ',
    variantSize: ' ',
    variantColor: ' ',
    variantProductSKU: ' ',
    variantQuantity: ' ',
    variantRegularPrice: ' ',
    variantSalePrice: ' ',
    variantImages: [],
  }

  const variant: VariantType = isEdit ? variantIsEdit : emptyVariant

  const handleCancelModal = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    e.stopPropagation()
    setToggleModal(false)
  }

  const handleSaveModal = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    e.stopPropagation()

    const variantFormData = new FormData(e.currentTarget)

    const variant: VariantType = {
      variantID: isEdit ? variantIsEdit.variantID : String(variants.length),
      variantName: String(variantFormData.get('variantName')) || '',
      variantSize: String(variantFormData.get('variantSize')) || '',
      variantColor: String(variantFormData.get('variantColor')) || '',
      variantProductSKU: String(variantFormData.get('variantProductSKU')) || '',
      variantQuantity: String(variantFormData.get('variantQuantity')) || '',
      variantRegularPrice: String(variantFormData.get('variantRegularPrice')) || '',
      variantSalePrice: String(variantFormData.get('variantSalePrice')) || '',
      variantImages: variantImage,
    }

    switch (true) {
      case variants.length === 0:
        setVariants([variant])
        break
      default:
        const indexExistedVariant: number = isEdit
          ? variants.findIndex((variant) => variant.variantID === variantIsEdit.variantID)
          : -1

        if (indexExistedVariant === -1) {
          setVariants((prevVariants) => [...prevVariants, variant])
        } else {
          setVariants((prevVariants) => {
            prevVariants[indexExistedVariant] = variant
            return prevVariants
          })
        }
    }
    setToggleModal(false)
  }

  return (
    <form className={cx('form-variant')} onSubmit={handleSaveModal}>
      <h2 className={cx('name-modal')}>{nameForm}</h2>
      <VariantName defaultValue={variant.variantName} />
      <div className={cx('row')}>
        <VariantSize defaultValue={variant.variantSize} />
        <VariantColor defaultValue={variant.variantColor} />
        <VariantProductSKU defaultValue={variant.variantProductSKU} />
      </div>

      <div className={cx('row')}>
        <VariantQuantity defaultValue={variant.variantQuantity} />
        <VariantRegularPrice defaultValue={variant.variantRegularPrice} />
        <VariantSalePrice defaultValue={variant.variantSalePrice} />
      </div>

      <VariantImage />

      <div className={cx('row-button')}>
        <button className={cx('btn-cancel')} onClick={handleCancelModal}>
          Cancel
        </button>

        <button className={cx('btn-save')} type="submit">
          Save
        </button>
      </div>
    </form>
  )
}

export default VariantForm
