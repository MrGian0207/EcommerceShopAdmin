import { faPen, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Button from '~/components/Button'
import DefaultLayout from '~/layouts/DefaultLayout'
import classNames from 'classnames/bind'

import styles from './Brands.module.scss'

import 'react-toastify/dist/ReactToastify.css'

import { lazy, Suspense, useEffect } from 'react'
import Loading from '~/components/Loading'
import RowTableSkeleton from '~/components/RowTableSkeleton'
import { useDeleteData } from '~/context/DeleteDataContext'
import { usePath } from '~/context/PathContext'
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
import { format } from 'date-fns'

const TableLayout = lazy(() => import('~/layouts/TableLayout'))

const cx = classNames.bind(styles)

function Brands() {
  const { path } = usePath()
  const { loading, dataTable } = useTable()
  const { isDeleting, setDeletedData } = useDeleteData()

  console.log('re-render:', path)

  useEffect(() => {
    document.title = 'Brand | MrGianStore'
  }, [])

  return (
    <div className={cx('brands')}>
      <DefaultLayout
        active={'brands'}
        page={['Dashboard', 'Brands']}
        searchEngine={true}
        buttons={[
          <Button to={'/brands/add'} className="button-add">
            <FontAwesomeIcon icon={faPlus} />
            Add Brand
          </Button>,
        ]}
      >
        <Suspense fallback={<Loading />}>
          <TableLayout>
            <TableHeader>
              <TableRow>
                <TableHeaderCell>Category</TableHeaderCell>
                <TableHeaderCell>Description</TableHeaderCell>
                <TableHeaderCell>Created at</TableHeaderCell>
                <TableHeaderCell>Actions</TableHeaderCell>
              </TableRow>
            </TableHeader>

            <TableBody>
              {loading ? (
                <RowTableSkeleton numberOfColumn={4} />
              ) : (
                dataTable.map((data) => (
                  <TableRow key={data.id}>
                    <TableCustomDataCell imageSrc={data.image}>{data.name}</TableCustomDataCell>
                    <TableDataCell>{data.description}</TableDataCell>
                    <TableDataCell>{format(new Date(data.createdAt), 'dd MMM yyyy')}</TableDataCell>
                    <TableCustomActionsCell>
                      <Button to={`${path}/${data.id}`} className="edit-btn">
                        <FontAwesomeIcon icon={faPen} />
                      </Button>
                      <Button
                        className="delete-btn"
                        disabled={isDeleting}
                        onClick={() => {
                          setDeletedData({
                            id: data.id,
                            name: data.name,
                          })
                        }}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </Button>
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

export default Brands
