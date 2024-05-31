import { VariantType } from '~/types/VariantType';
import { ReactNode } from 'react';

export type ActionLayoutType = {
   leftColumn: ReactNode;
   rightColumn: ReactNode;
   name?: string;
   metaTitle?: string;
   slug?: string;
   description?: string;
   Categories?: string;
   SubCategories?: string;
   Brand?: string;
   Gender?: string;
   Status?: string;
   ProductCode?: string;
   FeatureProduct?: string;
   Tag?: string[];
   ImageFile?: File | null;
   NameImageFile?: string | null;
   DefaultVariant?: string;
   VariantArray?: VariantType[];
   idVariantArray?: string[];
   idVariantDeletedArray?: string[];
   nameButtonSubmit?: string;
   heading?: string;
   primaryButtonText?: string;
   primaryButtonLink?: string;
   secondaryButtonText?: string;
   secondaryButtonLink?: string;
   displaySlide?: string;
   setIsNameTouched?: React.Dispatch<React.SetStateAction<boolean>>;
   setIsMetaTitleTouched?: React.Dispatch<React.SetStateAction<boolean>>;
   setIsSlugTouched?: React.Dispatch<React.SetStateAction<boolean>>;
   setIsDescriptionTouched?: React.Dispatch<React.SetStateAction<boolean>>;
   setIsImageFileTouched?: React.Dispatch<React.SetStateAction<boolean>>;
   setIsHeadingTouched?: React.Dispatch<React.SetStateAction<boolean>>;
   setIsPrimaryButtonTextTouched?: React.Dispatch<
      React.SetStateAction<boolean>
   >;
   setIsPrimaryButtonLinkTouched?: React.Dispatch<
      React.SetStateAction<boolean>
   >;
   setIsProductCodeTouched?: React.Dispatch<React.SetStateAction<boolean>>;
};

export type DefaultLayoutType = {
   active?: string;
   page: string[];
   children?: ReactNode;
   searchEngine?: boolean;
   buttons?: JSX.Element[];
};

export type TableLayoutType = {
    headers?: string[];
    category?: boolean;
    name?: boolean;
    role?: boolean;
    user?: boolean;
    email?: boolean;
    phone?: boolean;
    joined?: boolean;
    parentCategory?: boolean;
    totalItems?: boolean;
    description?: boolean;
    createdAt?: boolean;
    status?: boolean;
    rating?: boolean;
    quantity?: boolean;
    price?: boolean;
    featured?: boolean;
    actions?: boolean;
    editButton?: boolean;
    deleteButton?: boolean;
    previewButton?: boolean;
    lockButton?: boolean;
    copyButton?: boolean;
    handleDeteleToastify?: (
       name: string,
       id: string,
       path: string,
       SetDeleteButtonOnclick?: React.Dispatch<React.SetStateAction<boolean>>,
    ) => void;
 };