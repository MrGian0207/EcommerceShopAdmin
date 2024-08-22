import React, { useEffect } from 'react'
import { ImageInput, Input } from '~/components/common/Type1'
import ActionLayout from '~/layouts/ActionLayout'
import DefaultLayout from '~/layouts/DefaultLayout'
import classNames from 'classnames/bind'

import styles from './MainCategoriesAdd.module.scss'

const cx = classNames.bind(styles)

function MainCategoriesAdd(): JSX.Element {
  const nameButtonSubmit = 'Create Category'

  useEffect(() => {
    document.title = 'Add Category | MrGianStore'
  }, [])

  return (
    <div className={cx('add')}>
      <DefaultLayout active={'categories'} page={['Dashboard', 'Categories', 'Add']}>
        <ActionLayout
          leftColumn={
            <React.Fragment>
              <Input name="name" label="Category Name" />
              <Input name="title" label="Meta Title" />
              <Input name="slug" label="Slug" />
              <Input name="description" label="Description" />
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

export default MainCategoriesAdd
