import React, { useEffect, useState } from 'react'
import OptionSelect from '~/components/common/OptionSelect'
import { ImageInput, Input } from '~/components/common/Type1'
import Loading from '~/components/Loading'
import { useAuth } from '~/context/AuthContext'
import ActionLayout from '~/layouts/ActionLayout'
import DefaultLayout from '~/layouts/DefaultLayout'
import classNames from 'classnames/bind'
import { useLocation } from 'react-router-dom'

import { SubCategoriesRules } from '../SubCategoriesRules'
import styles from './SubCategoriesEdit.module.scss'

interface SubCategoriesType {
  name: string
  title: string
  slug: string
  description: string
  image: string
  parentCategory: string
}

interface OptionType {
  value: string
  label: string
}

const cx = classNames.bind(styles)

function SubCategoriesEdit() {
  const emptySubCategories = {
    name: '',
    title: '',
    slug: '',
    description: '',
    image: '',
    parentCategory: '',
  }
  const { accessToken } = useAuth()
  const location = useLocation()
  const path = location.pathname

  const [loading, setLoading] = useState(true)
  const [mainCategoriesOptions, setMainCategoriesOptions] = useState<OptionType[]>([])
  const [subCategory, setSubCategory] = useState<SubCategoriesType>(emptySubCategories)

  const nameButtonSubmit = 'Edit Sub Category'

  useEffect(() => {
    const handleSetDataOptions = (
      dataOptions: OptionType[],
      setDataOptions: React.Dispatch<React.SetStateAction<OptionType[]>>
    ) => {
      setDataOptions(dataOptions)
    }

    const fetchData = async () => {
      try {
        const [mainCategoriesRes, subCategoriesRes] = await Promise.all([
          fetch(`${process.env.REACT_APP_BACKEND_URL}/categories/main-categories/name`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              Authorization: `Bearer ${accessToken}`,
            },
          }),
          fetch(`${process.env.REACT_APP_BACKEND_URL}${path}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${accessToken}`,
            },
          }),
        ])

        const [mainCategoriesData, subCategoriesData] = await Promise.all([
          mainCategoriesRes.json(),
          subCategoriesRes.json(),
        ])

        const mainCategories: OptionType[] = mainCategoriesData.data

        handleSetDataOptions(mainCategories, setMainCategoriesOptions)

        setSubCategory({
          name: subCategoriesData.data.name,
          title: subCategoriesData.data.title,
          slug: subCategoriesData.data.slug,
          description: subCategoriesData.data.description,
          image: subCategoriesData.data.image,
          parentCategory: subCategoriesData.data.parentCategory,
        })
      } catch (err) {
        console.error('Error fetching data:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [path, accessToken])

  useEffect(() => {
    document.title = 'Edit Sub Category | MrGianStore'
  }, [])

  if (loading) return <Loading />

  return (
    <div className={cx('edit')}>
      <DefaultLayout active={'categories'} page={['Dashboard', 'Sub Categories', 'Edit']}>
        <ActionLayout
          leftColumn={
            <React.Fragment>
              <Input
                name="name"
                label="Sub Category Name"
                defaultValue={subCategory.name}
                rules={SubCategoriesRules.name}
              />
              <Input
                name="title"
                label="Meta Title"
                defaultValue={subCategory.title}
                rules={SubCategoriesRules.title}
              />
              <Input
                name="slug"
                label="Slug"
                defaultValue={subCategory.slug}
                rules={SubCategoriesRules.slug}
              />
              <Input
                name="description"
                label="Description"
                defaultValue={subCategory.description}
                rules={SubCategoriesRules.description}
              />
            </React.Fragment>
          }
          rightColumn={
            <>
              <div className={cx('right-column')}>
                <OptionSelect
                  label="Parent Category"
                  name="category"
                  options={mainCategoriesOptions}
                  defaultValue={subCategory.parentCategory}
                  rules={SubCategoriesRules.parentCategory}
                />
                <ImageInput imageSaved={subCategory.image} />
              </div>
            </>
          }
          nameButtonSubmit={nameButtonSubmit}
        />
      </DefaultLayout>
    </div>
  )
}

export default SubCategoriesEdit
