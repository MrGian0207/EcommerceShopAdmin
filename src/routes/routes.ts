import api from '~/api/api'
import Brands from '~/pages/Brands'
import BrandsAdd from '~/pages/Brands/BrandsAdd'
import BrandsEdit from '~/pages/Brands/BrandsEdit'
import DashBoard from '~/pages/DashBoard'
import ForgotPassword from '~/pages/ForgotPassword'
import Login from '~/pages/Login'
import MainCategories from '~/pages/MainCategories'
import MainCategoriesAdd from '~/pages/MainCategories/MainCategoriesAdd'
import MainCategoriesEdit from '~/pages/MainCategories/MainCategoriesEdit'
import Newletters from '~/pages/Newletter'
import Orders from '~/pages/Orders'
import OrdersPreview from '~/pages/Orders/OrdersPreview'
import Product from '~/pages/Product'
import ProductAdd from '~/pages/Product/ProductAdd'
import ProductEdit from '~/pages/Product/ProductEdit'
import Register from '~/pages/Register'
import Settings from '~/pages/Settings'
import Slides from '~/pages/Slides'
import SlidesAdd from '~/pages/Slides/SlidesAdd'
import SlidesEdit from '~/pages/Slides/SlidesEdit'
import SubCategories from '~/pages/SubCategories'
import SubCategoriesAdd from '~/pages/SubCategories/SubCategoriesAdd'
import SubCategoriesEdit from '~/pages/SubCategories/SubCategoriesEdit'
import Users from '~/pages/Users'
import UsersPreview from '~/pages/Users/UsersPreview'

const accessToken: string = localStorage.getItem('access_token') || ''

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
]

// Private Routes
// const privateRoutes = [];

export { publicRoutes }
