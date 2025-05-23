import { useEffect } from 'react'

import { faEye } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames/bind'
import { format } from 'date-fns'
import { useTranslation } from 'react-i18next'

import Button from '~/components/common/Button'
import RowTableSkeleton from '~/components/RowTableSkeleton'
import StatusItems from '~/components/StatusItems'
import CustomTooltip from '~/components/Tooltip/CustomTooltip'

import styles from './Orders.module.scss'

import images from '~/assets/Image'
import { OrdersRoute } from '~/constant/PageRoute'
import { OrdersTableHeader } from '~/constant/Table'
import { usePath } from '~/context/PathContext'
import { useTable } from '~/context/TableContext'
import DefaultLayout from '~/layouts/DefaultLayout'
import TableLayout, {
  TableBody,
  TableCustomActionsCell,
  TableCustomDataCell,
  TableDataCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from '~/layouts/TableLayout'

const cx = classNames.bind(styles)

function Orders() {
  const { t } = useTranslation('orders')
  const { path } = usePath()
  const { loading, dataTable } = useTable()

  useEffect(() => {
    document.title = 'Order | MrGianStore'
  }, [])

  return (
    <div className={cx('orders')}>
      <DefaultLayout active={'orders'} page={OrdersRoute.OrdersPage} searchEngine={true}>
        <TableLayout>
          <TableHeader>
            <TableRow>
              {OrdersTableHeader.map((header, index) => (
                <TableHeaderCell key={`header-${index}`}>
                  {t(header, { ns: 'table' })}
                </TableHeaderCell>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {loading ? (
              <RowTableSkeleton numberOfColumn={6} />
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
                    <StatusItems statusDelivery={data.statusDelivery} />
                  </TableDataCell>
                  <TableDataCell>{data.totalPrice}</TableDataCell>
                  <TableDataCell>{data.totalProducts}</TableDataCell>
                  <TableCustomActionsCell>
                    <CustomTooltip message="Preview">
                      <Button to={`${path}/${data._id}`} className="preview-btn">
                        <FontAwesomeIcon icon={faEye} />
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

export default Orders
