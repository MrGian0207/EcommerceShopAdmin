export type ButtonProps = {
  selectedOption?: SelectedOptionType
  setSelectedOption?: React.Dispatch<React.SetStateAction<SelectedOptionType>>
  type?: string
  to?: string | null | undefined
  href?: string
  select?: boolean
  className?: string
  primary?: boolean
  outline?: boolean
  text?: boolean
  disabled?: boolean
  small?: boolean
  large?: boolean
  rounded?: boolean
  children?: React.ReactNode
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>
}
export type SelectedOptionType = 'Pending' | 'Ontheway' | 'Delivered' | 'Returned' | 'Cancelled'

export interface StatusDeliveryOption {
  key: SelectedOptionType
  value: string
}
