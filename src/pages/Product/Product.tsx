import { lazy, Suspense, useEffect } from 'react'
import { faPen, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Button from '~/components/common/Button'
import Loading from '~/components/Loading'
import RowTableSkeleton from '~/components/RowTableSkeleton'
import StatusItems from '~/components/StatusItems'
import CustomTooltip from '~/components/Tooltip/CustomTooltip'
import { useDeleteData } from '~/context/DeleteDataContext'
import { usePath } from '~/context/PathContext'
import { useProduct } from '~/context/ProductContext'
import { useTable } from '~/context/TableContext'
import DefaultLayout from '~/layouts/DefaultLayout'
import {
  TableBody,
  TableCustomActionsCell,
  TableCustomDataCell,
  TableCustomRatingCell,
  TableDataCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from '~/layouts/TableLayout'
import classNames from 'classnames/bind'
import { format } from 'date-fns'

import FeatureProduct from './FeatureProduct'
import styles from './Product.module.scss'

const TableLayout = lazy(() => import('~/layouts/TableLayout'))
const cx = classNames.bind(styles)

function Product(): JSX.Element {
  const { path } = usePath()
  const { loading, dataTable } = useTable()
  const { isDeleting, setDeletedData } = useDeleteData()
  const { setVariants } = useProduct()

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
          <Button
            to={'/products/add'}
            className="button-add"
            onClick={() => {
              setVariants([])
            }}
          >
            <FontAwesomeIcon icon={faPlus} />
            Add Product
          </Button>,
        ]}
      >
        <Suspense fallback={<Loading />}>
          <TableLayout>
            <TableHeader>
              <TableRow>
                <TableHeaderCell>Product</TableHeaderCell>
                <TableHeaderCell>Created at</TableHeaderCell>
                <TableHeaderCell>Status</TableHeaderCell>
                <TableHeaderCell>Rating</TableHeaderCell>
                <TableHeaderCell>Price</TableHeaderCell>
                <TableHeaderCell>Featured</TableHeaderCell>
                <TableHeaderCell>Actions</TableHeaderCell>
              </TableRow>
            </TableHeader>

            <TableBody>
              {loading ? (
                <RowTableSkeleton numberOfColumn={7} />
              ) : (
                dataTable.map((data) => (
                  <TableRow key={data._id}>
                    <TableCustomDataCell imageSrc={data.image}>{data.name}</TableCustomDataCell>
                    <TableDataCell>{format(new Date(data.createdAt), 'dd MMM yyyy')}</TableDataCell>
                    <TableDataCell>
                      <StatusItems quantity={data.totalProducts} />
                    </TableDataCell>
                    <TableCustomRatingCell>{data._id}</TableCustomRatingCell>
                    <TableDataCell>{data.priceDefault}</TableDataCell>
                    <TableDataCell>
                      <FeatureProduct
                        defaultChecked={data.featureProduct === 'true'}
                        id={data._id}
                      />
                    </TableDataCell>
                    <TableCustomActionsCell>
                      <CustomTooltip message="Edit">
                        <Button to={`${path}/${data._id}`} className="edit-btn">
                          <FontAwesomeIcon icon={faPen} />
                        </Button>
                      </CustomTooltip>
                      <CustomTooltip message="Delete">
                        <Button
                          className="delete-btn"
                          disabled={isDeleting}
                          onClick={() => {
                            setDeletedData({
                              id: data._id,
                              name: data.name,
                              path,
                            })
                          }}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </Button>
                      </CustomTooltip>
                    </TableCustomActionsCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </TableLayout>
        </Suspense>
      </DefaultLayout>
    </div>
  )
}

export default Product
