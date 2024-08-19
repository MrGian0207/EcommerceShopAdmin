import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Button from '~/components/Button'
import DefaultLayout from '~/layouts/DefaultLayout'
import classNames from 'classnames/bind'

import styles from './Product.module.scss'

import 'react-toastify/dist/ReactToastify.css'

import { lazy, Suspense, useEffect } from 'react'
import Loading from '~/components/Loading'
import { useProduct } from '~/context/ProductContext'
import * as Toastify from '~/services/Toastify'

const cx = classNames.bind(styles)
const TableLayout = lazy(() => import('~/layouts/TableLayout'))

function Product(): JSX.Element {
  const { setVariants } = useProduct()
  const handleAddProduct = () => {
    setVariants([])
  }
  useEffect(() => {
    document.title = 'Product | MrGianStore'
  }, [])

  return (
    <div className={cx('product')}>
      <DefaultLayout
        active={'product'}
        page={['Dashboard', 'Product List']}
        searchEngine={true}
        buttons={[
          <Button to={'/products/add'} className="button-add" onClick={handleAddProduct}>
            <FontAwesomeIcon icon={faPlus} />
            Add Product
          </Button>,
        ]}
      >
        <Suspense fallback={<Loading />}>
          {/* <TableLayout
            headers={['Category', 'Created at', 'Status', 'Rating', 'Price', 'Featured', 'Actions']}
            category
            createdAt
            status
            rating
            price
            featured
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

export default Product
