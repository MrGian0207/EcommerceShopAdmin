import styles from './Users.module.scss';
import classNames from 'classnames/bind';
import DefaultLayout from '~/layouts/DefaultLayout';
import TableLayout from '~/layouts/TableLayout';

const cx = classNames.bind(styles);

function Users(): JSX.Element {
  return (
    <div className={cx('users')}>
      <DefaultLayout
        active={'users'}
        page={['Dashboard', 'Users']}
        searchEngine={true}
      >
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
      </DefaultLayout>
    </div>
  );
}

export default Users;
