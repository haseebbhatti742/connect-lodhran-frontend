import dashboard from './dashboard';
import entries from './entries';
import expenses from './expenses';
import invoices from './invoices';
import isps from './isps';
// import pages from './pages';
import staff from './staff';
import users from './users';

// ==============================|| MENU ITEMS ||============================== //

const menuItems = {
    // items: [dashboard, pages, utilities, other]
    items: [dashboard, isps, staff, users, expenses, entries, invoices]
};

export default menuItems;
