export const MainCategoriesRules = {
  name: {
    required: 'Main Categories is required',
    maxLength: { value: 50, message: 'Main Categories name should not exceed 50 characters' },
    pattern: {
      value: /^[a-zA-Z0-9\s]*$/,
      message: 'Main Categories name should only contain alphanumeric characters and spaces',
    },
  },
  title: {
    required: 'Title is required',
    maxLength: { value: 100, message: 'Title should not exceed 100 characters' },
    pattern: {
      value: /^[a-zA-Z0-9\s]*$/,
      message: 'Title should only contain alphanumeric characters and spaces',
    },
  },
  slug: {
    required: 'Slug is required',
    maxLength: { value: 100, message: 'Slug should not exceed 100 characters' },
    pattern: {
      value: /^[a-z0-9-]*$/,
      message: 'Slug should only contain lowercase alphanumeric characters and hyphens',
    },
  },
  description: {
    required: 'Description is required',
    maxLength: { value: 500, message: 'Description should not exceed 500 characters' },
  },
  image: {
    required: 'Image is required',
    validate: {
      isFile: (value: FileList) => {
        return value && value[0] instanceof File ? true : 'Image must be a file'
      },
      maxSize: (value: FileList) => {
        return value && value[0].size <= 5242880 ? true : 'Image size should not exceed 5MB'
      },
      acceptedFormats: (value: FileList) => {
        if (value && value[0]) {
          const allowedExtensions = ['jpg', 'jpeg', 'png']
          const fileExtension = value[0].name.split('.').pop()?.toLowerCase()
          return fileExtension && allowedExtensions.includes(fileExtension)
            ? true
            : 'Image should be a JPEG, JPG, or PNG file'
        }
        return 'Image should be a JPEG, JPG, or PNG file'
      },
    },
  },
}
