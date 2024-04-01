import Login from '~/pages/Login';
import Register from '~/pages/Register';
import ForgotPassword from '~/pages/ForgotPassword';
import DashBoard from '~/pages/DashBoard';
import Brands from '~/pages/Brands';
import MainCategories from '~/pages/MainCategories';

import api from '~/api/api';

// Public Routes
const publicRoutes = [
    { path: api.login, component: Login },
    { path: api.register, component: Register },
    { path: api.forgetPassword, component: ForgotPassword },
    { path: api.dashboard, component: DashBoard },
    { path: api.brands, component: Brands },
    { path: api.mainCategories, component: MainCategories },

];

// Private Routes
// const privateRoutes = [];

export { publicRoutes };
