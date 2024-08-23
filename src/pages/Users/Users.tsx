import { lazy, Suspense, useEffect } from 'react'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Button from '~/components/common/Button'
import Loading from '~/components/Loading'
import RowTableSkeleton from '~/components/RowTableSkeleton'
import StatusItems from '~/components/StatusItems'
import CustomTooltip from '~/components/Tooltip/CustomTooltip'
import { usePath } from '~/context/PathContext'
import { useTable } from '~/context/TableContext'
import DefaultLayout from '~/layouts/DefaultLayout'
import {
  TableBody,
  TableCustomActionsCell,
  TableCustomDataCell,
  TableDataCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from '~/layouts/TableLayout'
import classNames from 'classnames/bind'
import { format } from 'date-fns'

import styles from './Users.module.scss'

const cx = classNames.bind(styles)
const TableLayout = lazy(() => import('~/layouts/TableLayout'))

function Users(): JSX.Element {
  const { path } = usePath()
  const { loading, dataTable } = useTable()

  console.log(dataTable)

  useEffect(() => {
    document.title = 'User | MrGianStore'
  }, [])

  return (
    <div className={cx('users')}>
      <DefaultLayout active={'users'} page={['Dashboard', 'Users']} searchEngine={true}>
        <Suspense fallback={<Loading />}>
          <TableLayout>
            <TableHeader>
              <TableRow>
                <TableHeaderCell>User</TableHeaderCell>
                <TableHeaderCell>Email</TableHeaderCell>
                <TableHeaderCell>Phone</TableHeaderCell>
                <TableHeaderCell>Status</TableHeaderCell>
                <TableHeaderCell>Joined</TableHeaderCell>
                <TableHeaderCell>Actions</TableHeaderCell>
              </TableRow>
            </TableHeader>

            <TableBody>
              {loading ? (
                <RowTableSkeleton numberOfColumn={6} />
              ) : (
                dataTable.map((data) => (
                  <TableRow key={data._id}>
                    <TableCustomDataCell imageSrc={data.image}>{data.name}</TableCustomDataCell>
                    <TableDataCell>{data.email}</TableDataCell>
                    <TableDataCell>{data.phone}</TableDataCell>
                    <TableDataCell>
                      <StatusItems statusUser={data.statusUser} />
                    </TableDataCell>
                    <TableDataCell>
                      {format(new Date(data.createdAt), 'dd MMM yyyy HH:mm')}
                    </TableDataCell>
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
        </Suspense>
      </DefaultLayout>
    </div>
  )
}

export default Users
