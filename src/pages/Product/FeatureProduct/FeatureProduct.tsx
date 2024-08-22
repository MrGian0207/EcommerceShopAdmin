import { forwardRef } from 'react'
import { useAuth } from '~/context/AuthContext'
import { usePath } from '~/context/PathContext'
import * as Toastify from '~/services/Toastify'
import classNames from 'classnames/bind'

import styles from '../ProductAdd/ProductAdd.module.scss'

const cx = classNames.bind(styles)

interface FeatureProductProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string
  label?: string
  updateFeaturedState?: boolean
}

const FeatureProduct = forwardRef<HTMLInputElement, FeatureProductProps>(
  ({ id, label, updateFeaturedState = false, ...props }, ref) => {
    const { path } = usePath()
    const { accessToken } = useAuth()

    const handleUpdateProductFeatureState = async (
      path: string,
      id: string,
      featureState: string,
      accessToken: string
    ) => {
      Toastify.showToastMessagePending()
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}${path}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          id,
          featureState,
        }),
      })

      const resData = await res.json()
      if (res.ok) {
        Toastify.showToastMessageSuccessfully(resData.message)
      } else {
        Toastify.showToastMessageFailure(resData.message)
      }
    }

    return (
      <div className={cx('feature-product')}>
        <div className={cx('toggle-box')}>
          <input ref={ref} id={id} name="featureProduct" type="checkbox" {...props} />
          <label
            onClick={() => {
              const newFeatureState = props.defaultChecked ? 'off' : 'on'
              updateFeaturedState &&
                handleUpdateProductFeatureState(path, id, newFeatureState, accessToken)
            }}
            htmlFor={id}
            className={cx('toggle-switch')}
          ></label>
        </div>
        {label && <label>{label}</label>}
      </div>
    )
  }
)

FeatureProduct.displayName = 'FeatureProduct'

export default FeatureProduct