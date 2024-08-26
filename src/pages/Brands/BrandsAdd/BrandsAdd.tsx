import React, { useEffect } from 'react'
import { ImageInput, Input } from '~/components/common/Type1'
import { BrandRoute } from '~/constant/PageRoute'
import ActionLayout from '~/layouts/ActionLayout'
import DefaultLayout from '~/layouts/DefaultLayout'
import classNames from 'classnames/bind'
import { useTranslation } from 'react-i18next'

import { BrandRules } from '../BrandRules'
import styles from './BrandsAdd.module.scss'

const cx = classNames.bind(styles)

function BrandsAdd(): JSX.Element {
  const { t } = useTranslation('brands')

  useEffect(() => {
    document.title = 'Add Brand | MrGianStore'
  }, [])

  return (
    <div className={cx('add')}>
      <DefaultLayout active={'brands'} page={BrandRoute.BrandAddPage}>
        <ActionLayout
          leftColumn={
            <React.Fragment>
              <Input name="name" label={t('brands_name')} rules={BrandRules.name} />
              <Input name="title" label={t('title', { ns: 'form' })} rules={BrandRules.title} />
              <Input name="slug" label={t('slug', { ns: 'form' })} rules={BrandRules.slug} />
              <Input
                name="description"
                label={t('description', { ns: 'form' })}
                rules={BrandRules.description}
              />
            </React.Fragment>
          }
          rightColumn={
            <React.Fragment>
              <ImageInput rules={BrandRules.image} />
            </React.Fragment>
          }
          nameButtonSubmit={t('actions.create_brands')}
        />
      </DefaultLayout>
    </div>
  )
}

export default BrandsAdd
