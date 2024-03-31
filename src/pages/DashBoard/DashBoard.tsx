import { memo } from 'react';
import DefaultLayout from '~/components/DefaultLayout';
import styles from './DashBoard.module.scss';
import classNames from 'classnames/bind';
// import Button from '~/components/Button';
// import { useAuth } from '~/context/AuthContext';
// import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function DashBoard(): JSX.Element {
    // const { accessToken, login, logout } = useAuth()!;
    // const navigate = useNavigate();

    // useEffect(() => {
    //     console.log(accessToken);
    //     if (accessToken !== null) {
    //         fetch('http://localhost:8000/dashboard', {
    //             method: 'GET',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 Authorization: `Bearer ${accessToken}`,
    //             },
    //         })
    //             .then((res) => res.json())
    //             .then((data) => {
    //                 const { status } = data;
    //                 if (status === 'Success') {
    //                     console.log('Dashboard successfully');
    //                 } else if (status === 'Error') {
    //                     console.log('Dashboard Error');

    //                     fetch('http://localhost:8000/refreshToken', {
    //                         method: 'POST',
    //                         headers: {
    //                             'Content-Type': 'application/json',
    //                         },
    //                         credentials: 'include',
    //                         mode: 'cors',
    //                     })
    //                         .then((res) => res.json())
    //                         .then((data) => {
    //                             const { status, accessToken } = data;
    //                             if (status === 'success') {
    //                                 console.log('Gọi refresh token thành công');
    //                                 localStorage.removeItem('access_token');
    //                                 localStorage.setItem(
    //                                     'access_token',
    //                                     accessToken,
    //                                 );
    //                                 login(accessToken);
    //                             } else if (status === 'Error') {
    //                                 navigate('/auth/login');
    //                                 console.log(
    //                                     'Cannot make AccessToken request',
    //                                 );
    //                             }
    //                         })
    //                         .catch((e) => {
    //                             console.log(e);
    //                         });
    //                 }
    //             })
    //             .catch((err) => {
    //                 console.log(err);
    //             });
    //     } else {
    //         navigate('/auth/login');
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [accessToken]);

    return (
        <div className={cx('dashboard')}>
            <DefaultLayout active={'dashboard'} page={['Dashboard']} />
            {/* <div className={cx('content')}>
                <div className={cx('title-bar')}>Dashboard</div>
            </div> */}
        </div>
    );
}
export default memo(DashBoard);
