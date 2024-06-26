import styles from './Input.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
   IconDefinition,
   faAngleDown,
   faAngleUp,
} from '@fortawesome/free-solid-svg-icons';
import { useState, useRef, useEffect, memo } from 'react';
import { propsType } from '~/types/ErrorType';
import checkError from '~/utils/InputError';
import ErrorInput from '~/components/ErrorInput';
import React from 'react';
import { InputType } from '~/types/InputType';

const cx = classNames.bind(styles);

const Option = {
   Up: faAngleDown,
   Down: faAngleUp,
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

   const [Errors, setErrors] = useState<propsType>({
      emailAddressUser: '',
      password: '',
      nameUser: '',
      phoneUser: '',
   });

   const [isTouched, setIsTouched] = useState<boolean>(false);

   const handleInputChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      setState: React.Dispatch<React.SetStateAction<string | number>>,
      fieldName: keyof propsType,
      setTouched: React.Dispatch<React.SetStateAction<boolean>>,
   ) => {
      setErrors((prevErrors) => ({
         ...prevErrors,
         [fieldName]: e.target.value,
      }));
      setState(e.target.value);
      setTouched(true);
   };

   const inputRef = useRef<HTMLInputElement>(null);

   const handleBlur = () => {
      inputRef.current?.blur();
      setHaveOption(false);
   };

   const handleShowPassword = () => {
      if (inputRef.current) {
         inputRef.current?.setAttribute(
            'type',
            inputRef.current?.type === 'password' ? 'text' : 'password',
         );
      }
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
      <div>
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
                  className={cx('input')}
                  name={name}
                  autoComplete={autocomplete}
                  ref={inputRef}
                  id={`input_${index}`}
                  type={type}
                  value={value}
                  onChange={(e) => {
                     handleInputChange(
                        e,
                        setValue as React.Dispatch<
                           React.SetStateAction<string | number>
                        >,
                        name as keyof propsType,
                        setIsTouched,
                     );
                  }}
                  spellCheck="false"
               />
            ) : (
               <input
                  className={cx('input')}
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
               <span className={cx('gender', 'input')}>
                  {genderOption ? 'Male' : 'Female'}
               </span>
            )}
            {!!iconRight && (
               <span onClick={handleShowPassword} className={cx('iconRight')}>
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
         {isTouched && checkError(Errors)[name as keyof propsType] && (
            <ErrorInput
               nameError={checkError(Errors)[name as keyof propsType] as string}
            />
         )}
      </div>
   );
}

export default memo(Input);
