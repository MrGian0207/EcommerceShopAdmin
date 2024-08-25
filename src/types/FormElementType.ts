import { IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { RegisterOptions } from 'react-hook-form'

import { OptionType } from './DataType'
import { IFormValues } from './FormValuesType'

export interface OptionSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  name: keyof IFormValues
  label?: string
  rules?: RegisterOptions<IFormValues, keyof IFormValues>
  icon?: IconDefinition
  options?: OptionType[]
}

export interface ToggleProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  name: keyof IFormValues
}

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  name: keyof IFormValues
  rules?: RegisterOptions<IFormValues>
  iconLeft?: IconDefinition
  iconRight?: IconDefinition
}

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  name: keyof IFormValues
  rules?: RegisterOptions<IFormValues, keyof IFormValues>
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  name: keyof IFormValues
  label: string
  rules?: RegisterOptions<IFormValues, keyof IFormValues>
  icon?: IconDefinition
  options: string[]
}

export interface VariantInputProp extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  name: keyof IFormValues
  options?: RegisterOptions<IFormValues, keyof IFormValues>
}

export interface FeatureProductProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  id: string
}

export interface DisplaySlideType extends React.InputHTMLAttributes<HTMLInputElement> {
  name: keyof IFormValues
  rules?: RegisterOptions<IFormValues, keyof IFormValues>
}
