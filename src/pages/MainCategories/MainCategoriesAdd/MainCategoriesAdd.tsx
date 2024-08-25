import React, { useEffect } from 'react'
import { ImageInput, Input } from '~/components/common/Type1'
import ActionLayout from '~/layouts/ActionLayout'
import DefaultLayout from '~/layouts/DefaultLayout'
import classNames from 'classnames/bind'

import { MainCategoriesRules } from '../MainCategoriesRules'
import styles from './MainCategoriesAdd.module.scss'

const cx = classNames.bind(styles)

function MainCategoriesAdd(): JSX.Element {
  useEffect(() => {
    document.title = 'Add Category | MrGianStore'
  }, [])

  return (
    <div className={cx('add')}>
      <DefaultLayout
        active={'categories'}
        page={['Dashboard', 'Categories/Main Categories', 'Add']}
      >
        <ActionLayout
          leftColumn={
            <React.Fragment>
              <Input name="name" label="Category Name" rules={MainCategoriesRules.name} />
              <Input name="title" label="Meta Title" rules={MainCategoriesRules.title} />
              <Input name="slug" label="Slug" rules={MainCategoriesRules.slug} />
              <Input
                name="description"
                label="Description"
                rules={MainCategoriesRules.description}
              />
            </React.Fragment>
          }
          rightColumn={
            <React.Fragment>
              <ImageInput rules={MainCategoriesRules.image} />
            </React.Fragment>
          }
          nameButtonSubmit={'Create Category'}
        />
      </DefaultLayout>
    </div>
  )
}

export default MainCategoriesAdd
