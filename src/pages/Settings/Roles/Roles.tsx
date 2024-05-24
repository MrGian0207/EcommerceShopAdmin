import styles from './Roles.module.scss';
import classNames from 'classnames/bind';
import { useEffect, lazy, Suspense } from 'react';
import Loading from '~/components/Loading';

const cx = classNames.bind(styles);
const TableLayout = lazy(() => import('~/layouts/TableLayout'));

function Roles(): JSX.Element {
   useEffect(() => {
      document.title = 'Role | MrGianStore';

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);
   return (
      <div className={cx('roles')}>
         <Suspense fallback={<Loading />}>
            <TableLayout
               headers={['Name', 'Email', 'Phone', 'Role', 'Joined', 'Actions']}
               name
               email
               phone
               role
               joined
               actions
               lockButton
            />
         </Suspense>
      </div>
   );
}

export default Roles;
