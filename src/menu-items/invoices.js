// assets
import { IconFileInvoice } from '@tabler/icons';

// constant
const icons = {
    IconFileInvoice
};

// ==============================|| EXTRA ISP MENU ITEMS ||============================== //

const invoices = {
    id: 'invoices',
    title: 'Invoices',
    // caption: 'Handle your invoices',
    type: 'group',
    children: [
        {
            id: 'add',
            title: 'User Entry & Invoices',
            type: 'collapse',
            icon: icons.IconFileInvoice,
            children: [
                {
                    id: 'create-entry',
                    title: 'Create Entry',
                    type: 'item',
                    url: '/dashboard/create-entry',
                    target: false
                },
                {
                    id: 'all-entries',
                    title: 'All Entries',
                    type: 'item',
                    url: '/dashboard/all-entries',
                    target: false
                },
                {
                    id: 'pending-entries',
                    title: 'Pending Entries',
                    type: 'item',
                    url: '/dashboard/pending-entries',
                    target: false
                },
                {
                    id: 'invoice',
                    title: 'Invoices',
                    type: 'item',
                    url: '/dashboard/all-invoices',
                    target: false
                }
            ]
        }
    ]
};

export default invoices;
