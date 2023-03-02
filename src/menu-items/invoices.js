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
            title: 'Invoice Entry',
            type: 'collapse',
            icon: icons.IconFileInvoice,
            children: [
                {
                    id: 'invoice',
                    title: 'Send Invoice',
                    type: 'item',
                    url: '/dashboard/send-invoice',
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
