export type ButtonProps = {
  selectedOption?: string
  setSelectedOption?: React.Dispatch<React.SetStateAction<string>>
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
