import AuthHeader from '~/components/AuthHeader';
import classNames from 'classnames/bind';
import styles from './ForgotPassword.module.scss';

import FormAuth from '~/components/FormAuth';
import Input from '~/components/Input';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

import api from '~/api/api';

const inputs = [
    <Input
        index={'Email Address'}
        label={'Email Address'}
        iconLeft={faEnvelope}
        type={'text'}
    />,
];

const cx = classNames.bind(styles);
function ForgotPassword() {
    return (
        <div className={cx('wrapper')}>
            <AuthHeader
                welcome="Welcome to the"
                nameStore="MrGianStore"
                discription="Reactjs Ecommerce script you need"
            />
            <div className={cx('content')}>
                <FormAuth
                    title="Forgot your password?"
                    nameSubmit="Register"
                    subtitle="Please enter the email address associated with your account and We will email you a link to reset your password."
                    back={"Back"}
                    navigatorLink={api.login}
                    inputs={inputs}
                />
            </div>
        </div>
    );
}

export default ForgotPassword;
