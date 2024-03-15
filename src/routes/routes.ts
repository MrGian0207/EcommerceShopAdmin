import Login from '~/pages/Login';
import Register from '~/pages/Register';
import ForgotPassword from '~/pages/ForgotPassword';

import api from '~/api/api';

// Public Routes
const publicRoutes = [
    { path: api.login, component: Login },
    { path: api.register, component: Register },
    { path: api.forgetPassword, component: ForgotPassword },
];

// Private Routes
// const privateRoutes = [];

export { publicRoutes };
