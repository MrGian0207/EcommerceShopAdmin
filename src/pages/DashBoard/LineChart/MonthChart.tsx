import classNames from 'classnames/bind'

import styles from './LineChart.module.scss'

import './LineChart.css'

import { useEffect, useRef } from 'react'
import ApexCharts from 'apexcharts'

const cx = classNames.bind(styles)

function MonthChart(): JSX.Element {
  const chartRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const options = {
      series: [
        {
          name: 'Income',
          data: [
            25, 0, 79, 34, 299, 45, 0, 226, 170, 0, 94, 39, 0, 0, 62, 375, 0, 34, 0, 0, 0, 116, 128,
            0, 56, 0, 118, 0, 0, 0,
          ],
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
          '1',
          '2',
          '3',
          '4',
          '5',
          '6',
          '7',
          '8',
          '9',
          '10',
          '11',
          '12',
          '13',
          '14',
          '15',
          '16',
          '17',
          '18',
          '19',
          '20',
          '21',
          '22',
          '23',
          '24',
          '25',
          '26',
          '27',
          '28',
          '29',
          '30',
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

export { MonthChart }
