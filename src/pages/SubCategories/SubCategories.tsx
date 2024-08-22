import { lazy, Suspense, useEffect } from 'react'
import { faPen, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Button from '~/components/Button'
import Loading from '~/components/Loading'
import RowTableSkeleton from '~/components/RowTableSkeleton'
import CustomTooltip from '~/components/Tooltip/CustomTooltip'
import { useDeleteData } from '~/context/DeleteDataContext'
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

import styles from './SubCategories.module.scss'

const cx = classNames.bind(styles)
const TableLayout = lazy(() => import('~/layouts/TableLayout'))

function SubCategories(): JSX.Element {
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
        page={['Dashboard', 'SubCategories']}
        searchEngine={true}
        buttons={[
          <Button to={'/categories/sub-categories/add'} className="button-add">
            <FontAwesomeIcon icon={faPlus} />
            Add Sub Category
          </Button>,
        ]}
      >
        <Suspense fallback={<Loading />}>
          <TableLayout>
            <TableHeader>
              <TableRow>
                <TableHeaderCell>Category</TableHeaderCell>
                <TableHeaderCell>Parent Category</TableHeaderCell>
                <TableHeaderCell>Created at</TableHeaderCell>
                <TableHeaderCell>Actions</TableHeaderCell>
              </TableRow>
            </TableHeader>

            <TableBody>
              {loading ? (
                <RowTableSkeleton numberOfColumn={4} />
              ) : (
                dataTable.map((data) => (
                  <TableRow key={data._id}>
                    <TableCustomDataCell imageSrc={data.image}>{data.name}</TableCustomDataCell>
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
        </Suspense>
      </DefaultLayout>
    </div>
  )
}

export default SubCategories
