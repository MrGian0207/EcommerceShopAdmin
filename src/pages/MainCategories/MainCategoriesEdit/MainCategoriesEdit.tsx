import process from 'process'

import React, { useEffect, useState } from 'react'

import classNames from 'classnames'
import { useTranslation } from 'react-i18next'

import { ImageInput, Input } from '~/components/common/Type1'

import { MainCategoriesRules } from '../MainCategoriesRules'
import MainCategoriesSkeleton from '../MainCategoriesSkeleton/MainCategoriesSkeleton'

import styles from './MainCategoriesEdit.module.scss'

import { MainCategoriesRoute } from '~/constant/PageRoute'
import { useAuth } from '~/context/AuthContext'
import { usePath } from '~/context/PathContext'
import ActionLayout from '~/layouts/ActionLayout'
import DefaultLayout from '~/layouts/DefaultLayout'
import { emptyMainCategory, MainCategoriesType } from '~/types/DataType'

const cx = classNames.bind(styles)

function MainCategoriesEdit() {
  const { t } = useTranslation('mainCategories')
  const { path } = usePath()
  const { accessToken } = useAuth()

  const [loading, setLoading] = useState<boolean>(true)
  const [category, setCategory] = useState<MainCategoriesType>(emptyMainCategory)

  useEffect(() => {
    const fetchData = async () => {
      if (path) {
        try {
          const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}${path}`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          const resData = await res.json()
          setCategory({
            name: resData.data.name,
            title: resData.data.title,
            slug: resData.data.slug,
            description: resData.data.description,
            image: resData.data.image,
          })
        } catch (error) {
          console.log(error)
        } finally {
          setTimeout(() => {
            setLoading(false)
          }, 500)
        }
      }
    }

    fetchData()
  }, [accessToken, path])

  useEffect(() => {
    document.title = 'Edit Category | MrGianStore'
  }, [])

  return (
    <div className={cx('edit')}>
      <DefaultLayout active={'categories'} page={MainCategoriesRoute.MainCategoriesEditPage}>
        {loading ? (
          <MainCategoriesSkeleton />
        ) : (
          <ActionLayout
            leftColumn={
              <React.Fragment>
                <Input
                  name="name"
                  label={t('category_name')}
                  defaultValue={category.name}
                  rules={MainCategoriesRules.name}
                />
                <Input
                  name="title"
                  label={t('title', { ns: 'form' })}
                  defaultValue={category.title}
                  rules={MainCategoriesRules.title}
                />
                <Input
                  name="slug"
                  label={t('slug', { ns: 'form' })}
                  defaultValue={category.slug}
                  rules={MainCategoriesRules.slug}
                />
                <Input
                  name="description"
                  label={t('description', { ns: 'form' })}
                  defaultValue={category.description}
                  rules={MainCategoriesRules.description}
                />
              </React.Fragment>
            }
            rightColumn={
              <React.Fragment>
                <ImageInput imageSaved={category.image} />
              </React.Fragment>
            }
            nameButtonSubmit={t('actions.edit_category')}
          />
        )}
      </DefaultLayout>
    </div>
  )
}

export default MainCategoriesEdit
