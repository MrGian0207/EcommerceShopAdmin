import styles from './Loading.module.scss';
import classNames from 'classnames/bind';
import { useRef, useEffect } from 'react';

const cx = classNames.bind(styles);

function Loading() {
   const loadingRef = useRef<HTMLDivElement>(null);

   useEffect(() => {
      if (loadingRef.current) {
         const interval = setInterval(() => {
            // Lấy giá trị hiện tại của biến CSS --progress-width
            let currentWidth = parseInt(
               window
                  .getComputedStyle(loadingRef.current!)
                  .getPropertyValue('--progress-width') || '0',
               10,
            );

            // Kiểm tra nếu đã đạt 100% thì dừng lại
            if (currentWidth > 100 && currentWidth) currentWidth = 0;
            // Cập nhật giá trị mới cho biến CSS --progress-width
            loadingRef.current!.style.setProperty(
               '--progress-width',
               `${currentWidth + 3}%`,
            );
         }, 100);

         // Xóa interval khi component unmount
         return () => {
            clearInterval(interval);
         };
      }
   }, []);

   return (
      <div className={cx('loading')}>
         <div className={cx('logo')}>
            <div>
               <span className={cx('style-logo')}>MrGian</span>
               store
            </div>
         </div>
         <div
            ref={loadingRef}
            className={cx('progress-bar')}
            data-label="Loading..."
         ></div>
      </div>
   );
}

export default Loading;
