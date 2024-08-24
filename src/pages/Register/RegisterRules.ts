export const RegisterRules = {
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
  password: {
    required: 'Password is required',
    minLength: { value: 8, message: 'Password should be at least 8 characters long' },
  },
  phone: {
    required: 'Phone number is required',
    minLength: { value: 10, message: 'Phone number should be at least 8 characters' },
  },
}
