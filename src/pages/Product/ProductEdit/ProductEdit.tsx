import { memo, useEffect, useState } from 'react'
import { Input } from '~/components/common/Type1'
import Loading from '~/components/Loading'
import OptionSelect from '~/components/OptionSelect'
import VariantForm from '~/components/VariantForm'
import { useAuth } from '~/context/AuthContext'
import { useModal } from '~/context/ModalContext'
import { usePath } from '~/context/PathContext'
import { useProduct } from '~/context/ProductContext'
import ActionLayout from '~/layouts/ActionLayout'
import DefaultLayout from '~/layouts/DefaultLayout'
import classNames from 'classnames/bind'
import ReactModal from 'react-modal'

import FeatureProduct from '../FeatureProduct'
import Tag from '../Tag'
import VariantBox from '../VariantBox'
import styles from './ProductEdit.module.scss'

interface ProductType {
  _id: string
  name: string
  title: string
  slug: string
  description: string
  category: string
  subCategory: string
  brand: string
  gender: string
  status: string
  productCode: string
  tags: string[]
  featureProduct: string
  defaultVariant: string
  variants: [
    {
      variantID: string
      variantName: string
      variantSize: string
      variantColor: string
      variantProductSKU: string
      variantQuantity: string
      variantRegularPrice: string
      variantSalePrice: string
      variantImages: string[]
    },
  ]
}

interface OptionType {
  value: string
  label: string
}

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

  const nameButtonSubmit = 'Edit Product'

  useEffect(() => {
    const handleSetDataOptions = (
      dataOptions: OptionType[],
      setDataOptions: React.Dispatch<React.SetStateAction<OptionType[]>>
    ) => {
      setDataOptions(dataOptions)
    }

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
        setLoading(false)
      }
    }
    fetchData()
  }, [accessToken, path, setProduct, setVariants])

  useEffect(() => {
    document.title = 'Edit Product | MrGianStore'
  }, [])

  if (loading) return <Loading />

  return (
    <div className={cx('add')}>
      <DefaultLayout active={'product'} page={['Dashboard', 'Product', 'Edit']}>
        <ActionLayout
          // Left Column
          leftColumn={
            <>
              <Input name="name" label="Product Name" defaultValue={product.name} />
              <Input name="title" label="Meta Title" defaultValue={product.title} />

              <div className={cx('row')}>
                <OptionSelect
                  labelName="Category"
                  defaultValue={product.category}
                  options={mainCategoriesOptions}
                />
                <OptionSelect
                  labelName="Sub Category"
                  defaultValue={product.subCategory}
                  options={subCategoriesOptions}
                />
              </div>

              <div className={cx('row')}>
                <OptionSelect
                  labelName="Brand"
                  defaultValue={product.brand}
                  options={brandOptions}
                />
                <OptionSelect
                  labelName="Gender"
                  defaultValue={product.gender}
                  options={genderOptions}
                />
              </div>

              <div className={cx('row')}>
                <OptionSelect
                  labelName="Status"
                  defaultValue={product.status}
                  options={statusOptions}
                />
                <Input name="productCode" label="Product Code" defaultValue={product.productCode} />
              </div>

              <Tag tags={tags} setTags={setTags} />
            </>
          }
          rightColumn={
            // Right Column
            <>
              <div className={cx('right-column')}>
                <Input name="slug" label="Slug" defaultValue={product.slug} />

                <Input name="description" label="Description" defaultValue={product.description} />

                <FeatureProduct
                  defaultChecked={product.featureProduct === 'on'}
                  label="Feature Product"
                  id={product._id}
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
            </>
          }
          nameButtonSubmit={nameButtonSubmit}
          tags={tags}
          hasVariant={true}
        />
      </DefaultLayout>
    </div>
  )
}

export default memo(ProductEdit)
