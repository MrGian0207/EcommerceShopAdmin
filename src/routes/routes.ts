import Login from '~/pages/Login';
import Register from '~/pages/Register';
import ForgotPassword from '~/pages/ForgotPassword';
import DashBoard from '~/pages/DashBoard';
import MainCategories from '~/pages/MainCategories';
import SubCategories from '~/pages/SubCategories';
import MainCategoriesAdd from '~/pages/MainCategories/MainCategoriesAdd';
import MainCategoriesEdit from '~/pages/MainCategories/MainCategoriesEdit';
import SubCategoriesAdd from '~/pages/SubCategories/SubCategoriesAdd';
import SubCategoriesEdit from '~/pages/SubCategories/SubCategoriesEdit';
import Brands from '~/pages/Brands';
import BrandsAdd from '~/pages/Brands/BrandsAdd';
import BrandsEdit from '~/pages/Brands/BrandsEdit';
import Product from '~/pages/Product';
import ProductAdd from '~/pages/Product/ProductAdd';

import api from '~/api/api';

// Public Routes
const publicRoutes = [
    { path: api.login, component: Login },
    { path: api.register, component: Register },
    { path: api.forgetPassword, component: ForgotPassword },
    { path: api.dashboard, component: DashBoard },
    { path: api.mainCategories, component: MainCategories },
    { path: api.mainCategoriesAdd, component: MainCategoriesAdd },
    { path: api.mainCategoriesEdit, component: MainCategoriesEdit },
    { path: api.subCategories, component: SubCategories },
    { path: api.subCategoriesAdd, component: SubCategoriesAdd },
    { path: api.subCategoriesEdit, component: SubCategoriesEdit },
    { path: api.brands, component: Brands },
    { path: api.brandsAdd, component: BrandsAdd },
    { path: api.brandsEdit, component: BrandsEdit },
    { path: api.product, component: Product },
    { path: api.productAdd, component: ProductAdd },
];

// Private Routes
// const privateRoutes = [];

export { publicRoutes };
