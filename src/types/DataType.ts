export interface BranchType {
  name: string
  title: string
  slug: string
  description: string
  image: string
}

export const emptyBranch = {
  name: '',
  title: '',
  slug: '',
  description: '',
  image: '',
}

export interface MainCategoriesType {
  name: string
  title: string
  slug: string
  description: string
  image: string
}

export const emptyMainCategory = {
  name: '',
  title: '',
  slug: '',
  description: '',
  image: '',
}

export interface SubCategoriesType {
  name: string
  title: string
  slug: string
  description: string
  image: string
  parentCategory: string
}

export const emptySubCategories = {
  name: '',
  title: '',
  slug: '',
  description: '',
  image: '',
  parentCategory: '',
}

export interface OptionType {
  value: string
  label: string
}

export interface ProductType {
  _id: string
  name: string
  title: string
  slug: string
  description: string
  category: string
  subCategory: string
  brand: string
  gender: string
  status: string
  productCode: string
  tags: string[]
  featureProduct: string
  defaultVariant: string
  variants: VariantType[]
}

export const emptyProduct: ProductType = {
  _id: '',
  name: '',
  title: '',
  slug: '',
  description: '',
  category: '',
  subCategory: '',
  brand: '',
  gender: '',
  status: '',
  productCode: '',
  tags: [],
  featureProduct: '',
  defaultVariant: '',
  variants: [],
}

export interface VariantType {
  variantID: string
  variantName: string
  variantSize: string
  variantColor: string
  variantProductSKU: string
  variantQuantity: number
  variantRegularPrice: number
  variantSalePrice: number
  variantImages: File[] | string[]
}

export const emptyVariant: VariantType = {
  variantID: '',
  variantName: '',
  variantSize: '',
  variantColor: '',
  variantProductSKU: '',
  variantQuantity: 0,
  variantRegularPrice: 0,
  variantSalePrice: 0,
  variantImages: [],
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
  variantSalePrice?: number
  isDefaultVariant?: boolean
}

export interface SlideType {
  _id?: string
  heading: string
  primaryButtonText: string
  primaryButtonLink: string
  secondaryButtonText: string
  secondaryButtonLink: string
  description: string
  displaySlide: string
  image: string
}

export const emptySlide = {
  heading: '',
  primaryButtonText: '',
  primaryButtonLink: '',
  secondaryButtonText: '',
  secondaryButtonLink: '',
  description: '',
  displaySlide: 'off',
  image: '',
}

export interface OptionType {
  value: string
  label: string
}
