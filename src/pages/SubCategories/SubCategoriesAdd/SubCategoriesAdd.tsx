import React, { useEffect, useState } from 'react'

import classNames from 'classnames'
import { useTranslation } from 'react-i18next'

import OptionSelect from '~/components/common/OptionSelect'
import { ImageInput, Input } from '~/components/common/Type1'

import { SubCategoriesRules } from '../SubCategoriesRules'
import SubCategoriesSkeleton from '../SubCategoriesSkeleton/SubCategoriesSkeleton'

import styles from './SubCategoriesAdd.module.scss'

import { SubCategoriesRoute } from '~/constant/PageRoute'
import { useAuth } from '~/context/AuthContext'
import ActionLayout from '~/layouts/ActionLayout'
import DefaultLayout from '~/layouts/DefaultLayout'
import { OptionType } from '~/types/DataType'
import { handleSetDataOptions } from '~/utils/HandleSetDataOptions'

const cx = classNames.bind(styles)

function SubCategoriesAdd() {
  const { t } = useTranslation('subCategories')

  const { accessToken } = useAuth()

  const [loading, setLoading] = useState(true)
  const [mainCategoriesOptions, setMainCategoriesOptions] = useState<OptionType[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/categories/main-categories/name`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        const resData = await res.json()
        const mainCategories: OptionType[] = resData.data
        handleSetDataOptions(mainCategories, setMainCategoriesOptions)
      } catch (error) {
        console.log(error)
      } finally {
        setTimeout(() => {
          setLoading(false)
        }, 500)
      }
    }

    fetchData()
  }, [accessToken])

  useEffect(() => {
    document.title = 'Add Sub Category | MrGianStore'
  }, [])

  return (
    <div className={cx('edit')}>
      <DefaultLayout active={'categories'} page={SubCategoriesRoute.SubCategoriesAddPage}>
        {loading ? (
          <SubCategoriesSkeleton />
        ) : (
          <ActionLayout
            leftColumn={
              <React.Fragment>
                <Input name="name" label={t('subCategory_name')} rules={SubCategoriesRules.name} />
                <Input
                  name="title"
                  label={t('title', { ns: 'form' })}
                  rules={SubCategoriesRules.title}
                />
                <Input
                  name="slug"
                  label={t('slug', { ns: 'form' })}
                  rules={SubCategoriesRules.slug}
                />
                <Input
                  name="description"
                  label={t('description', { ns: 'form' })}
                  rules={SubCategoriesRules.description}
                />
              </React.Fragment>
            }
            rightColumn={
              <React.Fragment>
                <div className={cx('right-column')}>
                  <OptionSelect
                    label={t('parentCategory')}
                    name="category"
                    options={mainCategoriesOptions}
                    rules={SubCategoriesRules.parentCategory}
                  />
                  <ImageInput rules={SubCategoriesRules.image} />
                </div>
              </React.Fragment>
            }
            nameButtonSubmit={t('actions.create_sub_category')}
          />
        )}
      </DefaultLayout>
    </div>
  )
}

export default SubCategoriesAdd
