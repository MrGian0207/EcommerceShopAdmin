export type ProductType = {
  name?: string
  title?: string
  slug?: string
  description?: string
  category?: string
  subCategory?: string
  brand?: string
  gender?: string
  status?: string
  productCode?: string
  tag?: string
  featureProduct?: string
  defaultVariant?: string
  variants?: VariantType[]
}

export interface VariantType {
  variantID?: string
  variantName: string
  variantSize: string
  variantColor: string
  variantProductSKU: string
  variantQuantity: string
  variantRegularPrice: string
  variantSalePrice: string
  variantImages: File[] | string[]
}

export type VariantFormType = {
  nameForm: string
  isEdit: boolean
}

export type VariantItemsType = {
  variantID?: string
  variantName?: string
  variantColor?: string
  variantSize?: string
  variantSalePrice?: string
  isDefaultVariant?: boolean
}
