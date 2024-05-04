import classNames from 'classnames/bind';
import { Link, useLocation } from 'react-router-dom';
import styles from './Button.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useState, memo } from 'react';
import * as Toastify from '~/services/Toastify';
import { useAuth } from '~/context/AuthContext';

const cx = classNames.bind(styles);

type ButtonProps = {
   selectedOption?: string;
   setSelectedOption?: React.Dispatch<React.SetStateAction<string>>;
   type?: string;
   to?: string | null | undefined;
   href?: string;
   select?: boolean;
   className?: string;
   primary?: boolean;
   outline?: boolean;
   text?: boolean;
   disabled?: boolean;
   small?: boolean;
   large?: boolean;
   rounded?: boolean;
   children?: React.ReactNode;
   leftIcon?: React.ReactNode;
   rightIcon?: React.ReactNode;
   onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
};

const Button: React.FC<ButtonProps> = ({
   selectedOption,
   setSelectedOption,
   type,
   to,
   href,
   select,
   primary = false,
   outline = false,
   text = false,
   disabled = false,
   small = false,
   large = false,
   rounded = false,
   leftIcon,
   children,
   rightIcon,
   className,
   onClick,
   ...moreProps
}) => {
   const location = useLocation();
   const path = location.pathname;
   const { accessToken } = useAuth()!;

   let Comp: React.ElementType = 'button';

   const props:
      | React.ButtonHTMLAttributes<HTMLButtonElement>
      | React.AnchorHTMLAttributes<HTMLAnchorElement> = {
      onClick,
      ...moreProps,
   };

   // Remove Event Listeners When button is disabled
   if (disabled) {
      Object.keys(props).forEach((key) => {
         if (
            key.startsWith('on') &&
            typeof (props as any)[key] === 'function'
         ) {
            delete (props as any)[key];
         }
      });
   }

   if (to) {
      (props as any).to = to;
      Comp = Link;
   } else if (href) {
      (props as any).href = href;
      Comp = 'a';
   }
   const classes = cx('wrapper', {
      [className!]: className,
      primary,
      outline,
      small,
      large,
      rounded,
      text,
      disabled,
   });

   // Xử lí đối với thẻ select
   const [isOpen, setIsOpen] = useState(false);

   const options = [
      'Pending',
      'Ontheway',
      'Delivered',
      'Returned',
      'Cancelled',
   ];

   const handleToggle = () => {
      setIsOpen(!isOpen);
   };

   const handleSelectOption = async (option: string) => {
      Toastify.showToastMessagePending();
      await fetch(`${process.env.REACT_APP_BACKEND_URL}${path}/edit-status`, {
         method: 'PUT',
         headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
         },
         body: JSON.stringify({ statusOrder: option }),
      })
         .then((res) => res.json())
         .then((res) => {
            if (res?.status === 'Success')
               Toastify.showToastMessageSuccessfully(res?.message);
         })
         .catch((err) => console.log(err));
      setSelectedOption?.(option);
      setIsOpen(false);
   };

   return select ? (
      <div className={cx('selected-box')}>
         <div className={cx('options-box')}>
            <div className={cx('custom-select')} onClick={handleToggle}>
               {selectedOption}
               <FontAwesomeIcon className={cx('icon')} icon={faChevronDown} />
            </div>
            {isOpen && (
               <div className={cx('options')}>
                  {options.map((option) => (
                     <div
                        key={option}
                        onClick={() => handleSelectOption(option)}
                        className={cx('option')}
                     >
                        {option}
                     </div>
                  ))}
               </div>
            )}
         </div>
      </div>
   ) : (
      <Comp type={type} className={classes} {...props}>
         {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
         {children}
         {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
      </Comp>
   );
};

export default memo(Button);
