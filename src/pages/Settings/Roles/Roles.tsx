import { useEffect } from 'react'

import { faLock } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames/bind'
import { format } from 'date-fns'
import { useTranslation } from 'react-i18next'

import Button from '~/components/common/Button'
import RowTableSkeleton from '~/components/RowTableSkeleton'
import CustomTooltip from '~/components/Tooltip/CustomTooltip'

import styles from './Roles.module.scss'

import images from '~/assets/Image'
import { RolesTableHeader } from '~/constant/Table'
import { useTable } from '~/context/TableContext'
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

function Roles() {
  const { t } = useTranslation('settings')
  const { loading, dataTable } = useTable()

  useEffect(() => {
    document.title = 'Role | MrGianStore'
  }, [])

  return (
    <div className={cx('roles')}>
      <TableLayout>
        <TableHeader>
          <TableRow>
            {RolesTableHeader.map((header, index) => (
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
    </div>
  )
}

export default Roles
