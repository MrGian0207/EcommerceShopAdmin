import { useEffect } from 'react'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import images from '~/assets/Image'
import Button from '~/components/common/Button'
import RowTableSkeleton from '~/components/RowTableSkeleton'
import StatusItems from '~/components/StatusItems'
import CustomTooltip from '~/components/Tooltip/CustomTooltip'
import { UsersRoute } from '~/constant/PageRoute'
import { UsersTableHeader } from '~/constant/Table'
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
import classNames from 'classnames/bind'
import { format } from 'date-fns'
import { useTranslation } from 'react-i18next'

import styles from './Users.module.scss'

const cx = classNames.bind(styles)

function Users(): JSX.Element {
  const { t } = useTranslation('users')
  const { path } = usePath()
  const { loading, dataTable } = useTable()

  useEffect(() => {
    document.title = 'User | MrGianStore'
  }, [])

  return (
    <div className={cx('users')}>
      <DefaultLayout active={'users'} page={UsersRoute.UsersPage} searchEngine={true}>
        <TableLayout>
          <TableHeader>
            <TableRow>
              {UsersTableHeader.map((header, index) => (
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
      </DefaultLayout>
    </div>
  )
}

export default Users
