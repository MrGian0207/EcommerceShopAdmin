import { useEffect } from 'react'
import { faPen, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import images from '~/assets/Image'
import Button from '~/components/common/Button'
import RowTableSkeleton from '~/components/RowTableSkeleton'
import StatusItems from '~/components/StatusItems'
import CustomTooltip from '~/components/Tooltip/CustomTooltip'
import { ProductRoute } from '~/constant/PageRoute'
import { ProductTableHeader } from '~/constant/Table'
import { useDeleteData } from '~/context/DeleteDataContext'
import { usePath } from '~/context/PathContext'
import { useProduct } from '~/context/ProductContext'
import { useTable } from '~/context/TableContext'
import DefaultLayout from '~/layouts/DefaultLayout'
import TableLayout, {
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
import { useTranslation } from 'react-i18next'

import styles from './Product.module.scss'
import FeatureProduct from './ProductComponent/FeatureProduct'

const cx = classNames.bind(styles)

function Product(): JSX.Element {
  const { t } = useTranslation('product')
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
        page={ProductRoute.ProductPage}
        searchEngine={true}
        buttons={[
          <Button
            to={'/product/add'}
            className="button-add"
            onClick={() => {
              setVariants([])
            }}
          >
            <FontAwesomeIcon icon={faPlus} />
            {t('actions.add_product')}
          </Button>,
        ]}
      >
        <TableLayout>
          <TableHeader>
            <TableRow>
              {ProductTableHeader.map((header, index) => (
                <TableHeaderCell key={`header-${index}`}>
                  {t(header, { ns: 'table' })}
                </TableHeaderCell>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {loading ? (
              <RowTableSkeleton numberOfColumn={7} />
            ) : (
              dataTable.map((data) => (
                <TableRow key={data._id}>
                  <TableCustomDataCell
                    imageSrc={data.image !== 'None' ? data.image : images.userDefaults}
                  >
                    {data.name}
                  </TableCustomDataCell>
                  <TableDataCell>{format(new Date(data.createdAt), 'dd MMM yyyy')}</TableDataCell>
                  <TableDataCell>
                    <StatusItems quantity={data.totalProducts} />
                  </TableDataCell>
                  <TableCustomRatingCell>{data._id}</TableCustomRatingCell>
                  <TableDataCell>{data.priceDefault}</TableDataCell>
                  <TableDataCell>
                    <FeatureProduct defaultChecked={data.featureProduct === 'true'} id={data._id} />
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
      </DefaultLayout>
    </div>
  )
}

export default Product
