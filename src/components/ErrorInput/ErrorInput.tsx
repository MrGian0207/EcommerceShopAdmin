import styles from './ErrorInput.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function ErrorInput({ nameError }: { nameError: string }) {
   return <p className={cx('custom-error')}>{nameError}</p>;
}

export default ErrorInput;
