import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import styles from './Spinner.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Spinner(): JSX.Element {
   return (
      <>
         <FontAwesomeIcon className={cx('spinner')} icon={faSpinner} />
      </>
   );
}

export default Spinner;
