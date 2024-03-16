import styles from './Input.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    IconDefinition,
    faAngleDown,
    faAngleUp,
} from '@fortawesome/free-solid-svg-icons';
import { useState, useRef, useEffect, memo } from 'react';
const cx = classNames.bind(styles);

const Option = {
    Up: faAngleDown,
    Down: faAngleUp,
};

type InputType = {
    space?: string;
    index: string | number;
    label: string;
    iconLeft: IconDefinition;
    iconRight?: IconDefinition;
    type?: string;
    onclick?: boolean;
    disabled?: boolean;
};

function Input({
    space,
    index,
    label,
    iconLeft,
    iconRight,
    type,
    onclick,
    disabled,
}: InputType): JSX.Element {
    const [genderOptionToggle, setGenderOptionToggle] = useState(iconRight);
    const [haveOption, setHaveOption] = useState(false);
    const [genderOption, setGendeOption] = useState(true);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleBlur = () => {
        inputRef.current?.blur();
        setHaveOption(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const popper = document.querySelector(`.${styles.Popper}`);

            if (popper && !popper.contains(event.target as Node)) {
                setHaveOption(false);
                setGenderOptionToggle(Option.Down);
                inputRef.current?.blur();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div
            className={cx('auth-input', {
                space,
                active: haveOption,
            })}
            key={index}
            onBlur={handleBlur}
            onClick={(e) => {
                e.stopPropagation();
                setHaveOption((prev) => !prev);
                onclick &&
                    setGenderOptionToggle((prevOption) =>
                        prevOption === Option.Down ? Option.Up : Option.Down,
                    );
            }}
        >
            <label className={cx('label')} htmlFor={`input_${index}`}>
                {label}
            </label>
            <span className={cx('iconLeft')}>
                <FontAwesomeIcon icon={iconLeft} />
            </span>
            {!onclick && (
                <input
                    ref={inputRef}
                    id={`input_${index}`}
                    type={type}
                    disabled={disabled}
                />
            )}
            {onclick && (
                <span className={cx('gender')}>
                    {genderOption ? 'Male' : 'Female'}
                </span>
            )}
            {!!iconRight && (
                <span className={cx('iconRight')}>
                    <FontAwesomeIcon
                        icon={genderOptionToggle as typeof iconRight}
                    />
                </span>
            )}

            {onclick && haveOption && (
                <div
                    className={cx('Popper')}
                    onClick={(e) => e.stopPropagation()}
                >
                    <ul>
                        <li
                            onClick={() => {
                                setGendeOption(true);
                                setHaveOption(false);
                                setGenderOptionToggle(Option.Down);
                            }}
                        >
                            Male
                        </li>
                        <li
                            onClick={() => {
                                setGendeOption(false);
                                setHaveOption(false);
                                setGenderOptionToggle(Option.Down);
                            }}
                        >
                            Female
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
}

export default memo(Input);
