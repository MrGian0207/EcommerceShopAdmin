import React, { memo, useEffect, useState } from 'react'
import OptionSelect from '~/components/common/OptionSelect'
import Toggle from '~/components/common/ToggleButton'
import { Input } from '~/components/common/Type1'
import VariantForm from '~/components/VariantForm'
import { useAuth } from '~/context/AuthContext'
import { useModal } from '~/context/ModalContext'
import { useProduct } from '~/context/ProductContext'
import ActionLayout from '~/layouts/ActionLayout'
import DefaultLayout from '~/layouts/DefaultLayout'
import { OptionType } from '~/types/DataType'
import { handleSetDataOptions } from '~/utils/HandleSetDataOptions'
import classNames from 'classnames/bind'
import ReactModal from 'react-modal'

import { ProductRules } from '../ProductRules'
import ProductSkeleton from '../ProductSkeleton/ProductSkeleton'
import Tag from '../Tag'
import VariantBox from '../VariantBox'
import styles from './ProductAdd.module.scss'

const cx = classNames.bind(styles)

function ProductAdd(): JSX.Element {
  const { accessToken } = useAuth()
  const { isEdit, setIsEdit, toggleModal, setToggleModal } = useModal()
  const { variants, setVariantImage } = useProduct()
  const [tags, setTags] = useState<string[]>([])

  const handleAddVariant = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    e.stopPropagation()
    setToggleModal(true)
    setIsEdit(false)
    setVariantImage([])
  }

  const [loading, setLoading] = useState(true)
  const [mainCategoriesOptions, setMainCategoriesOptions] = useState<OptionType[]>([])
  const [subCategoriesOptions, setSubCategoriesOptions] = useState<OptionType[]>([])
  const [brandOptions, setBrandOptions] = useState<OptionType[]>([])
  const [genderOptions, setGenderOptions] = useState<OptionType[]>([])
  const [statusOptions, setStatusOptions] = useState<OptionType[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [mainCategoriesRes, subCategoriesRes, brandsRes] = await Promise.all([
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
        ])

        const [mainCategoriesData, subCategoriesData, brandsData] = await Promise.all([
          mainCategoriesRes.json(),
          subCategoriesRes.json(),
          brandsRes.json(),
        ])

        const mainCategories: OptionType[] = mainCategoriesData.data
        const subCategories: OptionType[] = subCategoriesData.data
        const brands: OptionType[] = brandsData.data
        const genderOptions: OptionType[] = [
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

        handleSetDataOptions(mainCategories, setMainCategoriesOptions)
        handleSetDataOptions(subCategories, setSubCategoriesOptions)
        handleSetDataOptions(brands, setBrandOptions)
        handleSetDataOptions(genderOptions, setGenderOptions)
        handleSetDataOptions(statusOptions, setStatusOptions)
      } catch (err) {
        console.error('Error fetching data:', err)
      } finally {
        setTimeout(() => {
          setLoading(false)
        }, 500)
      }
    }

    fetchData()
  }, [accessToken])

  useEffect(() => {
    document.title = 'Add Product | MrGianStore'
  }, [])

  return (
    <div className={cx('add')}>
      <DefaultLayout active={'product'} page={['Dashboard', 'Product', 'Add']}>
        {loading ? (
          <ProductSkeleton />
        ) : (
          <ActionLayout
            leftColumn={
              <React.Fragment>
                <Input name="name" label="Product Name" rules={ProductRules.name} />
                <Input name="title" label="Meta Title" rules={ProductRules.title} />

                <div className={cx('row')}>
                  <OptionSelect label="Category" name="category" options={mainCategoriesOptions} />
                  <OptionSelect
                    label="Sub Category"
                    name="subCategory"
                    options={subCategoriesOptions}
                  />
                </div>

                <div className={cx('row')}>
                  <OptionSelect label="Brand" name="brand" options={brandOptions} />
                  <OptionSelect label="Gender" name="gender" options={genderOptions} />
                </div>

                <div className={cx('row')}>
                  <OptionSelect label="Status" name="status" options={statusOptions} />

                  <Input name="productCode" label="Product Code" rules={ProductRules.productCode} />
                </div>

                <Tag tags={tags} setTags={setTags} />
              </React.Fragment>
            }
            // Right Column
            rightColumn={
              <React.Fragment>
                <div className={cx('right-column')}>
                  <Input name="slug" label="Slug" rules={ProductRules.slug} />

                  <Input name="description" label="Description" rules={ProductRules.description} />

                  <Toggle name="featureProduct" label="Feature Product" />

                  <VariantBox variantArray={variants} />

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
            nameButtonSubmit={'Create Product'}
            tags={tags}
            hasVariant={true}
          />
        )}
      </DefaultLayout>
    </div>
  )
}

export default memo(ProductAdd)
