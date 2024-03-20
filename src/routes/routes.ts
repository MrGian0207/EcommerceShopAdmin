import Login from '~/pages/Login';
import Register from '~/pages/Register';
import ForgotPassword from '~/pages/ForgotPassword';
import DashBoard from '~/pages/DashBoard';

import api from '~/api/api';

// Public Routes
const publicRoutes = [
    { path: api.login, component: Login },
    { path: api.register, component: Register },
    { path: api.forgetPassword, component: ForgotPassword },
    { path: api.dashboard, component: DashBoard },
];

// Private Routes
// const privateRoutes = [];

export { publicRoutes };
