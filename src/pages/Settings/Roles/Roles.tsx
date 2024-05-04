import styles from './Roles.module.scss';
import classNames from 'classnames/bind';
import TableLayout from '~/layouts/TableLayout';
import { useEffect } from 'react';

const cx = classNames.bind(styles);

function Roles(): JSX.Element {
   useEffect(() => {
      document.title = 'Role | NextStore';

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);
   return (
      <div className={cx('roles')}>
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
      </div>
   );
}

export default Roles;
