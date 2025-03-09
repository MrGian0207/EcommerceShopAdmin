import { memo } from 'react'

import classNames from 'classnames/bind'

import Button from '../common/Button'

import styles from './FormAuth.module.scss'

import { FormAuthProps } from '~/types/FormAuthType'

const cx = classNames.bind(styles)

function FormAuth({
  title,
  subtitle,
  suggestion,
  children,
  navigator,
  navigatorLink,
  back,
}: FormAuthProps) {
  return (
    <div className={cx('wrapper')}>
      <h4 className={cx('title')}>{title}</h4>
      <p className={cx('subtitle')}>{subtitle}</p>
      {children}
      {!!suggestion && (
        <h6 className={cx('navigator')}>
          {suggestion}
          {!!navigator && <Button to={navigatorLink}>{navigator}</Button>}
        </h6>
      )}
      {!!back && (
        <button className={cx('back-button')}>
          <Button to={navigatorLink} large={true}>
            {back}
          </Button>
        </button>
      )}
    </div>
  )
}

export default memo(FormAuth)
