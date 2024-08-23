import React, { createContext, useContext, useState } from 'react'

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
  variants: {
    variantID: string
    variantName: string
    variantSize: string
    variantColor: string
    variantProductSKU: string
    variantQuantity: number
    variantRegularPrice: number
    variantSalePrice: number
    variantImages: string[]
  }[]
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

const emptyProduct: ProductType = {
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

const emptyVariant: VariantType = {
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

interface ProductContextType {
  product: ProductType
  setProduct: React.Dispatch<React.SetStateAction<ProductType>>
  variantIsEdit: VariantType
  setVariantIsEdit: React.Dispatch<React.SetStateAction<VariantType>>
  variants: VariantType[]
  setVariants: React.Dispatch<React.SetStateAction<VariantType[]>>
  variantImage: File[] | string[]
  setVariantImage: React.Dispatch<React.SetStateAction<File[]>>
}

const ProductContext = createContext<ProductContextType>({
  product: emptyProduct,
  setProduct: () => {},
  variantIsEdit: emptyVariant,
  setVariantIsEdit: () => {},
  variants: [],
  setVariants: () => {},
  variantImage: [],
  setVariantImage: () => {},
})

export const useProduct = () => {
  return useContext(ProductContext)
}

export const ProductContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [product, setProduct] = useState<ProductType>(emptyProduct)
  const [variantIsEdit, setVariantIsEdit] = useState<VariantType>(emptyVariant)
  const [variants, setVariants] = useState<VariantType[]>([])
  const [variantImage, setVariantImage] = useState<File[]>([])
  return (
    <ProductContext.Provider
      value={{
        product,
        setProduct,
        variantIsEdit,
        setVariantIsEdit,
        variants,
        setVariants,
        variantImage,
        setVariantImage,
      }}
    >
      {children}
    </ProductContext.Provider>
  )
}
