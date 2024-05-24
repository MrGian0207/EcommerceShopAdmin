import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import styles from './RowTableSkeleton.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function RowTableSkeleton({ numberOfcolumn }: { numberOfcolumn: number }) {
   return (
      <SkeletonTheme baseColor="#ccc" highlightColor="#ddd">
         {Array(3)
            .fill(0)
            .map((_, index) => {
               return (
                  <tr key={index} className={cx('row-table-skeleton')}>
                     <td>
                        <Skeleton height={50} width={50} />
                     </td>
                     {new Array(numberOfcolumn - 1).fill(0).map((_, index) => (
                        <td className={cx('col')} key={index}>
                           <Skeleton />
                        </td>
                     ))}
                  </tr>
               );
            })}
      </SkeletonTheme>
   );
}

export default RowTableSkeleton;
