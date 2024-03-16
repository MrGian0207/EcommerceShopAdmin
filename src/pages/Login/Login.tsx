import AuthHeader from '~/components/AuthHeader';
import classNames from 'classnames/bind';
import styles from './Login.module.scss';

import FormAuth from '~/components/FormAuth';
import Input from '~/components/Input';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';

import api from '~/api/api';

const inputs = [
    <Input
        index={'Email Adress'}
        label={'Email Adress'}
        iconLeft={faEnvelope}
        type={'text'}
    />,
    <Input
        index={'Password'}
        label={'Password'}
        iconLeft={faLock}
        type={'text'}
    />,
];

const cx = classNames.bind(styles);

function Login(): JSX.Element {
    return (
        <div className={cx('wrapper')}>
            <AuthHeader
                welcome="Welcome to the"
                nameStore="MrGianStore"
                discription="Reactjs Ecommerce script you need"
            />
            <div className={cx('content')}>
                <FormAuth
                    title="Login"
                    nameSubmit="Login"
                    subtitle="Login to your account to continue"
                    suggestion="Don't have an account?"
                    navigator="Get started"
                    navigatorLink={api.register}
                    inputs={inputs}
                    optionName="Forgot Password"
                    optionLink={api.forgetPassword}
                />
            </div>
        </div>
    );
}

export default Login;
