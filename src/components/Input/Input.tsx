import styles from './Input.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

type InputType = {
    space?: string;
    index: string | number;
    label: string;
    icon: IconDefinition;
    type: string
};

function Input({ index, label, icon, type , space}: InputType): JSX.Element {
    return (
        <div className={cx('auth-input', {
            space
        })} key={index}>
            <label className={cx('label')} htmlFor={`input_${index}`}>
                {label}
            </label>
            <span className={cx('icon')}>
                <FontAwesomeIcon icon={icon} />
            </span>
            <input type={type}/>
        </div>
    );
}

export default Input;
