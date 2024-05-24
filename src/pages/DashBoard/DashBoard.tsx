import { memo } from 'react';
import DefaultLayout from '~/layouts/DefaultLayout';
import styles from './DashBoard.module.scss';
import classNames from 'classnames/bind';
import {
   faFileInvoiceDollar,
   faShop,
   faUser,
   faWallet,
} from '@fortawesome/free-solid-svg-icons';
import StatisticItems from '~/components/StatisticItems';
import ColumnChart from './ColumnChart';
import DonutChart from './DonutChart';
import { MonthChart, WeekChart, YearChart } from './LineChart';
import { useAuth } from '~/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const cx = classNames.bind(styles);

function DashBoard(): JSX.Element {
   const { accessToken, login } = useAuth()!;
   const navigate = useNavigate();

   useEffect(() => {
      document.title = 'Dashboard | MrGianStore';

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   useEffect(() => {
      if (accessToken !== null) {
         fetch(`${process.env.REACT_APP_BACKEND_URL}/dashboard`, {
            method: 'GET',
            headers: {
               'Content-Type': 'application/json',
               Authorization: `Bearer ${accessToken}`,
            },
         })
            .then((res) => res.json())
            .then((data) => {
               const { status } = data;
               if (status === 'Success') {
                  console.log('Dashboard successfully');
               } else if (status === 'Error') {
                  console.log('Dashboard Error');

                  fetch(`${process.env.REACT_APP_BACKEND_URL}/refreshToken`, {
                     method: 'POST',
                     headers: {
                        'Content-Type': 'application/json',
                     },
                     credentials: 'include',
                     mode: 'cors',
                  })
                     .then((res) => res.json())
                     .then((data) => {
                        const { status, accessToken } = data;
                        if (status === 'success') {
                           console.log('Gọi refresh token thành công');
                           localStorage.removeItem('access_token');
                           localStorage.setItem('access_token', accessToken);
                           login(accessToken);
                        } else if (status === 'Error') {
                           navigate('/auth/login');
                           console.log('Cannot make AccessToken request');
                        }
                     })
                     .catch((e) => {
                        console.log(e);
                     });
               }
            })
            .catch((err) => {
               console.log(err);
            });
      } else {
         navigate('/auth/login');
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [accessToken]);

   const [incomeReportChart, setIncomeReportChart] = useState<string>('week');

   const HandleSwitchIncomeReportChart = (nameReport: string) => {
      switch (nameReport) {
         case 'week':
            setIncomeReportChart('week');
            break;
         case 'month':
            setIncomeReportChart('month');
            break;
         case 'year':
            setIncomeReportChart('year');
            break;
         default:
            setIncomeReportChart('week');
            break;
      }
   };

   return (
      <div className={cx('dashboard')}>
         <DefaultLayout active={'dashboard'} page={['Dashboard']}>
            <div className={cx('row-statistics')}>
               <div className={cx('statisticItem')}>
                  <StatisticItems
                     title="Daily Earning"
                     quantity="$0.0"
                     icon={faFileInvoiceDollar}
                  />
               </div>
               <div className={cx('statisticItem')}>
                  <StatisticItems
                     title="Daily Orders"
                     quantity="0"
                     icon={faWallet}
                  />
               </div>
               <div className={cx('statisticItem')}>
                  <StatisticItems
                     title="Signup Users"
                     quantity="14"
                     icon={faUser}
                  />
               </div>
               <div className={cx('statisticItem')}>
                  <StatisticItems
                     title="Total Product"
                     quantity="8"
                     icon={faShop}
                  />
               </div>
            </div>
            <div className={cx('row-statistics')}>
               <div className={cx('sales-report')}>
                  <div className={cx('title')}>
                     <h3>Sales Report</h3>
                  </div>
                  <div className={cx('chart')}>
                     <ColumnChart />
                  </div>
               </div>
               <div className={cx('order-report')}>
                  <div className={cx('title')}>
                     <h3>Order Report</h3>
                  </div>
                  <div className={cx('chart')}>
                     <DonutChart />
                  </div>
               </div>
            </div>
            <div className={cx('row-statistics')}>
               <div className={cx('income-report')}>
                  <div className={cx('title-income-report')}>
                     <h3>Income Report</h3>
                     <div className={cx('navigator-report-buttons')}>
                        <button
                           onClick={() => {
                              HandleSwitchIncomeReportChart('week');
                           }}
                           className={cx(
                              'week',
                              incomeReportChart === 'week' && 'active',
                           )}
                        >
                           Week
                           {incomeReportChart === 'week' && (
                              <span className={cx('tab-line')}></span>
                           )}
                        </button>
                        <button
                           onClick={() => {
                              HandleSwitchIncomeReportChart('month');
                           }}
                           className={cx(
                              'month',
                              incomeReportChart === 'month' && 'active',
                           )}
                        >
                           Month
                           {incomeReportChart === 'month' && (
                              <span className={cx('tab-line')}></span>
                           )}
                        </button>
                        <button
                           onClick={() => {
                              HandleSwitchIncomeReportChart('year');
                           }}
                           className={cx(
                              'year',
                              incomeReportChart === 'year' && 'active',
                           )}
                        >
                           Year
                           {incomeReportChart === 'year' && (
                              <span className={cx('tab-line')}></span>
                           )}
                        </button>
                     </div>
                  </div>
                  <div className={cx('chart')}>
                     {incomeReportChart === 'week' && <WeekChart />}
                     {incomeReportChart === 'month' && <MonthChart />}
                     {incomeReportChart === 'year' && <YearChart />}
                  </div>
               </div>
            </div>
         </DefaultLayout>
      </div>
   );
}
export default memo(DashBoard);
