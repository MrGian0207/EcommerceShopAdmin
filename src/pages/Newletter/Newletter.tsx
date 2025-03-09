import { useEffect } from 'react'

import { faCopy } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'
import { format } from 'date-fns'
import { useTranslation } from 'react-i18next'

import Button from '~/components/common/Button'
import RowTableSkeleton from '~/components/RowTableSkeleton'
import CustomTooltip from '~/components/Tooltip'

import styles from './Newletter.module.scss'

import { NewletterRoute } from '~/constant/PageRoute'
import { NewletterTableHeader } from '~/constant/Table'
import { useTable } from '~/context/TableContext'
import DefaultLayout from '~/layouts/DefaultLayout'
import TableLayout, {
  TableBody,
  TableCustomActionsCell,
  TableDataCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from '~/layouts/TableLayout'
import * as Toastify from '~/services/Toastify'

const cx = classNames.bind(styles)

function Newletters() {
  const { t } = useTranslation('newletters')
  const { loading, dataTable } = useTable()

  useEffect(() => {
    document.title = 'Newletter | MrGianStore'
  }, [])

  return (
    <div className={cx('newletter')}>
      <DefaultLayout active={'newletter'} page={NewletterRoute.NewletterPage} searchEngine={true}>
        <TableLayout>
          <TableHeader>
            <TableRow>
              {NewletterTableHeader.map((header, index) => (
                <TableHeaderCell key={`header-${index}`}>
                  {t(header, { ns: 'table' })}
                </TableHeaderCell>
              ))}
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
      </DefaultLayout>
    </div>
  )
}

export default Newletters
