import { memo } from 'react'
import { FormAuthProps } from '~/types/FormAuthType'
import classNames from 'classnames/bind'

import Button from '../Button'
import styles from './FormAuth.module.scss'

const cx = classNames.bind(styles)

function FormAuth({
  title,
  subtitle,
  suggestion,
  children,
  navigator,
  navigatorLink,
  back,
}: FormAuthProps): JSX.Element {
  return (
    <div className={cx('wrapper')}>
      <h4 className={cx('title')}>{title}</h4>
      <p className={cx('subtitle')}>{subtitle}</p>
      {children}
      {!!suggestion && (
        <h6 className={cx('navigator')}>
          {suggestion}
          {!!navigator && <Button to={navigatorLink} children={navigator} />}
        </h6>
      )}
      {!!back && (
        <button className={cx('back-button')}>
          <Button to={navigatorLink} children={back} large={true} />
        </button>
      )}
    </div>
  )
}

export default memo(FormAuth)
