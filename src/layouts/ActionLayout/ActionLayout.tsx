import React, { memo, useRef, useState } from 'react'

import classNames from 'classnames/bind'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { useLocation } from 'react-router-dom'

import Spinner from '~/components/Spinner'

import styles from './ActionLayout.module.scss'

import { useAuth } from '~/context/AuthContext'
import { useProduct } from '~/context/ProductContext'
import * as Toastify from '~/services/Toastify'
import { IFormValues } from '~/types/FormValuesType'
import { ActionLayoutType } from '~/types/LayoutType'

const cx = classNames.bind(styles)

function ActionLayout({
  leftColumn,
  rightColumn,
  nameButtonSubmit = '',
  tags,
  hasVariant = false,
}: ActionLayoutType) {
  const location = useLocation()
  const path = location.pathname // Lấy đường dẫn từ URL
  const { accessToken } = useAuth()
  const { variants } = useProduct()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const submit_ButtonRef = useRef<HTMLButtonElement>(null)
  const isLoadingButtonStyle = isLoading ? { opacity: '0.5' } : { opacity: '1' }

  const methods = useForm<IFormValues>()

  //Submit Form not varriants
  const handleFormSubmit: SubmitHandler<IFormValues> = async (data) => {
    setIsLoading(true)

    if (submit_ButtonRef.current) {
      submit_ButtonRef.current.disabled = true
      submit_ButtonRef.current.classList.add(cx('disable_button'))
    }

    Toastify.showToastMessagePending()
    const formData = new FormData()
    formData.append('name', data.name)
    formData.append('title', data.title)
    formData.append('slug', data.slug)
    formData.append('description', data.description)
    formData.append('heading', data.heading)
    formData.append('primaryButtonText', data.primaryButtonText)
    formData.append('primaryButtonLink', data.primaryButtonLink)
    formData.append('secondaryButtonText', data.secondaryButtonText)
    formData.append('secondaryButtonLink', data.secondaryButtonLink)
    formData.append('displaySlide', String(data.displaySlide))
    formData.append('category', data.category)

    if (data.image && data.image.length > 0) {
      formData.append('image', data.image[0])
    }

    try {
      setIsLoading(true)
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}${path}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      })

      const resData = await res.json()

      if (res.ok) {
        Toastify.showToastMessageSuccessfully(resData.message)
      } else {
        Toastify.showToastMessageFailure(resData.message)
      }
    } catch (err) {
      Toastify.showToastMessageFailure('Submit Failure !! Try it again')
    } finally {
      if (submit_ButtonRef.current) {
        submit_ButtonRef.current.disabled = false
        submit_ButtonRef.current.classList.remove(cx('disable_button'))
      }
      setIsLoading(false)
    }
  }

  //Submit Form with varriants
  const handleFormSubmitWithVariant: SubmitHandler<IFormValues> = (data) => {
    setIsLoading(true)
    if (submit_ButtonRef.current) {
      submit_ButtonRef.current.disabled = true
      submit_ButtonRef.current.classList.add(cx('disable_button'))
    }
    Toastify.showToastMessagePending()
    const payload = {
      name: data.name,
      title: data.title,
      slug: data.slug,
      description: data.description,
      category: data.category,
      subCategory: data.subCategory,
      brand: data.brand,
      gender: data.gender,
      status: data.status,
      productCode: data.productCode,
      tags: tags,
      featureProduct: data.featureProduct,
      defaultVariant: data.defaultVariant,
      variants: variants.map((variant) => ({
        variantID: variant.variantID,
        variantName: variant.variantName,
        variantSize: variant.variantSize,
        variantColor: variant.variantColor,
        variantProductSKU: variant.variantProductSKU,
        variantQuantity: variant.variantQuantity,
        variantRegularPrice: variant.variantRegularPrice,
        variantSalePrice: variant.variantSalePrice,
        variantImages: (variant.variantImages as string[]).map((image: string) => {
          if (typeof image === 'string') {
            return image
          } else {
            return 'newImage'
          }
        }),

        numberOfImages: variant.variantImages.length,
      })),
    }

    const formData = new FormData()
    formData.append('payload', JSON.stringify(payload))
    variants.reduce((acc, variant) => {
      variant.variantImages.forEach((file) => acc.append('variantImages', file))
      return acc
    }, formData)

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
    <React.Fragment>
      <FormProvider {...methods}>
        <form
          className={cx('layout')}
          onSubmit={
            hasVariant
              ? methods.handleSubmit(handleFormSubmitWithVariant)
              : methods.handleSubmit(handleFormSubmit)
          }
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
      </FormProvider>
    </React.Fragment>
  )
}

export default memo(ActionLayout)
