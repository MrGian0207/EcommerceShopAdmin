import React, { useEffect } from 'react'
import { ImageInput, Input } from '~/components/common/Type1'
import ActionLayout from '~/layouts/ActionLayout'
import DefaultLayout from '~/layouts/DefaultLayout'
import classNames from 'classnames/bind'

import { BrandRules } from '../BrandRules'
import styles from './BrandsAdd.module.scss'

const cx = classNames.bind(styles)

function BrandsAdd(): JSX.Element {
  const nameButtonSubmit = 'Create Brands'

  useEffect(() => {
    document.title = 'Add Brand | MrGianStore'
  }, [])

  return (
    <div className={cx('add')}>
      <DefaultLayout active={'brands'} page={['Dashboard', 'Brands', 'Add']}>
        <ActionLayout
          leftColumn={
            <React.Fragment>
              <Input name="name" label="Brand Name" rules={BrandRules.name} />
              <Input name="title" label="Meta Title" rules={BrandRules.title} />
              <Input name="slug" label="Slug" rules={BrandRules.slug} />
              <Input name="description" label="Description" rules={BrandRules.description} />
            </React.Fragment>
          }
          rightColumn={
            <React.Fragment>
              <ImageInput rules={BrandRules.image} />
            </React.Fragment>
          }
          nameButtonSubmit={nameButtonSubmit}
        />
      </DefaultLayout>
    </div>
  )
}

export default BrandsAdd
