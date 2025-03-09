import { ErrorMessage } from '@hookform/error-message'
import classNames from 'classnames/bind'
import { useFormContext } from 'react-hook-form'

import styles from '../Slides.module.scss'

import { DisplaySlideType } from '~/types/FormElementType'
import { IFormValues } from '~/types/FormValuesType'

const cx = classNames.bind(styles)

export default function DisplaySlide({ name = 'displaySlide', rules, ...props }: DisplaySlideType) {
  const { register, formState } = useFormContext<IFormValues>()

  return (
    <div className={cx('disabled')}>
      <div className={cx('toggle-box')}>
        <input {...register(name, rules)} {...props} type="checkbox" id="toggle" />
        <label htmlFor="toggle" className={cx('toggle-switch')}></label>
        <p className={cx('errorMessage')}>
          <ErrorMessage errors={formState.errors} name={name} />
        </p>
      </div>
    </div>
  )
}
