import { memo, useEffect, useRef, useState } from 'react'
import { faDownload, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Button from '~/components/common/Button'
import Loading from '~/components/Loading'
import { OrdersRoute } from '~/constant/PageRoute'
import { useAuth } from '~/context/AuthContext'
import { useDeleteData } from '~/context/DeleteDataContext'
import { usePath } from '~/context/PathContext'
import DefaultLayout from '~/layouts/DefaultLayout'
import { SelectedOptionType } from '~/types/ButtonType'
import { emptyOrder, OrderType } from '~/types/OrderType'
import classNames from 'classnames/bind'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { useTranslation } from 'react-i18next'

import { PreviewDetail, PreviewProduct } from './OrdersComponent'
import styles from './OrdersPreview.module.scss'

const cx = classNames.bind(styles)

function OrdersPreview(): JSX.Element {
  const { t } = useTranslation('orders')

  const downloadPdf = async () => {
    const input = pdfRef.current
    if (pdfRef.current) {
    }
    await html2canvas(input as HTMLDivElement).then((canvas) => {
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF('p', 'mm', 'a4', true)
      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = pdf.internal.pageSize.getHeight()
      const imgWidth = canvas.width
      const imgHeight = canvas.height
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight)
      const imgX = (pdfWidth - imgWidth * ratio) / 2
      const imgY = 30
      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio)
      pdf.save('invoice.pdf')
    })
  }

  const pdfRef = useRef<HTMLDivElement>(null)

  const { setDeletedData } = useDeleteData()
  const { accessToken } = useAuth()
  const { path } = usePath()

  const [selectedOption, setSelectedOption] = useState<SelectedOptionType>('Pending')
  const [loading, setLoading] = useState<boolean>(true)
  const [data, setData] = useState<OrderType>(emptyOrder)

  useEffect(() => {
    document.title = 'Preview Order | MrGianStore'
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}${path}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        const resData = await res.json()
        setData(resData)
        setSelectedOption(resData.statusDelivery)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [path, accessToken])

  return (
    <div className={cx('brands')}>
      <DefaultLayout
        active={'orders'}
        page={OrdersRoute.OrdersPreviewPage}
        buttons={[
          <Button onClick={downloadPdf} className="button-download">
            <FontAwesomeIcon icon={faDownload} />
            {t('actions.download', { ns: 'common' })}
          </Button>,
          <Button
            onClick={() => {
              setDeletedData({
                id: data._id,
                name: `Order ${data._id}`,
                path: path.replace(/\/[a-zA-Z0-9]+$/, ''),
              })
            }}
            className="button-delete"
          >
            <FontAwesomeIcon icon={faTrash} />
            {t('actions.delete', { ns: 'common' })}
          </Button>,
          <Button select selectedOption={selectedOption} setSelectedOption={setSelectedOption} />,
        ]}
      >
        {loading ? (
          <Loading />
        ) : (
          <div className={cx('ordersPreview')} ref={pdfRef}>
            {/* Orders Detail */}
            <div className={cx('previewDetail')}>
              <PreviewDetail orderData={data} />

              {/* Product Preview In Orders */}
              <div className={cx('previewProduct')}>
                <div className={cx('product-table')}>
                  <PreviewProduct orderData={data} />
                </div>
              </div>
            </div>
          </div>
        )}
      </DefaultLayout>
    </div>
  )
}

export default memo(OrdersPreview)
