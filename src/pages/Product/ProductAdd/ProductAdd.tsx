import React, { memo, useEffect, useState } from 'react'
import OptionSelect from '~/components/common/OptionSelect'
import Toggle from '~/components/common/ToggleButton'
import { Input } from '~/components/common/Type1'
import VariantForm from '~/components/VariantForm'
import { ProductRoute } from '~/constant/PageRoute'
import { genderOptionsConstant, statusOptionsConstant } from '~/constant/SelectOptions'
import { useAuth } from '~/context/AuthContext'
import { useModal } from '~/context/ModalContext'
import { useProduct } from '~/context/ProductContext'
import ActionLayout from '~/layouts/ActionLayout'
import DefaultLayout from '~/layouts/DefaultLayout'
import { OptionType } from '~/types/DataType'
import { handleSetDataOptions } from '~/utils/HandleSetDataOptions'
import classNames from 'classnames/bind'
import { useTranslation } from 'react-i18next'
import ReactModal from 'react-modal'

import ProductSkeleton from '../ProductComponent/ProductSkeleton/ProductSkeleton'
import Tag from '../ProductComponent/Tag'
import VariantBox from '../ProductComponent/VariantBox'
import { ProductRules } from '../ProductRules'
import styles from './ProductAdd.module.scss'

const cx = classNames.bind(styles)

function ProductAdd(): JSX.Element {
  const { t } = useTranslation('product')

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
        const genderOptions: OptionType[] = genderOptionsConstant
        const statusOptions: OptionType[] = statusOptionsConstant

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
      <DefaultLayout active={'product'} page={ProductRoute.ProductAddPage}>
        {loading ? (
          <ProductSkeleton />
        ) : (
          <ActionLayout
            leftColumn={
              <React.Fragment>
                <Input name="name" label={t('product_name')} rules={ProductRules.name} />
                <Input name="title" label={t('title', { ns: 'form' })} rules={ProductRules.title} />

                <div className={cx('row')}>
                  <OptionSelect
                    name="category"
                    label={t('category', { ns: 'form' })}
                    options={mainCategoriesOptions}
                  />
                  <OptionSelect
                    name="subCategory"
                    label={t('subCategory', { ns: 'form' })}
                    options={subCategoriesOptions}
                  />
                </div>

                <div className={cx('row')}>
                  <OptionSelect
                    name="brand"
                    label={t('brand', { ns: 'form' })}
                    options={brandOptions}
                  />
                  <OptionSelect
                    name="gender"
                    label={t('gender', { ns: 'form' })}
                    options={genderOptions}
                  />
                </div>

                <div className={cx('row')}>
                  <OptionSelect
                    name="status"
                    label={t('status', { ns: 'form' })}
                    options={statusOptions}
                  />

                  <Input
                    name="productCode"
                    label={t('productCode', { ns: 'form' })}
                    rules={ProductRules.productCode}
                  />
                </div>

                <Tag tags={tags} setTags={setTags} />
              </React.Fragment>
            }
            // Right Column
            rightColumn={
              <React.Fragment>
                <div className={cx('right-column')}>
                  <Input name="slug" label={t('slug', { ns: 'form' })} rules={ProductRules.slug} />

                  <Input
                    name="description"
                    label={t('description', { ns: 'form' })}
                    rules={ProductRules.description}
                  />

                  <Toggle name="featureProduct" label={t('feature_product', { ns: 'form' })} />

                  <VariantBox variantArray={variants} />

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
                    <VariantForm nameForm={t('variants')} isEdit={isEdit} />
                  </ReactModal>
                </div>
              </React.Fragment>
            }
            nameButtonSubmit={t('actions.create_product')}
            tags={tags}
            hasVariant={true}
          />
        )}
      </DefaultLayout>
    </div>
  )
}

export default memo(ProductAdd)
