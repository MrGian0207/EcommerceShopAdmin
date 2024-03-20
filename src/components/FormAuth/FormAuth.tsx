import styles from './FormAuth.module.scss';
import classNames from 'classnames/bind';
import Button from '../Button';
import { ReactNode, memo } from 'react';
const cx = classNames.bind(styles);

type FormAuthProps = {
    title: string;
    subtitle: string;
    suggestion?: string | null;
    children?: ReactNode;
    navigator?: string | null;
    navigatorLink?: string | null;
    back?: string | null;
};

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
