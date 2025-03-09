import React, { memo, useEffect, useState } from 'react'

import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import ReactModal from 'react-modal'

import OptionSelect from '~/components/common/OptionSelect'
import Toggle from '~/components/common/ToggleButton/Toggle'
import { Input } from '~/components/common/Type1'
import VariantForm from '~/components/VariantForm'

import ProductSkeleton from '../ProductComponent/ProductSkeleton/ProductSkeleton'
import Tag from '../ProductComponent/Tag'
import VariantBox from '../ProductComponent/VariantBox'
import { ProductRules } from '../ProductRules'

import styles from './ProductEdit.module.scss'

import { ProductRoute } from '~/constant/PageRoute'
import { genderOptionsConstant, statusOptionsConstant } from '~/constant/SelectOptions'
import { useAuth } from '~/context/AuthContext'
import { useModal } from '~/context/ModalContext'
import { usePath } from '~/context/PathContext'
import { useProduct } from '~/context/ProductContext'
import ActionLayout from '~/layouts/ActionLayout'
import DefaultLayout from '~/layouts/DefaultLayout'
import { OptionType, ProductType } from '~/types/DataType'
import { handleSetDataOptions } from '~/utils/HandleSetDataOptions'

const cx = classNames.bind(styles)

function ProductEdit() {
  const { t } = useTranslation('product')

  const { path } = usePath()
  const { accessToken } = useAuth()
  const { isEdit, setIsEdit, toggleModal, setToggleModal } = useModal()
  const { product, setProduct, variants, setVariantImage, setVariants } = useProduct()

  const [loading, setLoading] = useState(true)
  const [mainCategoriesOptions, setMainCategoriesOptions] = useState<OptionType[]>([])
  const [subCategoriesOptions, setSubCategoriesOptions] = useState<OptionType[]>([])

  const [brandOptions, setBrandOptions] = useState<OptionType[]>([])
  const [genderOptions, setGenderOptions] = useState<OptionType[]>([])
  const [statusOptions, setStatusOptions] = useState<OptionType[]>([])
  const [tags, setTags] = useState<string[]>([])

  const handleAddVariant = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    e.stopPropagation()
    setToggleModal(true)
    setIsEdit(false)
    setVariantImage([])
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [mainCategoriesRes, subCategoriesRes, brandsRes, productRes] = await Promise.all([
          fetch(`${process.env.REACT_APP_BACKEND_URL}/categories/main-categories/name`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              Authorization: `Bearer ${accessToken}`,
            },
          }),
          fetch(`${process.env.REACT_APP_BACKEND_URL}/categories/sub-categories/name`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              Authorization: `Bearer ${accessToken}`,
            },
          }),
          fetch(`${process.env.REACT_APP_BACKEND_URL}/brands/name`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              Authorization: `Bearer ${accessToken}`,
            },
          }),
          fetch(`${process.env.REACT_APP_BACKEND_URL}${path}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }),
        ])

        const [mainCategoriesData, subCategoriesData, brandsData, productData] = await Promise.all([
          mainCategoriesRes.json(),
          subCategoriesRes.json(),
          brandsRes.json(),
          productRes.json(),
        ])

        const mainCategories: OptionType[] = mainCategoriesData.data
        const subCategories: OptionType[] = subCategoriesData.data
        const brands: OptionType[] = brandsData.data
        const genderOptions: OptionType[] = genderOptionsConstant
        const statusOptions: OptionType[] = statusOptionsConstant
        const data: ProductType = productData

        handleSetDataOptions(mainCategories, setMainCategoriesOptions)
        handleSetDataOptions(subCategories, setSubCategoriesOptions)
        handleSetDataOptions(brands, setBrandOptions)
        handleSetDataOptions(genderOptions, setGenderOptions)
        handleSetDataOptions(statusOptions, setStatusOptions)
        setProduct(data)
        setVariants(data.variants)
        setTags(data.tags)
      } catch (err) {
        console.error('Error fetching data:', err)
      } finally {
        setTimeout(() => {
          setLoading(false)
        }, 500)
      }
    }
    fetchData()
  }, [accessToken, path, setProduct, setVariants])

  useEffect(() => {
    document.title = 'Edit Product | MrGianStore'
  }, [])

  return (
    <div className={cx('add')}>
      <DefaultLayout active={'product'} page={ProductRoute.ProductEditPage}>
        {loading ? (
          <ProductSkeleton />
        ) : (
          <ActionLayout
            leftColumn={
              <React.Fragment>
                <Input
                  name="name"
                  label={t('product_name')}
                  defaultValue={product.name}
                  rules={ProductRules.name}
                />
                <Input
                  name="title"
                  label={t('title', { ns: 'form' })}
                  defaultValue={product.title}
                  rules={ProductRules.title}
                />

                <div className={cx('row')}>
                  <OptionSelect
                    name="category"
                    label={t('category', { ns: 'form' })}
                    defaultValue={product.category}
                    options={mainCategoriesOptions}
                  />
                  <OptionSelect
                    name="subCategory"
                    label={t('subCategory', { ns: 'form' })}
                    defaultValue={product.subCategory}
                    options={subCategoriesOptions}
                  />
                </div>

                <div className={cx('row')}>
                  <OptionSelect
                    name="brand"
                    label={t('brand', { ns: 'form' })}
                    defaultValue={product.brand}
                    options={brandOptions}
                  />
                  <OptionSelect
                    name="gender"
                    label={t('gender', { ns: 'form' })}
                    defaultValue={product.gender}
                    options={genderOptions}
                  />
                </div>

                <div className={cx('row')}>
                  <OptionSelect
                    name="status"
                    label={t('status', { ns: 'form' })}
                    defaultValue={product.status}
                    options={statusOptions}
                  />
                  <Input
                    name="productCode"
                    label={t('productCode', { ns: 'form' })}
                    defaultValue={product.productCode}
                    rules={ProductRules.productCode}
                  />
                </div>

                <Tag tags={tags} setTags={setTags} />
              </React.Fragment>
            }
            rightColumn={
              <React.Fragment>
                <div className={cx('right-column')}>
                  <Input
                    name="slug"
                    label={t('slug', { ns: 'form' })}
                    defaultValue={product.slug}
                    rules={ProductRules.slug}
                  />

                  <Input
                    name="description"
                    label={t('description', { ns: 'form' })}
                    defaultValue={product.description}
                    rules={ProductRules.description}
                  />

                  <Toggle
                    defaultChecked={product.featureProduct === 'true'}
                    name="featureProduct"
                    label={t('feature_product', { ns: 'form' })}
                  />

                  <VariantBox variantArray={variants} defaultVariant={product.defaultVariant} />

                  <button className={cx('button')} onClick={handleAddVariant}>
                    {t('actions.add_variant')}
                  </button>

                  <ReactModal
                    isOpen={toggleModal}
                    onRequestClose={() => {
                      setToggleModal(!toggleModal)
                    }}
                    ariaHideApp={false}
                    className={cx('custom-modal')}
                    overlayClassName={cx('overlay-custom')}
                    bodyOpenClassName={cx('body-open-custom')}
                  >
                    <VariantForm nameForm="Variants" isEdit={isEdit} />
                  </ReactModal>
                </div>
              </React.Fragment>
            }
            nameButtonSubmit={t('actions.edit_product')}
            tags={tags}
            hasVariant={true}
          />
        )}
      </DefaultLayout>
    </div>
  )
}

export default memo(ProductEdit)
