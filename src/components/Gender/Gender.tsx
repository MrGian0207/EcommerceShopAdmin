import styles from './Gender.module.scss';
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
  name: string;
  value?: string | number;
  setValue?: React.Dispatch<React.SetStateAction<string | number>>;
  space?: string;
  index: string | number;
  label?: string;
  iconLeft?: IconDefinition;
  iconRight?: IconDefinition;
  type?: string;
  onclick?: boolean;
  autocomplete?: string;
};

function Input({
  name,
  value,
  setValue,
  space,
  index,
  label,
  iconLeft,
  iconRight,
  type,
  onclick = false,
  autocomplete,
}: InputType): JSX.Element {
  const [genderOptionToggle, setGenderOptionToggle] = useState(iconRight);
  const [haveOption, setHaveOption] = useState(false);
  const [genderOption, setGenderOption] = useState(true);

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
        setGenderOptionToggle(Option.Up);
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
        <FontAwesomeIcon icon={iconLeft as IconDefinition} />
      </span>
      {!onclick ? (
        <input
          name={name}
          autoComplete={autocomplete}
          ref={inputRef}
          id={`input_${index}`}
          type={type}
          value={value}
          onChange={(e) => setValue && setValue(e.target.value)}
        />
      ) : (
        <input
          name={name}
          ref={inputRef}
          id={`input_${index}`}
          type={type}
          value={genderOption ? 'Male' : 'Female'}
          readOnly
          hidden={onclick ? true : false}
        />
      )}
      {onclick && (
        <span className={cx('gender')}>{genderOption ? 'Male' : 'Female'}</span>
      )}
      {!!iconRight && (
        <span className={cx('iconRight')}>
          <FontAwesomeIcon icon={genderOptionToggle as typeof iconRight} />
        </span>
      )}

      {onclick && haveOption && (
        <div className={cx('Popper')} onClick={(e) => e.stopPropagation()}>
          <ul>
            <li
              onClick={() => {
                setValue && setValue('Male');
                setGenderOption(true);
                setHaveOption(false);
                setGenderOptionToggle(Option.Up);
              }}
            >
              Male
            </li>
            <li
              onClick={() => {
                setValue && setValue('Female');
                setGenderOption(false);
                setHaveOption(false);
                setGenderOptionToggle(Option.Up);
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
