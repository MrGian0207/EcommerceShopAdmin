export type ProductType = {
   name?: string;
   title?: string;
   slug?: string;
   description?: string;
   category?: string;
   subCategory?: string;
   brand?: string;
   gender?: string;
   status?: string;
   productCode?: string;
   tag?: string;
   featureProduct?: string;
   defaultVariant?: string;
   variants?: VariantType[];
};

export type VariantType = {
   _id?: string;
   variantName?: string;
   variantSize?: string;
   variantColor?: string;
   variantProductSKU?: string;
   variantQuantity?: string;
   variantRegularPrice?: string;
   variantSalePrice?: string;
   variantImagesFile?: File[] | string[];
   product?: ProductType;
};

export type VariantFormType = {
   nameForm: string;
   setVariantName: React.Dispatch<React.SetStateAction<string>>;
   setSize: React.Dispatch<React.SetStateAction<string>>;
   setColor: React.Dispatch<React.SetStateAction<string>>;
   setProductSKU: React.Dispatch<React.SetStateAction<string>>;
   setQuantity: React.Dispatch<React.SetStateAction<string>>;
   setRegularPrice: React.Dispatch<React.SetStateAction<string>>;
   setSalePrice: React.Dispatch<React.SetStateAction<string>>;
   setImageFileArray: React.Dispatch<React.SetStateAction<File[]>>;
   setImagePreviewArray: React.Dispatch<React.SetStateAction<string[]>>;
   imagePreviewArray: string[];
   fileInputRef: React.MutableRefObject<HTMLInputElement | null>;
   savedImageVariant?: string[];
   setSavedImageVariant?: React.Dispatch<React.SetStateAction<string[]>>;
   variantArray?: VariantType[];
   indexVariantEdit?: number;
   handleCancelModal: (
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
   ) => void;

   handleSaveModal: (
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
   ) => void;
};

export type VariantItemsType = {
   variantId?: string;
   variantName?: string;
   variantColor?: string;
   variantSize?: string;
   variantSalePrice?: string;
   defaultVariant?: string;
   variantArray?: VariantType[];
   handleRadioChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
   setIdVariantArray?: React.Dispatch<React.SetStateAction<string[]>>;
   setIdVariantDeletedArray?: React.Dispatch<React.SetStateAction<string[]>>;
   setVariantArray?: React.Dispatch<React.SetStateAction<VariantType[]>>;
   setToggleModalVariantEdit?: React.Dispatch<React.SetStateAction<boolean>>;
   setImagePreviewEditArray?: React.Dispatch<React.SetStateAction<string[]>>;
   setIndexVariantEdit?: React.Dispatch<React.SetStateAction<number>>;
   setVariantName?: React.Dispatch<React.SetStateAction<string>>;
   setSize?: React.Dispatch<React.SetStateAction<string>>;
   setColor?: React.Dispatch<React.SetStateAction<string>>;
   setProductSKU?: React.Dispatch<React.SetStateAction<string>>;
   setQuantity?: React.Dispatch<React.SetStateAction<string>>;
   setRegularPrice?: React.Dispatch<React.SetStateAction<string>>;
   setSalePrice?: React.Dispatch<React.SetStateAction<string>>;
   setImageFileArray?: React.Dispatch<React.SetStateAction<File[]>>;
   setSavedImageVariantPreview?: React.Dispatch<React.SetStateAction<string[]>>;
   savedImageVariantArray?: Array<string>[];
};
