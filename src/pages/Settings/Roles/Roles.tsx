import { lazy, Suspense, useEffect } from 'react'
import { faLock } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Button from '~/components/common/Button'
import Loading from '~/components/Loading'
import RowTableSkeleton from '~/components/RowTableSkeleton'
import CustomTooltip from '~/components/Tooltip/CustomTooltip'
import { useTable } from '~/context/TableContext'
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

import styles from './Roles.module.scss'

const cx = classNames.bind(styles)
const TableLayout = lazy(() => import('~/layouts/TableLayout'))

function Roles(): JSX.Element {
  const { loading, dataTable } = useTable()

  useEffect(() => {
    document.title = 'Role | MrGianStore'
  }, [])

  return (
    <div className={cx('roles')}>
      <Suspense fallback={<Loading />}>
        <TableLayout>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Name</TableHeaderCell>
              <TableHeaderCell>Email</TableHeaderCell>
              <TableHeaderCell>Phone</TableHeaderCell>
              <TableHeaderCell>Role</TableHeaderCell>
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
                  <TableDataCell>{data.role}</TableDataCell>
                  <TableDataCell>
                    {format(new Date(data.createdAt), 'dd MMM yyyy HH:mm')}
                  </TableDataCell>
                  <TableCustomActionsCell>
                    <CustomTooltip message="Locked">
                      <Button className="lock-btn">
                        <FontAwesomeIcon icon={faLock} />
                      </Button>
                    </CustomTooltip>
                  </TableCustomActionsCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </TableLayout>
      </Suspense>
    </div>
  )
}

export default Roles
