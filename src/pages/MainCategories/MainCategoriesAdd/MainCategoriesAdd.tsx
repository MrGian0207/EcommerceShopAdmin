import React, { useEffect } from 'react'

import classNames from 'classnames'
import { useTranslation } from 'react-i18next'

import { ImageInput, Input } from '~/components/common/Type1'

import { MainCategoriesRules } from '../MainCategoriesRules'

import styles from './MainCategoriesAdd.module.scss'

import { MainCategoriesRoute } from '~/constant/PageRoute'
import ActionLayout from '~/layouts/ActionLayout'
import DefaultLayout from '~/layouts/DefaultLayout'

const cx = classNames.bind(styles)

function MainCategoriesAdd() {
  const { t } = useTranslation('mainCategories')

  useEffect(() => {
    document.title = 'Add Category | MrGianStore'
  }, [])

  return (
    <div className={cx('add')}>
      <DefaultLayout active={'categories'} page={MainCategoriesRoute.MainCategoriesAddPage}>
        <ActionLayout
          leftColumn={
            <React.Fragment>
              <Input name="name" label={t('category_name')} rules={MainCategoriesRules.name} />
              <Input
                name="title"
                label={t('title', { ns: 'form' })}
                rules={MainCategoriesRules.title}
              />
              <Input
                name="slug"
                label={t('slug', { ns: 'form' })}
                rules={MainCategoriesRules.slug}
              />
              <Input
                name="description"
                label={t('description', { ns: 'form' })}
                rules={MainCategoriesRules.description}
              />
            </React.Fragment>
          }
          rightColumn={
            <React.Fragment>
              <ImageInput rules={MainCategoriesRules.image} />
            </React.Fragment>
          }
          nameButtonSubmit={t('actions.create_category')}
        />
      </DefaultLayout>
    </div>
  )
}

export default MainCategoriesAdd
