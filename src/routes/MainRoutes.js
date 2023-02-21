import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import jwt from 'jwtservice/jwtService';
import { Navigate } from 'react-router';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// utilities routing
// const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
// const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
// const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));
// const UtilsMaterialIcons = Loadable(lazy(() => import('views/utilities/MaterialIcons')));
// const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/TablerIcons')));

// sample page routing
// const SamplePage = Loadable(lazy(() => import('views/sample-page')));

// ==============================|| MAIN ROUTING ||============================== //

const checkLogin = (element) => {
    return jwt.getIsLogin() === true ? element : <Navigate to="/login" replace={true} />;
};

const MainRoutes = {
    path: '/dashboard',
    element: checkLogin(<MainLayout />),
    children: [
        {
            path: '/dashboard',
            element: checkLogin(<DashboardDefault />)
        },
        {
            path: '/dashboard/add-staff',
            element: checkLogin(<>Add Staff Component</>)
        }
        // {
        //     path: 'utils',
        //     children: [
        //         {
        //             path: 'util-typography',
        //             element: <UtilsTypography />
        //         }
        //     ]
        // },
        // {
        //     path: 'utils',
        //     children: [
        //         {
        //             path: 'util-color',
        //             element: <UtilsColor />
        //         }
        //     ]
        // },
        // {
        //     path: 'utils',
        //     children: [
        //         {
        //             path: 'util-shadow',
        //             element: <UtilsShadow />
        //         }
        //     ]
        // },
        // {
        //     path: 'icons',
        //     children: [
        //         {
        //             path: 'tabler-icons',
        //             element: <UtilsTablerIcons />
        //         }
        //     ]
        // },
        // {
        //     path: 'icons',
        //     children: [
        //         {
        //             path: 'material-icons',
        //             element: <UtilsMaterialIcons />
        //         }
        //     ]
        // },
        // {
        //     path: 'sample-page',
        //     element: <SamplePage />
        // }
    ]
};

export default MainRoutes;
