export const SettingRules = {
  name: {
    required: 'Name is required',
    maxLength: { value: 50, message: 'Name should not exceed 50 characters' },
  },
  email: {
    required: 'Email is required',
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: 'Invalid email address',
    },
  },
  phone: {
    required: 'Phone is required',
  },
  about: {
    required: 'About is required',
    maxLength: { value: 500, message: 'About should not exceed 500 characters' },
  },
  password: {
    required: 'Password is required',
    minLength: { value: 8, message: 'Password should be at least 8 characters long' },
    pattern: {
      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      message:
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
    },
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
