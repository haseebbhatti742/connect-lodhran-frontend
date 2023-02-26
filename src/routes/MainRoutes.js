import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import jwt from 'jwtservice/jwtService';
import { Navigate } from 'react-router';
import AddPackage from 'views/isps/AddPackage';
import AllPackages from 'views/isps/AllPackages';
import AddEntry from 'views/entries/AddEntry';
import AllEntries from 'views/entries/AllEntries';
import AddUser from 'views/users/AddUser';
import AllUsers from 'views/users/AllUsers';
import PendingEntries from 'views/entries/PendingEntries';
import AddStaff from 'views/staff/AddStaff';
import AllStaff from 'views/staff/AllStaff';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

//isp routes
const AddISP = Loadable(lazy(() => import('views/isps/AddISP')));
const ViewAllISPs = Loadable(lazy(() => import('views/isps/ViewAllISPs')));

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
            element: checkLogin(<AddStaff />)
        },
        {
            path: '/dashboard/all-staff',
            element: checkLogin(<AllStaff />)
        },
        {
            path: '/dashboard/add-isp',
            element: checkLogin(<AddISP />)
        },
        {
            path: '/dashboard/all-isps',
            element: checkLogin(<ViewAllISPs />)
        },
        {
            path: '/dashboard/add-package',
            element: checkLogin(<AddPackage />)
        },
        {
            path: '/dashboard/all-packages',
            element: checkLogin(<AllPackages />)
        },
        {
            path: '/dashboard/edit-isp',
            element: checkLogin(<AddPackage />)
        },
        {
            path: '/dashboard/create-entry',
            element: checkLogin(<AddEntry />)
        },
        {
            path: '/dashboard/all-entries',
            element: checkLogin(<AllEntries />)
        },
        {
            path: '/dashboard/pending-entries',
            element: checkLogin(<PendingEntries />)
        },
        {
            path: '/dashboard/add-user',
            element: checkLogin(<AddUser />)
        },
        {
            path: '/dashboard/all-users',
            element: checkLogin(<AllUsers />)
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
