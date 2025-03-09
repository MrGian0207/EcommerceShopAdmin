import React, { useEffect, useState } from 'react'

import classNames from 'classnames'
import { useTranslation } from 'react-i18next'

import OptionSelect from '~/components/common/OptionSelect'
import { ImageInput, Input } from '~/components/common/Type1'

import { SubCategoriesRules } from '../SubCategoriesRules'
import SubCategoriesSkeleton from '../SubCategoriesSkeleton/SubCategoriesSkeleton'

import styles from './SubCategoriesEdit.module.scss'

import { SubCategoriesRoute } from '~/constant/PageRoute'
import { useAuth } from '~/context/AuthContext'
import { usePath } from '~/context/PathContext'
import ActionLayout from '~/layouts/ActionLayout'
import DefaultLayout from '~/layouts/DefaultLayout'
import { emptySubCategories, OptionType, SubCategoriesType } from '~/types/DataType'
import { handleSetDataOptions } from '~/utils/HandleSetDataOptions'

const cx = classNames.bind(styles)

function SubCategoriesEdit() {
  const { t } = useTranslation('subCategories')

  const { accessToken } = useAuth()
  const { path } = usePath()

  const [loading, setLoading] = useState(true)

  const [mainCategoriesOptions, setMainCategoriesOptions] = useState<OptionType[]>([])
  const [subCategory, setSubCategory] = useState<SubCategoriesType>(emptySubCategories)

  useEffect(() => {
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
        setTimeout(() => {
          setLoading(false)
        }, 500)
      }
    }
    fetchData()
  }, [path, accessToken])

  useEffect(() => {
    document.title = 'Edit Sub Category | MrGianStore'
  }, [])

  return (
    <div className={cx('edit')}>
      <DefaultLayout active={'categories'} page={SubCategoriesRoute.SubCategoriesEditPage}>
        {loading ? (
          <SubCategoriesSkeleton />
        ) : (
          <ActionLayout
            leftColumn={
              <React.Fragment>
                <Input
                  name="name"
                  label={t('subCategory_name')}
                  defaultValue={subCategory.name}
                  rules={SubCategoriesRules.name}
                />
                <Input
                  name="title"
                  label={t('title', { ns: 'form' })}
                  defaultValue={subCategory.title}
                  rules={SubCategoriesRules.title}
                />
                <Input
                  name="slug"
                  label={t('slug', { ns: 'form' })}
                  defaultValue={subCategory.slug}
                  rules={SubCategoriesRules.slug}
                />
                <Input
                  name="description"
                  label={t('description', { ns: 'form' })}
                  defaultValue={subCategory.description}
                  rules={SubCategoriesRules.description}
                />
              </React.Fragment>
            }
            rightColumn={
              <React.Fragment>
                <div className={cx('right-column')}>
                  <OptionSelect
                    name="category"
                    label={t('parentCategory')}
                    options={mainCategoriesOptions}
                    defaultValue={subCategory.parentCategory}
                    rules={SubCategoriesRules.parentCategory}
                  />
                  <ImageInput imageSaved={subCategory.image} />
                </div>
              </React.Fragment>
            }
            nameButtonSubmit={t('actions.edit_sub_category')}
          />
        )}
      </DefaultLayout>
    </div>
  )
}

export default SubCategoriesEdit
