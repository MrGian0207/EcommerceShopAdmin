import './LineChart.css'

import { useEffect, useRef } from 'react'

import ApexCharts from 'apexcharts'
import classNames from 'classnames/bind'
import { useTranslation } from 'react-i18next'

import styles from './LineChart.module.scss'

const cx = classNames.bind(styles)

function YearChart() {
  const { t } = useTranslation('dashboard')
  const chartRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const options = {
      series: [
        {
          name: t('income_report_chart.income'),
          data: [9.182, 13.71, 6.222, 1.9, 0, 0, 0, 0, 0, 0, 0, 0],
        },
      ],
      chart: {
        toolbar: {
          show: false,
        },
        height: 265,
        type: 'area',
        zoom: {
          enabled: false,
        },
      },
      tooltip: {
        enabled: true,
        y: {
          formatter: (value: number) => `$${value}`,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
        width: 3,
        colors: ['rgb(82, 95, 235)'],
      },
      grid: {
        show: true,
        borderColor: 'rgb(145, 158, 171)',
        strokeDashArray: 3,
        position: 'back',
        xaxis: {
          lines: {
            show: false, // Ẩn dòng lưới trục x
          },
        },
        yaxis: {
          lines: {
            show: true, // Ẩn dòng lưới trục y
            opacity: 0.1,
          },
        },
        row: {
          colors: undefined,
          opacity: 0.5,
        },
        column: {
          colors: undefined,
          opacity: 0.5,
        },
        padding: {
          top: 0,
          right: 30,
          bottom: 0,
          left: 20,
        },
      },
      fill: {
        type: 'gradient',
        gradient: {
          type: 'vertical',
          opacityFrom: 1,
          opacityTo: 0,
          stops: [0, 100],
          colorStops: [
            {
              offset: 0,
              opacity: 0.3,
              color: 'rgba(82, 95, 225, 0.72)',
            },
            {
              offset: 100,
              opacity: 0,
              color: '#ffffff',
            },
          ],
        },
      },
      xaxis: {
        categories: [
          t('january'),
          t('february'),
          t('march'),
          t('april'),
          t('may'),
          t('june'),
          t('july'),
          t('august'),
          t('september'),
          t('october'),
          t('november'),
          t('december'),
        ],
        tooltip: {
          enabled: true,
        },
      },
      yaxis: {
        labels: {
          show: true,
          style: {
            colors: [],
            fontSize: '12px',
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontWeight: 400,
            cssClass: 'apexcharts-yaxis-label',
          },
          formatter: (val: number) => {
            return `$${val}.0`
          },
        },
      },
    }
    let chart: ApexCharts
    if (chartRef.current) {
      chart = new ApexCharts(chartRef.current, options)
      chart.render()
    }

    return () => {
      chart.destroy()
    }
  })

  return <div id="chart" className={cx('lineChart')} ref={chartRef}></div>
}

export { YearChart }
