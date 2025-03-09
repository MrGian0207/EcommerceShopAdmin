import React, { memo, useState } from 'react'

import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import styles from './Button.module.scss'

import { useAuth } from '~/context/AuthContext'
import { usePath } from '~/context/PathContext'
import * as Toastify from '~/services/Toastify'
import { ButtonProps, SelectedOptionType, StatusDeliveryOption } from '~/types/ButtonType'

const cx = classNames.bind(styles)

const Button: React.FC<ButtonProps> = ({
  selectedOption = 'Pending',
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
  const { t } = useTranslation('common')
  const { path } = usePath()
  const { accessToken } = useAuth()

  let Comp: React.ElementType = 'button'

  const props:
    | React.ButtonHTMLAttributes<HTMLButtonElement>
    | React.AnchorHTMLAttributes<HTMLAnchorElement> = {
    onClick,
    ...moreProps,
  }

  // Remove Event Listeners When button is disabled
  if (disabled) {
    Object.keys(props).forEach((key) => {
      if (key.startsWith('on') && typeof (props as any)[key] === 'function') {
        delete (props as any)[key]
      }
    })
  }

  if (to) {
    ;(props as any).to = to
    Comp = Link
  } else if (href) {
    ;(props as any).href = href
    Comp = 'a'
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
  })

  // Xử lí đối với thẻ select
  const [isOpen, setIsOpen] = useState(false)

  const options: StatusDeliveryOption[] = [
    { key: 'Pending', value: 'statusDelivery.pending' },
    { key: 'Ontheway', value: 'statusDelivery.on_the_way' },
    { key: 'Delivered', value: 'statusDelivery.delivered' },
    { key: 'Returned', value: 'statusDelivery.returned' },
    { key: 'Cancelled', value: 'statusDelivery.cancelled' },
  ]

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  const handleSelectOption = async (option: SelectedOptionType) => {
    Toastify.showToastMessagePending()
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
        if (res?.status === 'Success') Toastify.showToastMessageSuccessfully(res?.message)
      })
      .catch((err) => console.log(err))
    setSelectedOption?.(option)
    setIsOpen(false)
  }

  const selectedOptionData = options.find((option) => option.key === selectedOption)

  return select ? (
    <div className={cx('selected-box')}>
      <div className={cx('options-box')}>
        <div className={cx('custom-select')} onClick={handleToggle}>
          {selectedOptionData ? t(selectedOptionData.value) : t('label.select_option')}
          <FontAwesomeIcon className={cx('icon')} icon={faChevronDown} />
        </div>
        {isOpen && (
          <div className={cx('options')}>
            {options.map((option) => (
              <div
                key={option.key}
                onClick={() => handleSelectOption(option.key)}
                className={cx('option')}
              >
                {t(option.value)}
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
  )
}

export default memo(Button)
