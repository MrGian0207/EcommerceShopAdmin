import { lazy, Suspense, useEffect } from 'react'
import { faCopy } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Button from '~/components/common/Button'
import Loading from '~/components/Loading'
import RowTableSkeleton from '~/components/RowTableSkeleton'
import CustomTooltip from '~/components/Tooltip'
import { useTable } from '~/context/TableContext'
import DefaultLayout from '~/layouts/DefaultLayout'
import {
  TableBody,
  TableCustomActionsCell,
  TableDataCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from '~/layouts/TableLayout'
import * as Toastify from '~/services/Toastify'
import classNames from 'classnames/bind'
import { format } from 'date-fns'

import styles from './Newletter.module.scss'

const cx = classNames.bind(styles)
const TableLayout = lazy(() => import('~/layouts/TableLayout'))

function Newletters() {
  const { loading, dataTable } = useTable()

  useEffect(() => {
    document.title = 'Newletter | MrGianStore'
  }, [])

  return (
    <div className={cx('newletter')}>
      <DefaultLayout active={'newletter'} page={['Dashboard', 'Newletter']} searchEngine={true}>
        <Suspense fallback={<Loading />}>
          <TableLayout>
            <TableHeader>
              <TableRow>
                <TableHeaderCell>Email</TableHeaderCell>
                <TableHeaderCell>Created at</TableHeaderCell>
                <TableHeaderCell>Actions</TableHeaderCell>
              </TableRow>
            </TableHeader>

            <TableBody>
              {loading ? (
                <RowTableSkeleton numberOfColumn={3} />
              ) : (
                dataTable.map((data) => (
                  <TableRow key={data._id}>
                    <TableDataCell>
                      <b>{data.email}</b>
                    </TableDataCell>
                    <TableDataCell>
                      {format(new Date(data.createdAt), 'dd MMM yyyy HH:mm')}
                    </TableDataCell>
                    <TableCustomActionsCell>
                      <CustomTooltip message="Copy email">
                        <Button
                          onClick={() => {
                            navigator.clipboard.writeText(data.email)
                            Toastify.showToast('Email Copied', 'success')
                          }}
                          className="copy-btn"
                        >
                          <FontAwesomeIcon icon={faCopy} />
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

export default Newletters
