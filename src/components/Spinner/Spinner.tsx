import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames/bind'

import styles from './Spinner.module.scss'

const cx = classNames.bind(styles)

function Spinner(): JSX.Element {
  return (
    <>
      <FontAwesomeIcon className={cx('spinner')} icon={faSpinner} />
    </>
  )
}

export default Spinner
