// assets
import { IconNetwork } from '@tabler/icons';

// constant
const icons = {
    IconNetwork
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
            icon: icons.IconNetwork,
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
                }
            ]
        }
    ]
};

export default invoices;
