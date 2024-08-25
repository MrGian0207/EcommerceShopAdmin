import { useEffect } from 'react'
import { faPen, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import images from '~/assets/Image'
import Button from '~/components/common/Button'
import RowTableSkeleton from '~/components/RowTableSkeleton'
import CustomTooltip from '~/components/Tooltip/CustomTooltip'
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

import styles from './MainCategories.module.scss'

const cx = classNames.bind(styles)

function MainCategories() {
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
        page={['Dashboard', 'Categories/Main Categories']}
        searchEngine={true}
        buttons={[
          <Button to={'/categories/main-categories/add'} className="button-add">
            <FontAwesomeIcon icon={faPlus} />
            Add Category
          </Button>,
        ]}
      >
        <TableLayout>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Category</TableHeaderCell>
              <TableHeaderCell>Total Items</TableHeaderCell>
              <TableHeaderCell>Description</TableHeaderCell>
              <TableHeaderCell>Created at</TableHeaderCell>
              <TableHeaderCell>Actions</TableHeaderCell>
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
