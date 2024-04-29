import styles from './Roles.module.scss';
import classNames from 'classnames/bind';
import TableLayout from '~/layouts/TableLayout';

const cx = classNames.bind(styles);

function Roles(): JSX.Element {
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
