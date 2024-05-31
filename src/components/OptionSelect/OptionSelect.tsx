import styles from './OptionSelect.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { forwardRef, ForwardRefRenderFunction } from 'react';
import { OptionSelectProps } from '~/types/InputType';

const cx = classNames.bind(styles);

// Thêm kiểu dữ liệu cho ref
const OptionSelect: ForwardRefRenderFunction<
   HTMLSelectElement,
   OptionSelectProps
> = ({ dataOptions, setDataOptions, labelName }, ref) => {
   return (
      <div className={cx('selected-box')}>
         <label>{labelName}</label>
         <div className={cx('options-box')}>
            <select
               ref={ref}
               className={cx('custom-select')}
               value={dataOptions && dataOptions}
               onChange={(e) => {
                  setDataOptions && setDataOptions(e.target.value);
               }}
            ></select>
            <div className={cx('custom-select-arrow')}>
               <FontAwesomeIcon className={cx('icon')} icon={faChevronDown} />
            </div>
         </div>
      </div>
   );
};

export default forwardRef(OptionSelect);
