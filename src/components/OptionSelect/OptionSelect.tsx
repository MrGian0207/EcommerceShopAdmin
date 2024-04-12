import styles from './OptionSelect.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

type OptionSelectType = {
    dataOptions?: string;
    setDataOptions?: React.Dispatch<React.SetStateAction<string>>;
    dataOptionsArray?: [];
    labelName?: string;
};

function OptionSelect({
    dataOptions,
    setDataOptions,
    dataOptionsArray,
    labelName = 'Option',
}: OptionSelectType): JSX.Element {
    return (
        <div className={cx('selected-box')}>
            <label>{labelName}</label>
            <div className={cx('options-box')}>
                <select
                    className={cx('custom-select')}
                    value={dataOptions}
                    onChange={(e) => {
                        setDataOptions && setDataOptions(e.target.value);
                    }}
                >
                    <option disabled></option>

                    {dataOptionsArray &&
                        dataOptionsArray.map((value) => {
                            return <option key={value}>{value}</option>;
                        })}
                </select>
                <div className={cx('custom-select-arrow')}>
                    <FontAwesomeIcon
                        className={cx('icon')}
                        icon={faChevronDown}
                    />
                </div>
            </div>
        </div>
    );
}

export default OptionSelect;
