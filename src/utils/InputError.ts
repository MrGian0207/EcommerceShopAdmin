export type propsType = {
   name?: string;
   metaTitle?: string;
   slug?: string;
   description?: string;
   Categories?: string;
   imageFile?: File | null;
   heading?: string;
   primaryButtonText?: string;
   primaryButtonLink?: string;
};

type Errors = {
   name?: string;
   metaTitle?: string;
   slug?: string;
   description?: string;
   Categories?: string;
   imageFile?: string;
   heading?: string;
   primaryButtonText?: string;
   primaryButtonLink?: string;
};

const checkError = (props: propsType): Errors => {
   const newErrors: Errors = {};
   if (props.name?.length === 0) {
      newErrors.name = 'Please fill in the input box';
   }

   if (props.metaTitle?.length === 0) {
      newErrors.metaTitle = 'Please fill in the input box';
   }

   if (props.slug?.length === 0) {
      newErrors.slug = 'Please fill in the input box';
   }

   if (props.description?.length === 0) {
      newErrors.description = 'Please fill in the input box';
   }

   if (props.Categories?.length === 0) {
      newErrors.Categories = 'Please fill in the input box';
   }

   if (props.imageFile === undefined || props.imageFile === null) {
      newErrors.imageFile = 'Please add at least one image file';
   }

   if (props.heading?.length === 0) {
      newErrors.heading = 'Please fill in the input box';
   }

   if (props.primaryButtonText?.length === 0) {
      newErrors.primaryButtonText = 'Please fill in the input box';
   }

   if (props.primaryButtonLink?.length === 0) {
      newErrors.primaryButtonLink = 'Please fill in the input box';
   }

   return newErrors;
};

export default checkError;
