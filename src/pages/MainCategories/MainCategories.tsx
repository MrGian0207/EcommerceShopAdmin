import { useEffect } from 'react'

import { faPen, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames/bind'
import { format } from 'date-fns'
import { useTranslation } from 'react-i18next'

import Button from '~/components/common/Button'
import RowTableSkeleton from '~/components/RowTableSkeleton'
import CustomTooltip from '~/components/Tooltip/CustomTooltip'

import styles from './MainCategories.module.scss'

import images from '~/assets/Image'
import { MainCategoriesRoute } from '~/constant/PageRoute'
import { MainCategoriesTableHeader } from '~/constant/Table'
import { useDeleteData } from '~/context/DeleteDataContext'
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

function MainCategories() {
  const { t } = useTranslation('mainCategories')
  const { path } = usePath()
  const { loading, dataTable } = useTable()
  const { isDeleting, setDeletedData } = useDeleteData()

  useEffect(() => {
    document.title = 'Category | MrGianStore'
  }, [])

  return (
    <div className={cx('main-categories')}>
      <DefaultLayout
        active={'categories'}
        page={MainCategoriesRoute.MainCategoriesPage}
        searchEngine={true}
        buttons={[
          <Button key={0} to={'/categories/main-categories/add'} className="button-add">
            <FontAwesomeIcon icon={faPlus} />
            {t('actions.add_category')}
          </Button>,
        ]}
      >
        <TableLayout>
          <TableHeader>
            <TableRow>
              {MainCategoriesTableHeader.map((header, index) => (
                <TableHeaderCell key={`header-${index}`}>
                  {t(header, { ns: 'table' })}
                </TableHeaderCell>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <RowTableSkeleton numberOfColumn={5} />
            ) : (
              dataTable.map((data) => (
                <TableRow key={data._id}>
                  <TableCustomDataCell
                    imageSrc={data.image !== 'None' ? data.image : images.userDefaults}
                  >
                    {data.name}
                  </TableCustomDataCell>
                  <TableDataCell>{data.totalProducts}</TableDataCell>
                  <TableDataCell>{data.description}</TableDataCell>
                  <TableDataCell>{format(new Date(data.createdAt), 'dd MMM yyyy')}</TableDataCell>
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

export default MainCategories
