import Login from '~/pages/Login';
import Register from '~/pages/Register';
import ForgotPassword from '~/pages/ForgotPassword';
import MainCategoriesAdd from '~/pages/MainCategories/MainCategoriesAdd';
import SubCategoriesAdd from '~/pages/SubCategories/SubCategoriesAdd';
import BrandsAdd from '~/pages/Brands/BrandsAdd';
import ProductAdd from '~/pages/Product/ProductAdd';
import SlidesAdd from '~/pages/Slides/SlidesAdd';
import api from '~/api/api';
import { lazy } from 'react';

const DashBoard = lazy(() => import('~/pages/DashBoard'));
const MainCategories = lazy(() => import('~/pages/MainCategories'));
const MainCategoriesEdit = lazy(
   () => import('~/pages/MainCategories/MainCategoriesEdit'),
);
const SubCategories = lazy(() => import('~/pages/SubCategories'));
const SubCategoriesEdit = lazy(() => import('~/pages/SubCategories'));
const Brands = lazy(() => import('~/pages/Brands'));
const BrandsEdit = lazy(() => import('~/pages/Brands/BrandsEdit'));
const Product = lazy(() => import('~/pages/Product'));
const ProductEdit = lazy(() => import('~/pages/Product/ProductEdit'));
const Orders = lazy(() => import('~/pages/Orders'));
const OrdersPreview = lazy(() => import('~/pages/Orders/OrdersPreview'));
const Slides = lazy(() => import('~/pages/Slides'));
const SlidesEdit = lazy(() => import('~/pages/Slides/SlidesEdit'));
const Users = lazy(() => import('~/pages/Users'));
const UsersPreview = lazy(
   () => import('~/pages/Users/UsersPreview/UsersPreview'),
);
const Newletters = lazy(() => import('~/pages/Newletter'));
const Settings = lazy(() => import('~/pages/Settings'));


const accessToken: string | null = localStorage.getItem('access_token')
   ? localStorage.getItem('access_token')
   : null;

// Public Routes
const publicRoutes = [
   { path: api.index, component: accessToken ? DashBoard : Login },
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
   { path: api.productEdit, component: ProductEdit },
   { path: api.orders, component: Orders },
   { path: api.ordersPreview, component: OrdersPreview },
   { path: api.users, component: Users },
   { path: api.usersPreview, component: UsersPreview },
   { path: api.newletter, component: Newletters },
   { path: api.slides, component: Slides },
   { path: api.slidesAdd, component: SlidesAdd },
   { path: api.slidesEdit, component: SlidesEdit },
   { path: api.settings, component: Settings },
];

// Private Routes
// const privateRoutes = [];

export { publicRoutes };
