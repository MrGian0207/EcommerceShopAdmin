import './ColumnChart.css'

import { useEffect, useRef } from 'react'

import ApexCharts from 'apexcharts'
import classNames from 'classnames/bind'
import { useTranslation } from 'react-i18next'

import styles from './ColumnChart.module.scss'

const cx = classNames.bind(styles)

function ColumnChart() {
  const { t } = useTranslation('dashboard')
  const chartRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const currentChartRef = chartRef.current
    const options = {
      series: [{ name: t('sales_report_chart.sales'), data: [25, 33, 32, 28] }],
      chart: {
        type: 'bar',
        height: 250,
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '35%',
          borderRadius: 4,
        },
      },
      colors: ['#525feb'],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent'],
      },
      grid: {
        show: true, // Hiển thị dòng lưới
        borderColor: 'rgb(145, 158, 171)', // Màu của dòng lưới
        strokeDashArray: 3, // Kiểu đường nét đứt
        position: 'back', // Vị trí của dòng lưới (trước hoặc sau các thanh cột)
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
      },

      tooltip: {
        enabled: true, // Tắt tooltip
        y: {
          title: {
            text: '',
            style: {
              display: 'none',
            },
          },
        },
      },
      fill: {
        opacity: 1,
      },
    }
    let chart: ApexCharts
    if (currentChartRef) {
      chart = new ApexCharts(currentChartRef, options)
      chart.render()
    }
    return () => {
      chart.destroy()
    }
  }, [t])

  return <div id="chart" className={cx('columnChart')} ref={chartRef}></div>
}

export default ColumnChart
