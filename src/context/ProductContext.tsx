import React, { createContext, useContext, useState } from 'react'

import { emptyProduct, emptyVariant, ProductType, VariantType } from '~/types/DataType'

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
