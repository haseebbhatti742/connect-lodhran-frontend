import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import jwt from 'jwtservice/jwtService';
import { Navigate } from 'react-router';

const MainLayout = Loadable(lazy(() => import('layout/MainLayout')));
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));
const AddISP = Loadable(lazy(() => import('views/isps/AddISP')));
const ViewAllISPs = Loadable(lazy(() => import('views/isps/ViewAllISPs')));
const AddPackage = Loadable(lazy(() => import('views/isps/AddPackage')));
const AllPackages = Loadable(lazy(() => import('views/isps/AllPackages')));
const AddEntry = Loadable(lazy(() => import('views/entries/AddEntry')));
const AllEntries = Loadable(lazy(() => import('views/entries/AllEntries')));
const AddUser = Loadable(lazy(() => import('views/users/AddUser')));
const AllUsers = Loadable(lazy(() => import('views/users/AllUsers')));
const PendingEntries = Loadable(lazy(() => import('views/entries/PendingEntries')));
const AddStaff = Loadable(lazy(() => import('views/staff/AddStaff')));
const AllStaff = Loadable(lazy(() => import('views/staff/AllStaff')));
const CompletePayment = Loadable(lazy(() => import('views/entries/CompletePayment')));
const AllInvoices = Loadable(lazy(() => import('views/invoice/AllInvoices')));
const SendInvoice = Loadable(lazy(() => import('views/invoice/SendInvoice')));
const AddExpense = Loadable(lazy(() => import('views/expense/AddExpense')));
const CompletedExpenses = Loadable(lazy(() => import('views/expense/CompletedExpenses')));
const PendingExpenses = Loadable(lazy(() => import('views/expense/PendingExpenses copy')));
const EditPackage = Loadable(lazy(() => import('views/isps/EditPackage')));

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
            path: '/dashboard/edit-package/:packageId',
            element: checkLogin(<EditPackage />)
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
            path: '/dashboard/complete-payment/:id',
            element: checkLogin(<CompletePayment />)
        },
        {
            path: '/dashboard/all-invoices',
            element: checkLogin(<AllInvoices />)
        },
        {
            path: '/dashboard/send-invoice',
            element: checkLogin(<SendInvoice />)
        },
        {
            path: '/dashboard/add-user',
            element: checkLogin(<AddUser />)
        },
        {
            path: '/dashboard/all-users',
            element: checkLogin(<AllUsers />)
        },
        {
            path: '/dashboard/add-expense',
            element: checkLogin(<AddExpense />)
        },
        {
            path: '/dashboard/all-expenses',
            element: checkLogin(<CompletedExpenses />)
        },
        {
            path: '/dashboard/pending-expenses',
            element: checkLogin(<PendingExpenses />)
        }
    ]
};

export default MainRoutes;
