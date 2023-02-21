import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';
import jwt from 'jwtservice/jwtService';
import { Navigate } from 'react-router';

// login option 3 routing
const AuthLogin = Loadable(lazy(() => import('views/pages/authentication/authentication/Login')));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const checkLogin = (element) => {
    return jwt.getIsLogin() !== true ? element : <Navigate to="/dashboard" replace={true} />;
};

const AuthenticationRoutes = {
    path: '/login',
    element: checkLogin(<MinimalLayout />),
    children: [
        {
            path: '/login',
            element: checkLogin(<AuthLogin />)
        }
    ]
};

export default AuthenticationRoutes;
