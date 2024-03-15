import AuthHeader from '~/components/AuthHeader';
import classNames from 'classnames/bind';
import styles from './Register.module.scss';

import FormAuth from '~/components/FormAuth';
import Input from '~/components/Input';
import {
    faEnvelope,
    faFemale,
    faLock,
    faPhone,
    faUser,
} from '@fortawesome/free-solid-svg-icons';

import api from '~/api/api';

const inputs = [
    <Input
        index={'Full Name'}
        label={'Full Name'}
        icon={faUser}
        type={'text'}
    />,
    <div
        style={{
            display: 'inline-flex',
            width: '100%',
        }}
    >
        <Input
            space="space"
            index={'Gender'}
            label={'Gender'}
            icon={faFemale}
            type={'text'}
        />
        <Input index={'Phone'} label={'Phone'} icon={faPhone} type={'text'} />
    </div>,

    <Input
        index={'Email Adress'}
        label={'Email Adress'}
        icon={faEnvelope}
        type={'text'}
    />,
    <Input index={'Password'} label={'Password'} icon={faLock} type={'text'} />,
];

const cx = classNames.bind(styles);

function Register(): JSX.Element {
    return (
        <div className={cx('wrapper')}>
            <AuthHeader
                welcome="Welcome to the"
                nameStore="MrGianStore"
                discription="Reactjs Ecommerce script you need"
            />
            <div className={cx('content')}>
                <FormAuth
                    title="Get Started"
                    nameSubmit="Register"
                    subtitle="Free forever. No credit card needed."
                    suggestion="Already have an account?"
                    navigator="Login"
                    navigatorLink={api.login}
                    inputs={inputs}
                />
            </div>
        </div>
    );
}

export default Register;
