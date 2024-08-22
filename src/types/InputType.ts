import { IconDefinition } from '@fortawesome/free-solid-svg-icons'

export type InputType = {
  name: string
  value?: string | number
  setValue?: React.Dispatch<React.SetStateAction<string | number>>
  space?: string
  index: string | number
  label?: string
  iconLeft?: IconDefinition
  iconRight?: IconDefinition
  type?: string
  onclick?: boolean
  autocomplete?: string
}

interface OptionType {
  value: string
  label: string
}

export interface OptionSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  name?: string
  labelName?: string
  options?: OptionType[]
}
