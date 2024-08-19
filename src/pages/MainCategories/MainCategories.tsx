import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Button from '~/components/Button'
import DefaultLayout from '~/layouts/DefaultLayout'
import classNames from 'classnames/bind'

import styles from './MainCategories.module.scss'

import 'react-toastify/dist/ReactToastify.css'

import { lazy, Suspense, useEffect } from 'react'
import Loading from '~/components/Loading'
import * as Toastify from '~/services/Toastify'

const cx = classNames.bind(styles)
const TableLayout = lazy(() => import('~/layouts/TableLayout'))

function MainCategories() {
  useEffect(() => {
    document.title = 'Category | MrGianStore'

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div className={cx('main-categories')}>
      <DefaultLayout
        active={'categories'}
        page={['Dashboard', 'Categories']}
        searchEngine={true}
        buttons={[
          <Button to={'/categories/main-categories/add'} className="button-add">
            <FontAwesomeIcon icon={faPlus} />
            Add Category
          </Button>,
        ]}
      >
        <Suspense fallback={<Loading />}>
          {/* <TableLayout
            headers={['Category', 'Total Items', 'Description', 'Created at', 'Actions']}
            category
            totalItems
            description
            createdAt
            actions
            editButton
            deleteButton
            handleDeteleToastify={Toastify.handleDeleteToastify}
          /> */}
        </Suspense>
      </DefaultLayout>
    </div>
  )
}

export default MainCategories
