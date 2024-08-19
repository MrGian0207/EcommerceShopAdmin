import { faCancel, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { usePath } from '~/context/PathContext'
import { CustomContentToastifyType } from '~/types/CustomContentToastifyType'
import classNames from 'classnames/bind'

import Button from '../Button'
import styles from './CustomContentToastify.module.scss'

const cx = classNames.bind(styles)

function CustomContentToastify({
  title = 'Notifications',
  handleConfirm,
  handleCancel,
}: CustomContentToastifyType) {
  const { path } = usePath()
  return (
    <div className={cx('msg-container')}>
      <p className={cx('msg-title')}>{title}</p>
      <div className={cx('msg-button')}>
        <Button
          onClick={() => {
            handleConfirm(path)
          }}
          className={cx('msg-confirm-button')}
          rightIcon={<FontAwesomeIcon icon={faTrash} />}
        >
          Confirm
        </Button>
        <Button
          onClick={handleCancel}
          className={cx('msg-reject-button')}
          rightIcon={<FontAwesomeIcon icon={faCancel} />}
        >
          Cancel
        </Button>
      </div>
    </div>
  )
}

export default CustomContentToastify
