import { memo } from 'react';
import DefaultLayout from '~/components/DefaultLayout';
import styles from './DashBoard.module.scss';
import classNames from 'classnames/bind';
import {
    faFileInvoiceDollar,
    faShop,
    faUser,
    faWallet,
} from '@fortawesome/free-solid-svg-icons';
import StatisticItems from '~/components/StatisticItems';
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
            <DefaultLayout active={'dashboard'} page={['Dashboard']}>
                <div className={cx('row-statistics')}>
                    <StatisticItems
                        title="Daily Earning"
                        quantity="$0.0"
                        icon={faFileInvoiceDollar}
                    />
                    <StatisticItems
                        title="Daily Orders"
                        quantity="0"
                        icon={faWallet}
                    />
                    <StatisticItems
                        title="Signup Users"
                        quantity="14"
                        icon={faUser}
                    />
                    <StatisticItems
                        title="Total Product"
                        quantity="8"
                        icon={faShop}
                    />
                </div>
                <div className={cx('row-statistics')}>
                    <div className={cx('sales-report')}>
                        <div className={cx('title')}>
                            <h3>Sales Report</h3>
                        </div>
                        <div className={cx('chart')}></div>
                    </div>
                    <div className={cx('order-report')}>
                        <div className={cx('title')}>
                            <h3>Order Report</h3>
                        </div>
                        <div className={cx('chart')}></div>
                    </div>
                </div>
                <div className={cx('row-statistics')}>
                    <div className={cx('income-report')}>
                        <div className={cx('title')}>
                            <h3>Income Report</h3>
                        </div>
                        <div className={cx('chart')}></div>
                    </div>
                </div>
            </DefaultLayout>
        </div>
    );
}
export default memo(DashBoard);
