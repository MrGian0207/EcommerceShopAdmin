import process from 'process'

import { memo, useEffect, useState } from 'react'

import { faFileInvoiceDollar, faShop, faUser, faWallet } from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames/bind'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import StatisticItems from '~/components/StatisticItems'

import ColumnChart from './ColumnChart'
import styles from './DashBoard.module.scss'
import DonutChart from './DonutChart'
import { MonthChart, WeekChart, YearChart } from './LineChart'

import { DashBoardRoute } from '~/constant/PageRoute'
import { useAuth } from '~/context/AuthContext'
import DefaultLayout from '~/layouts/DefaultLayout'

const cx = classNames.bind(styles)

function DashBoard() {
  const { t } = useTranslation('dashboard')
  const { accessToken, setAccessToken } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    document.title = 'Dashboard | MrGianStore'
  }, [])

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
          const { status } = data
          if (status === 'Success') {
            console.log('Dashboard successfully')
          } else if (status === 'Error') {
            console.log('Dashboard Error')

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
                const { status, accessToken } = data
                if (status === 'success') {
                  console.log('Gọi refresh token thành công')
                  localStorage.removeItem('access_token')
                  localStorage.setItem('access_token', accessToken)
                  setAccessToken(accessToken)
                } else if (status === 'Error') {
                  navigate('/auth/login')
                  console.log('Cannot make AccessToken request')
                }
              })
              .catch((e) => {
                console.log(e)
              })
          }
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      navigate('/auth/login')
    }
  }, [accessToken, setAccessToken, navigate])

  const [incomeReportChart, setIncomeReportChart] = useState<string>('week')

  const HandleSwitchIncomeReportChart = (nameReport: string) => {
    switch (nameReport) {
      case 'week':
        setIncomeReportChart('week')
        break
      case 'month':
        setIncomeReportChart('month')
        break
      case 'year':
        setIncomeReportChart('year')
        break
      default:
        setIncomeReportChart('week')
        break
    }
  }

  return (
    <div className={cx('dashboard')}>
      <DefaultLayout active={'dashboard'} page={DashBoardRoute.DashBoardPage}>
        <div className={cx('row-statistics')}>
          <div className={cx('statisticItem')}>
            <StatisticItems title={t('daily_earning')} quantity="$0.0" icon={faFileInvoiceDollar} />
          </div>
          <div className={cx('statisticItem')}>
            <StatisticItems title={t('daily_orders')} quantity="0" icon={faWallet} />
          </div>
          <div className={cx('statisticItem')}>
            <StatisticItems title={t('signUp_users')} quantity="14" icon={faUser} />
          </div>
          <div className={cx('statisticItem')}>
            <StatisticItems title={t('total_product')} quantity="8" icon={faShop} />
          </div>
        </div>
        <div className={cx('row-statistics')}>
          <div className={cx('sales-report')}>
            <div className={cx('title')}>
              <h3>{t('sales_report')}</h3>
            </div>
            <div className={cx('chart')}>
              <ColumnChart />
            </div>
          </div>
          <div className={cx('order-report')}>
            <div className={cx('title')}>
              <h3>{t('order_report')}</h3>
            </div>
            <div className={cx('chart')}>
              <DonutChart />
            </div>
          </div>
        </div>
        <div className={cx('row-statistics')}>
          <div className={cx('income-report')}>
            <div className={cx('title-income-report')}>
              <h3>{t('income_report')}</h3>
              <div className={cx('navigator-report-buttons')}>
                <button
                  onClick={() => {
                    HandleSwitchIncomeReportChart('week')
                  }}
                  className={cx('week', incomeReportChart === 'week' && 'active')}
                >
                  {t('income_report_chart.week')}
                  {incomeReportChart === 'week' && <span className={cx('tab-line')}></span>}
                </button>
                <button
                  onClick={() => {
                    HandleSwitchIncomeReportChart('month')
                  }}
                  className={cx('month', incomeReportChart === 'month' && 'active')}
                >
                  {t('income_report_chart.month')}

                  {incomeReportChart === 'month' && <span className={cx('tab-line')}></span>}
                </button>
                <button
                  onClick={() => {
                    HandleSwitchIncomeReportChart('year')
                  }}
                  className={cx('year', incomeReportChart === 'year' && 'active')}
                >
                  {t('income_report_chart.year')}
                  {incomeReportChart === 'year' && <span className={cx('tab-line')}></span>}
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
  )
}
export default memo(DashBoard)
