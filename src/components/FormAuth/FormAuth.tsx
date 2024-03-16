import styles from './FormAuth.module.scss';
import classNames from 'classnames/bind';
import Button from '../Button';
import { memo } from 'react';

const cx = classNames.bind(styles);

type FormAuthProps = {
    title: string;
    nameSubmit: string;
    subtitle: string;
    suggestion?: string | null;
    navigator?: string | null;
    navigatorLink?: string | null;
    inputs: JSX.Element[];
    optionName?: string | null;
    optionLink?: string | null;
    back?: string | null;
};

function FormAuth({
    title,
    nameSubmit,
    subtitle,
    suggestion,
    inputs,
    navigator,
    navigatorLink,
    optionName,
    optionLink,
    back,
}: FormAuthProps): JSX.Element {
    return (
        <div className={cx('wrapper')}>
            <h4 className={cx('title')}>{title}</h4>
            <p className={cx('subtitle')}>{subtitle}</p>
            <form className={cx('formData')}>
                {inputs.map((input, index) => (
                    <div key={index}>{input}</div>
                ))}
            </form>
            {!!optionName && (
                <div className={cx('option')}>
                    <div className={cx('remember-me')}>
                        <div className={cx('remember-input')}>
                            <input type="checkbox" id="remember" />
                        </div>
                        <label htmlFor="remember-me">Remember me</label>
                    </div>
                    <span className={cx('forgot-password')}>
                        <Button to={optionLink} children={optionName} />
                    </span>
                </div>
            )}
            <button type="submit" className={cx('auth-button')}>
                {nameSubmit}
            </button>
            {!!suggestion && (
                <h6 className={cx('navigator')}>
                    {suggestion}
                    {!!navigator && (
                        <Button to={navigatorLink} children={navigator} />
                    )}
                </h6>
            )}
            {!!back && (
                <button className={cx('back-button')}>
                    <Button to={navigatorLink} children={back} large={true} />
                </button>
            )}
        </div>
    );
}

export default memo(FormAuth);
