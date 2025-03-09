import classNames from 'classnames/bind'

import styles from './AuthHeader.module.scss'

const cx = classNames.bind(styles)

function AuthHeader(props: { welcome: string; nameStore: string; description: string }) {
  return (
    <div className={cx('wrapper')}>
      <header className={cx('content')}>
        <h3 className={cx('welcome')}>{props.welcome}</h3>
        <h2 className={cx('nameStore')}>{props.nameStore}</h2>
        <p className={cx('description')}>{props.description}</p>
      </header>
    </div>
  )
}

export default AuthHeader
