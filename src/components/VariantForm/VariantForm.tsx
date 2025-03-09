import React, { FormEvent } from 'react'

import classNames from 'classnames/bind'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import styles from './VariantForm.module.scss'
import { VariantImage, VariantInput } from './VariantInput'

import { useModal } from '~/context/ModalContext'
import { useProduct } from '~/context/ProductContext'
import { emptyVariant, VariantFormType, VariantType } from '~/types/DataType'
import { IFormValues } from '~/types/FormValuesType'

const cx = classNames.bind(styles)

function VariantForm({ nameForm, isEdit }: VariantFormType) {
  const { t } = useTranslation('product')

  const { setToggleModal } = useModal()
  const { variantIsEdit, variants, setVariants, variantImage } = useProduct()
  const methods = useForm<IFormValues>()

  const variant: VariantType = isEdit ? variantIsEdit : emptyVariant

  const handleCancelModal = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    e.stopPropagation()
    setToggleModal(false)
  }

  const handleSaveModal = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    e.stopPropagation()
    methods.handleSubmit(onSubmit)()
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

    if (variants.length === 0) {
      setVariants([variant])
    } else {
      setVariants((prevVariants) => {
        const indexExistedVariant = isEdit
          ? prevVariants.findIndex((v) => v.variantID === variantIsEdit.variantID)
          : -1

        if (indexExistedVariant === -1) {
          return [...prevVariants, variant] // Thêm mới
        } else {
          return prevVariants.map((v, i) => (i === indexExistedVariant ? variant : v)) // Cập nhật phần tử
        }
      })
    }

    setToggleModal(false)
  }

  return (
    <FormProvider {...methods}>
      <form className={cx('form-variant')} onSubmit={handleSaveModal}>
        <h2 className={cx('name-modal')}>{nameForm}</h2>
        <VariantInput
          rules={{ required: 'is Required' }}
          name="variantName"
          label={t('variant.variant_name')}
          defaultValue={variant.variantName}
        />
        <div className={cx('row')}>
          <VariantInput
            rules={{ required: 'is Required' }}
            name="variantSize"
            label={t('variant.variant_size')}
            defaultValue={variant.variantSize}
          />
          <VariantInput
            rules={{ required: 'is Required' }}
            name="variantColor"
            label={t('variant.variant_color')}
            defaultValue={variant.variantColor}
          />
          <VariantInput
            rules={{ required: 'is Required' }}
            name="variantProductSKU"
            label={t('variant.variant_product_sku')}
            defaultValue={variant.variantProductSKU}
          />
        </div>

        <div className={cx('row')}>
          <VariantInput
            rules={{ required: 'is Required' }}
            name="variantQuantity"
            label={t('variant.variant_quantity')}
            type="number"
            min={0}
            defaultValue={variant.variantQuantity}
          />
          <VariantInput
            rules={{ required: 'is Required' }}
            name="variantRegularPrice"
            label={t('variant.variant_regular_price')}
            type="number"
            min={0}
            defaultValue={variant.variantRegularPrice}
          />
          <VariantInput
            rules={{ required: 'is Required' }}
            name="variantSalePrice"
            label={t('variant.variant_sale_price')}
            type="number"
            min={0}
            defaultValue={variant.variantSalePrice}
          />
        </div>

        <VariantImage />

        <div className={cx('row-button')}>
          <button className={cx('btn-cancel')} onClick={handleCancelModal}>
            {t('actions.cancel', { ns: 'common' })}
          </button>

          <button className={cx('btn-save')} type="submit">
            {t('actions.save', { ns: 'common' })}
          </button>
        </div>
      </form>
    </FormProvider>
  )
}

export default VariantForm
