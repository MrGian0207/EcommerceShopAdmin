import { memo, useEffect, useState } from 'react'
import OptionSelect from '~/components/common/OptionSelect'
import Toggle from '~/components/common/ToggleButton'
import { Input } from '~/components/common/Type1'
import Loading from '~/components/Loading'
import VariantForm from '~/components/VariantForm'
import { useAuth } from '~/context/AuthContext'
import { useModal } from '~/context/ModalContext'
import { useProduct } from '~/context/ProductContext'
import ActionLayout from '~/layouts/ActionLayout'
import DefaultLayout from '~/layouts/DefaultLayout'
import classNames from 'classnames/bind'
import ReactModal from 'react-modal'

import Tag from '../Tag'
import VariantBox from '../VariantBox'
import styles from './ProductAdd.module.scss'

interface OptionType {
  value: string
  label: string
}

const cx = classNames.bind(styles)

function ProductAdd(): JSX.Element {
  const { accessToken } = useAuth()
  const { isEdit, setIsEdit, toggleModal, setToggleModal } = useModal()
  const { variants, setVariantImage } = useProduct()
  const [tags, setTags] = useState<string[]>([])
  // const nameImageFile = 'product-variant-image'
  const nameButtonSubmit = 'Create Product'

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
    const handleSetDataOptions = (
      dataOptions: OptionType[],
      setDataOptions: React.Dispatch<React.SetStateAction<OptionType[]>>
    ) => {
      setDataOptions(dataOptions)
    }

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

        handleSetDataOptions(mainCategories, setMainCategoriesOptions)
        handleSetDataOptions(subCategories, setSubCategoriesOptions)
        handleSetDataOptions(brands, setBrandOptions)
        handleSetDataOptions(genderOptions, setGenderOptions)
        handleSetDataOptions(statusOptions, setStatusOptions)
      } catch (err) {
        console.error('Error fetching data:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [accessToken])

  useEffect(() => {
    document.title = 'Add Product | MrGianStore'
  }, [])

  if (loading) return <Loading />

  return (
    <div className={cx('add')}>
      <DefaultLayout active={'product'} page={['Dashboard', 'Product', 'Add']}>
        <ActionLayout
          // Left Column
          leftColumn={
            <>
              <Input name="name" label="Product Name" />
              <Input name="title" label="Meta Title" />

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

                <Input name="productCode" label="Product Code" />
              </div>

              <Tag tags={tags} setTags={setTags} />
            </>
          }
          // Right Column
          rightColumn={
            <>
              <div className={cx('right-column')}>
                <Input name="slug" label="Slug" />

                <Input name="description" label="Description" />

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
            </>
          }
          // NameImageFile={nameImageFile}
          nameButtonSubmit={nameButtonSubmit}
          tags={tags}
          hasVariant={true}
        />
      </DefaultLayout>
    </div>
  )
}

export default memo(ProductAdd)
