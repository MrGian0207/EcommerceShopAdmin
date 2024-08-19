import React, { useEffect } from 'react'
import { DescriptionInput, ImageInput, NameInput, SlugInput, TitleInput } from '~/components/common'
import ActionLayout from '~/layouts/ActionLayout'
import DefaultLayout from '~/layouts/DefaultLayout'
import classNames from 'classnames/bind'

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
              <NameInput label="Brand Name" />
              <TitleInput label="Meta Title" />
              <SlugInput label="Slug" />
              <DescriptionInput label="Description" />
            </React.Fragment>
          }
          rightColumn={
            <React.Fragment>
              <ImageInput />
            </React.Fragment>
          }
          nameButtonSubmit={nameButtonSubmit}
        />
      </DefaultLayout>
    </div>
  )
}

export default BrandsAdd
