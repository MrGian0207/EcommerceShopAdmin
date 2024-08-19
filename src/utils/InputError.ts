import { Errors, propsType } from '~/types/ErrorType'

const checkError = (props: propsType): Errors => {
  const newErrors: Errors = {}
  if (props.name?.length === 0) {
    newErrors.name = 'Please fill in the input box'
  }

  if (props.metaTitle?.length === 0) {
    newErrors.metaTitle = 'Please fill in the input box'
  }

  if (props.slug?.length === 0) {
    newErrors.slug = 'Please fill in the input box'
  }

  if (props.description?.length === 0) {
    newErrors.description = 'Please fill in the input box'
  }

  if (props.Categories?.length === 0) {
    newErrors.Categories = 'Please fill in the input box'
  }

  if (props.imageFile === undefined || props.imageFile === null) {
    newErrors.imageFile = 'Please add at least one image file'
  }

  if (props.heading?.length === 0) {
    newErrors.heading = 'Please fill in the input box'
  }

  if (props.primaryButtonText?.length === 0) {
    newErrors.primaryButtonText = 'Please fill in the input box'
  }

  if (props.primaryButtonLink?.length === 0) {
    newErrors.primaryButtonLink = 'Please fill in the input box'
  }

  if (props.productCode?.length === 0) {
    newErrors.productCode = 'Please fill in the input box'
  }

  if (props.variantName?.length === 0) {
    newErrors.variantName = 'Please fill in the input box'
  }

  if (props.variantSize?.length === 0) {
    newErrors.variantSize = 'Please fill in the input box'
  }

  if (props.variantColor?.length === 0) {
    newErrors.variantColor = 'Please fill in the input box'
  }

  if (props.variantProductSKU?.length === 0) {
    newErrors.variantProductSKU = 'Please fill in the input box'
  }

  if (props.variantQuantity?.length === 0) {
    newErrors.variantQuantity = 'Please fill in the input box'
  }

  if (props.variantRegularPrice?.length === 0) {
    newErrors.variantRegularPrice = 'Please fill in the input box'
  }

  if (props.variantSalePrice?.length === 0) {
    newErrors.variantSalePrice = 'Please fill in the input box'
  }

  if (props.nameUser?.length === 0) {
    newErrors.nameUser = 'Please fill in the input box'
  }

  if (props.emailAddressUser?.length === 0) {
    newErrors.emailAddressUser = 'Please fill in the input box'
  }

  if (props.phoneUser?.length === 0) {
    newErrors.phoneUser = 'Please fill in the input box'
  }

  if (props.oldPassword?.length === 0) {
    newErrors.oldPassword = 'Please fill in the input box'
  }

  if (props.newPassword?.length === 0) {
    newErrors.newPassword = 'Please fill in the input box'
  }

  if (props.confirmPassword?.length === 0) {
    newErrors.confirmPassword = 'Please fill in the input box'
  }

  if (props.password?.length === 0) {
    newErrors.password = 'Please fill in the input box'
  }

  return newErrors
}

export default checkError
