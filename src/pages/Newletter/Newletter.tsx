import styles from './Newletter.module.scss';
import classNames from 'classnames/bind';
import DefaultLayout from '~/layouts/DefaultLayout';
import TableLayout from '~/layouts/TableLayout';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';

const cx = classNames.bind(styles);

function Newletters() {
   useEffect(() => {
      document.title = 'Newletter | NextStore';

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);
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
