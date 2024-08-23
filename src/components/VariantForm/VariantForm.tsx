import { FormEvent } from 'react'
import { useModal } from '~/context/ModalContext'
import { useProduct } from '~/context/ProductContext'
import { VariantFormType, VariantType } from '~/types/VariantType'
import classNames from 'classnames/bind'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'

import styles from './VariantForm.module.scss'
import { VariantImage, VariantInput } from './VariantInput'

const cx = classNames.bind(styles)

interface IFormValues {
  variantID: string
  variantName: string
  variantSize: string
  variantColor: string
  variantProductSKU: string
  variantQuantity: number
  variantRegularPrice: number
  variantSalePrice: number
}

function VariantForm({ nameForm, isEdit }: VariantFormType): JSX.Element {
  const { setToggleModal } = useModal()
  const { variantIsEdit, variants, setVariants, variantImage } = useProduct()
  const methods = useForm<IFormValues>()

  const emptyVariant: VariantType = {
    variantID: '',
    variantName: '',
    variantSize: '',
    variantColor: '',
    variantProductSKU: '',
    variantQuantity: 0,
    variantRegularPrice: 0,
    variantSalePrice: 0,
    variantImages: [],
  }

  const variant: VariantType = isEdit ? variantIsEdit : emptyVariant

  const handleCancelModal = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    e.stopPropagation()
    setToggleModal(false)
  }

  const onSubmit: SubmitHandler<IFormValues> = (data) => {
    const variant: VariantType = {
      variantID: isEdit ? variantIsEdit.variantID : String(variants.length),
      variantName: data.variantName,
      variantSize: data.variantSize,
      variantColor: data.variantColor,
      variantProductSKU: data.variantProductSKU,
      variantQuantity: data.variantQuantity,
      variantRegularPrice: data.variantRegularPrice,
      variantSalePrice: data.variantSalePrice,
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

  const handleSaveModal = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    e.stopPropagation()
    methods.handleSubmit(onSubmit)()
  }

  return (
    <FormProvider {...methods}>
      <form className={cx('form-variant')} onSubmit={handleSaveModal}>
        <h2 className={cx('name-modal')}>{nameForm}</h2>
        <VariantInput
          options={{ required: 'is Required' }}
          label="Variant Name"
          name="variantName"
          defaultValue={variant.variantName}
        />
        <div className={cx('row')}>
          <VariantInput
            options={{ required: 'is Required' }}
            label="Size"
            name="variantSize"
            defaultValue={variant.variantSize}
          />
          <VariantInput
            options={{ required: 'is Required' }}
            label="Color"
            name="variantColor"
            defaultValue={variant.variantColor}
          />
          <VariantInput
            options={{ required: 'is Required' }}
            label="Product SKU"
            name="variantProductSKU"
            defaultValue={variant.variantProductSKU}
          />
        </div>

        <div className={cx('row')}>
          <VariantInput
            options={{ required: 'is Required' }}
            label="Quantity"
            name="variantQuantity"
            type="number"
            min={0}
            defaultValue={variant.variantQuantity}
          />
          <VariantInput
            options={{ required: 'is Required' }}
            label="Regular Price"
            name="variantRegularPrice"
            type="number"
            min={0}
            defaultValue={variant.variantRegularPrice}
          />
          <VariantInput
            options={{ required: 'is Required' }}
            label="Sale Price"
            name="variantSalePrice"
            type="number"
            min={0}
            defaultValue={variant.variantSalePrice}
          />
        </div>

        <VariantImage variantID={variant.variantID} />

        <div className={cx('row-button')}>
          <button className={cx('btn-cancel')} onClick={handleCancelModal}>
            Cancel
          </button>

          <button className={cx('btn-save')} type="submit">
            Save
          </button>
        </div>
      </form>
    </FormProvider>
  )
}

export default VariantForm
