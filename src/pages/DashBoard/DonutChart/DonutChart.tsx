import { useEffect, useRef } from 'react'
import ApexCharts from 'apexcharts'
import classNames from 'classnames/bind'
import { useTranslation } from 'react-i18next'

import styles from './DonutChart.module.scss'

const cx = classNames.bind(styles)

function DonutChart(): JSX.Element {
  const { t } = useTranslation('dashboard')
  const chartRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const options = {
      series: [79, 9, 22, 1, 7],
      labels: [
        t('statusDelivery.pending', { ns: 'common' }),
        t('statusDelivery.on_the_way', { ns: 'common' }),
        t('statusDelivery.delivered', { ns: 'common' }),
        t('statusDelivery.returned', { ns: 'common' }),
        t('statusDelivery.cancelled', { ns: 'common' }),
      ],
      colors: [
        'rgb(24, 144, 255)',
        'rgb(63, 0, 113)',
        'rgb(84, 214, 44)',
        'rgb(255, 171, 0)',
        'rgb(211, 49, 49)',
      ],
      chart: {
        type: 'donut',
        height: '260',
      },
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: true,
              value: {
                show: true,
                fontSize: '1.5rem',
                fontWeight: 'bold',
              },
              total: {
                show: true,
                fontSize: '1rem',
                fontWeight: 'bold',
                color: 'rgba(55, 61, 63, 0.6)',
              },
            },
          },
        },
      },
    }

    let chart: ApexCharts
    if (chartRef?.current) {
      chart = new ApexCharts(chartRef.current, options)
      chart.render()
    }

    return () => {
      chart.destroy()
    }
  }, [t])

  return <div id="chart" className={cx('donutChart')} ref={chartRef}></div>
}

export default DonutChart
