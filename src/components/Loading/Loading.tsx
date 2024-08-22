import { useEffect, useRef } from 'react'
import classNames from 'classnames/bind'

import styles from './Loading.module.scss'

const cx = classNames.bind(styles)

function Loading() {
  const loadingRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let frameId: number

    const updateProgress = () => {
      if (loadingRef.current) {
        // Lấy giá trị hiện tại của biến CSS --progress-width
        const computedStyle = window.getComputedStyle(loadingRef.current)
        let currentWidth = parseInt(computedStyle.getPropertyValue('--progress-width') || '0', 10)

        // Reset width khi vượt quá 100%
        if (currentWidth >= 100) {
          currentWidth = 0
        }

        // Cập nhật giá trị mới cho biến CSS --progress-width
        loadingRef.current.style.setProperty('--progress-width', `${currentWidth + 3}%`)

        // Gọi lại requestAnimationFrame để tiếp tục cập nhật
        frameId = requestAnimationFrame(updateProgress)
      }
    }

    // Bắt đầu animation
    frameId = requestAnimationFrame(updateProgress)

    // Cleanup khi component unmount
    return () => {
      cancelAnimationFrame(frameId)
    }
  }, [])

  return (
    <div className={cx('loading')}>
      <div className={cx('logo')}>
        <div>
          <span className={cx('style-logo')}>MrGian</span>
          store
        </div>
      </div>
      <div ref={loadingRef} className={cx('progress-bar')} data-label="Loading..."></div>
    </div>
  )
}

export default Loading
