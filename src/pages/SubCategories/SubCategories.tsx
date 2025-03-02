import { useEffect } from 'react'
import { faPen, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import images from '~/assets/Image'
import Button from '~/components/common/Button'
import RowTableSkeleton from '~/components/RowTableSkeleton'
import CustomTooltip from '~/components/Tooltip/CustomTooltip'
import { SubCategoriesRoute } from '~/constant/PageRoute'
import { SubCategoriesTableHeader } from '~/constant/Table'
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
import classNames from 'classnames/bind'
import { format } from 'date-fns'
import { useTranslation } from 'react-i18next'

import styles from './SubCategories.module.scss'

const cx = classNames.bind(styles)

function SubCategories(): JSX.Element {
  const { t } = useTranslation('subCategories')
  const { path } = usePath()
  const { loading, dataTable } = useTable()
  const { isDeleting, setDeletedData } = useDeleteData()

  useEffect(() => {
    document.title = 'Sub Category | MrGianStore'
  }, [])

  return (
    <div className={cx('sub-categories')}>
      <DefaultLayout
        active={'categories'}
        page={SubCategoriesRoute.SubCategoriesPage}
        searchEngine={true}
        buttons={[
          <Button
            key="button-categories-add"
            to={'/categories/sub-categories/add'}
            className="button-add"
          >
            <FontAwesomeIcon icon={faPlus} />
            {t('actions.add_sub_category')}
          </Button>,
        ]}
      >
        <TableLayout>
          <TableHeader>
            <TableRow>
              {SubCategoriesTableHeader.map((header, index) => (
                <TableHeaderCell key={`header-${index}`}>
                  {t(header, { ns: 'table' })}
                </TableHeaderCell>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {loading ? (
              <RowTableSkeleton numberOfColumn={4} />
            ) : (
              dataTable.map((data) => (
                <TableRow key={data._id}>
                  <TableCustomDataCell
                    imageSrc={data.image !== 'None' ? data.image : images.userDefaults}
                  >
                    {data.name}
                  </TableCustomDataCell>
                  <TableDataCell>{data.parentCategory}</TableDataCell>
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

export default SubCategories
