const api = {
  login: '/auth/login',
  register: '/auth/register',
  forgetPassword: '/auth/forgot-password',
  dashboard: '/dashboard',
  mainCategories: 'categories/main-categories',
  mainCategoriesAdd: 'categories/main-categories/add',
  mainCategoriesEdit: 'categories/main-categories/:id',
  subCategories: 'categories/sub-categories',
  subCategoriesAdd: 'categories/sub-categories/add',
  subCategoriesEdit: 'categories/sub-categories/:id',
  brands: '/brands',
  brandsAdd: '/brands/add',
  brandsEdit: '/brands/:id',
  product: 'products',
  productAdd: '/products/add',
  productEdit: '/products/:id',
  orders: '/orders',
  ordersPreview: '/orders/:id',
  users: '/users',
  usersPreview: '/users/:id',
};

export default api;
