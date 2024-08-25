import React, { memo, useEffect, useState } from 'react'
import OptionSelect from '~/components/common/OptionSelect'
import Toggle from '~/components/common/ToggleButton/Toggle'
import { Input } from '~/components/common/Type1'
import VariantForm from '~/components/VariantForm'
import { useAuth } from '~/context/AuthContext'
import { useModal } from '~/context/ModalContext'
import { usePath } from '~/context/PathContext'
import { useProduct } from '~/context/ProductContext'
import ActionLayout from '~/layouts/ActionLayout'
import DefaultLayout from '~/layouts/DefaultLayout'
import { OptionType, ProductType } from '~/types/DataType'
import { handleSetDataOptions } from '~/utils/HandleSetDataOptions'
import classNames from 'classnames/bind'
import ReactModal from 'react-modal'

import { ProductRules } from '../ProductRules'
import ProductSkeleton from '../ProductSkeleton/ProductSkeleton'
import Tag from '../Tag'
import VariantBox from '../VariantBox'
import styles from './ProductEdit.module.scss'

const cx = classNames.bind(styles)

function ProductEdit(): JSX.Element {
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
        const genderOptions: OptionType[] = [
          { value: 'None', label: 'None' },
          { value: 'Men', label: 'Men' },
          { value: 'Women', label: 'Women' },
          { value: 'Kids', label: 'Kids' },
          { value: 'Others', label: 'Others' },
        ]
        const statusOptions: OptionType[] = [
          { value: 'Sale', label: 'Sale' },
          { value: 'New', label: 'New' },
          { value: 'Regular', label: 'Regular' },
          { value: 'Disabled', label: 'Disabled' },
        ]
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
      <DefaultLayout active={'product'} page={['Dashboard', 'Product', 'Edit']}>
        {loading ? (
          <ProductSkeleton />
        ) : (
          <ActionLayout
            leftColumn={
              <React.Fragment>
                <Input
                  name="name"
                  label="Product Name"
                  defaultValue={product.name}
                  rules={ProductRules.name}
                />
                <Input
                  name="title"
                  label="Meta Title"
                  defaultValue={product.title}
                  rules={ProductRules.title}
                />

                <div className={cx('row')}>
                  <OptionSelect
                    label="Category"
                    name="category"
                    defaultValue={product.category}
                    options={mainCategoriesOptions}
                  />
                  <OptionSelect
                    label="Sub Category"
                    name="subCategory"
                    defaultValue={product.subCategory}
                    options={subCategoriesOptions}
                  />
                </div>

                <div className={cx('row')}>
                  <OptionSelect
                    label="Brand"
                    name="brand"
                    defaultValue={product.brand}
                    options={brandOptions}
                  />
                  <OptionSelect
                    label="Gender"
                    name="gender"
                    defaultValue={product.gender}
                    options={genderOptions}
                  />
                </div>

                <div className={cx('row')}>
                  <OptionSelect
                    label="Status"
                    name="status"
                    defaultValue={product.status}
                    options={statusOptions}
                  />
                  <Input
                    name="productCode"
                    label="Product Code"
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
                    label="Slug"
                    defaultValue={product.slug}
                    rules={ProductRules.slug}
                  />

                  <Input
                    name="description"
                    label="Description"
                    defaultValue={product.description}
                    rules={ProductRules.description}
                  />

                  <Toggle
                    defaultChecked={product.featureProduct === 'true'}
                    name="featureProduct"
                    label="Feature Product"
                  />

                  <VariantBox variantArray={variants} defaultVariant={product.defaultVariant} />

                  <button className={cx('button')} onClick={handleAddVariant}>
                    Add Variant
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
            nameButtonSubmit={'Edit Product'}
            tags={tags}
            hasVariant={true}
          />
        )}
      </DefaultLayout>
    </div>
  )
}

export default memo(ProductEdit)
