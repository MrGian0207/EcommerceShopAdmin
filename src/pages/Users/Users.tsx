import { lazy, Suspense, useEffect } from 'react'
import Loading from '~/components/Loading'
import DefaultLayout from '~/layouts/DefaultLayout'
import classNames from 'classnames/bind'

import styles from './Users.module.scss'

const cx = classNames.bind(styles)
const TableLayout = lazy(() => import('~/layouts/TableLayout'))

function Users(): JSX.Element {
  useEffect(() => {
    document.title = 'User | MrGianStore'

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={cx('users')}>
      <DefaultLayout active={'users'} page={['Dashboard', 'Users']} searchEngine={true}>
        <Suspense fallback={<Loading />}>
          <TableLayout
            headers={['User', 'Email', 'Phone', 'Status', 'Joined', 'Actions']}
            user
            email
            phone
            status
            joined
            actions
            previewButton
          />
        </Suspense>
      </DefaultLayout>
    </div>
  )
}

export default Users
