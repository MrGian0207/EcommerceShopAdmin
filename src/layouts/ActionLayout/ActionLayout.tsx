import classNames from 'classnames/bind'

import styles from './ActionLayout.module.scss'

import 'react-toastify/dist/ReactToastify.css'

import { FormEvent, memo, useRef, useState } from 'react'
import Spinner from '~/components/Spinner'
import { useAuth } from '~/context/AuthContext'
import { useProduct } from '~/context/ProductContext'
import * as Toastify from '~/services/Toastify'
import { ActionLayoutType } from '~/types/LayoutType'
import { useLocation } from 'react-router-dom'

const cx = classNames.bind(styles)

function ActionLayout({
  leftColumn,
  rightColumn,
  nameButtonSubmit = '',
  tags,
  hasVariant = false,
}: ActionLayoutType) {
  const location = useLocation()
  let path = location.pathname // Lấy đường dẫn từ URL
  const { accessToken } = useAuth()
  const { variants } = useProduct()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const submit_ButtonRef = useRef<HTMLButtonElement>(null)
  const isLoadingButtonStyle = isLoading ? { opacity: '0.5' } : { opacity: '1' }

  //Submit Form not varriants
  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    if (submit_ButtonRef.current) {
      submit_ButtonRef.current.disabled = true
      submit_ButtonRef.current.classList.add(cx('disable_button'))
    }

    Toastify.showToastMessagePending()
    const formData = new FormData(e.currentTarget)

    try {
      fetch(`${process.env.REACT_APP_BACKEND_URL}${path}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      })
        .then((res) => {
          setIsLoading(false)
          return res.json()
        })
        .then((data) => {
          if (data) {
            if (submit_ButtonRef.current) {
              submit_ButtonRef.current.disabled = false
              submit_ButtonRef.current.classList.remove(cx('disable_button'))
            }
            if (data.status === 'Success') {
              Toastify.showToastMessageSuccessfully(data?.message)
            } else {
              Toastify.showToastMessageFailure(data?.message)
            }
          }
        })
        .catch((err) => {
          setIsLoading(false)
          console.log(err)
          if (submit_ButtonRef.current) {
            submit_ButtonRef.current.disabled = false
            submit_ButtonRef.current.classList.remove(cx('disable_button'))
          }
          Toastify.showToastMessageFailure('Submit Failure !! Try it again')
        })
    } catch (error) {
      console.log(error)
      Toastify.showToastMessageFailure('Data Loaded Failure !! Try it again')
    }
  }

  //Submit Form with varriants
  const handleFormSubmitWithVariant = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    if (submit_ButtonRef.current) {
      submit_ButtonRef.current.disabled = true
      submit_ButtonRef.current.classList.add(cx('disable_button'))
    }
    Toastify.showToastMessagePending()
    const form = new FormData(e.currentTarget)
    const payload = {
      name: form.get('name'),
      title: form.get('title'),
      slug: form.get('slug'),
      description: form.get('description'),
      category: form.get('category'),
      subCategory: form.get('subCategory'),
      brand: form.get('brand'),
      gender: form.get('gender'),
      status: form.get('status'),
      productCode: form.get('productCode'),
      tags: tags,
      featureProduct: form.get('featureProduct'),
      defaultVariant: form.get('defaultVariant'),
      variants: variants.map((variant) => ({
        variantID: variant.variantID,
        variantName: variant.variantName,
        variantSize: variant.variantSize,
        variantColor: variant.variantColor,
        variantProductSKU: variant.variantProductSKU,
        variantQuantity: variant.variantQuantity,
        variantRegularPrice: variant.variantRegularPrice,
        variantSalePrice: variant.variantSalePrice,
        numberOfImages: variant.variantImages.length,
      })),
    }

    const formData = new FormData()
    formData.append('payload', JSON.stringify(payload))
    variants.forEach((variant, index) => {
      variant.variantImages.forEach((file, fileIndex) => {
        formData.append('variantImages', file)
      })
    })

    try {
      fetch(`${process.env.REACT_APP_BACKEND_URL}${path}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      })
        .then((res) => {
          return res.json()
        })
        .then((data) => {
          setIsLoading(false)
          if (data) {
            if (submit_ButtonRef.current) {
              submit_ButtonRef.current.disabled = false
              submit_ButtonRef.current.classList.remove(cx('disable_button'))
            }
            if (data.status === 'Success') {
              Toastify.showToastMessageSuccessfully(data?.message)
            } else {
              Toastify.showToastMessageFailure(data?.message)
            }
          }
        })
        .catch((err) => {
          setIsLoading(false)
          console.log(err)
          if (submit_ButtonRef.current) {
            submit_ButtonRef.current.disabled = false
            submit_ButtonRef.current.classList.remove(cx('disable_button'))
          }
          Toastify.showToastMessageFailure('Submit Failure !! Try it again')
        })
    } catch (error) {
      setIsLoading(false)
      console.log(error)
      Toastify.showToastMessageFailure('Data Loaded Failure !! Try it again')
    }
  }

  return (
    <>
      <form
        className={cx('add-layout')}
        onSubmit={hasVariant ? handleFormSubmitWithVariant : handleFormSubmit}
      >
        <div className={cx('left-column')}>{leftColumn}</div>
        <div className={cx('right-column')}>
          {rightColumn}
          <button
            ref={submit_ButtonRef}
            type="submit"
            className={cx('button')}
            disabled={isLoading}
            style={isLoadingButtonStyle}
          >
            {isLoading ? <Spinner /> : nameButtonSubmit ? nameButtonSubmit : 'Submit'}
          </button>
        </div>
      </form>
    </>
  )
}

export default memo(ActionLayout)
