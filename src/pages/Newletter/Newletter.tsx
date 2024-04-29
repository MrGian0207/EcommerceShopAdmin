import styles from './Newletter.module.scss';
import classNames from 'classnames/bind';
import DefaultLayout from '~/layouts/DefaultLayout';
import TableLayout from '~/layouts/TableLayout';
import 'react-toastify/dist/ReactToastify.css';

const cx = classNames.bind(styles);

function Newletters() {
  return (
    <div className={cx('newletter')}>
      <DefaultLayout
        active={'newletter'}
        page={['Dashboard', 'Newletter']}
        searchEngine={true}
      >
        <TableLayout
          headers={['Email', 'Created at', 'Actions']}
          email
          createdAt
          actions
          copyButton
        />
      </DefaultLayout>
    </div>
  );
}

export default Newletters;
