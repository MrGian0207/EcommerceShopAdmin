export const SlidesRules = {
  heading: {
    required: 'Heading is required',
    maxLength: { value: 50, message: 'Heading should not exceed 50 characters' },
    pattern: {
      value: /^[a-zA-Z0-9\s]*$/,
      message: 'Heading should only contain alphanumeric characters and spaces',
    },
  },
  primaryButtonText: {
    required: 'Primary Button Text is required',
    maxLength: { value: 50, message: 'Primary Button Text should not exceed 50 characters' },
    pattern: {
      value: /^[a-zA-Z0-9\s]*$/,
      message: 'Primary Button Text should only contain alphanumeric characters and spaces',
    },
  },
  primaryButtonLink: {
    required: 'Primary Button Link is required',
    maxLength: { value: 200, message: 'Primary Button Link should not exceed 200 characters' },
  },
  secondaryButtonText: {
    required: 'Secondary Button Text is required',
    maxLength: { value: 50, message: 'Secondary Button Text should not exceed 50 characters' },
    pattern: {
      value: /^[a-zA-Z0-9\s]*$/,
      message: 'Secondary Button Text should only contain alphanumeric characters and spaces',
    },
  },
  secondaryButtonLink: {
    required: 'Secondary Button Link is required',
    maxLength: { value: 200, message: 'Secondary Button Link should not exceed 200 characters' },
  },
  description: {
    required: 'Description is required',
    maxLength: { value: 2000, message: 'Description should not exceed 2000 characters' },
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
