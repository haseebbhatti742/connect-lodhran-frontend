// assets
import { IconCashBanknote } from '@tabler/icons';

// ==============================|| EXTRA ISP MENU ITEMS ||============================== //

const expenses = {
    id: 'expenses',
    title: 'Manage Expenses',
    type: 'group',
    children: [
        {
            id: 'add',
            title: 'Manage Expenses',
            type: 'collapse',
            icon: IconCashBanknote,
            children: [
                {
                    id: 'expenses',
                    title: 'Add Expense',
                    type: 'item',
                    url: '/dashboard/add-expense',
                    target: false
                }
            ]
        }
    ]
};

export default expenses;
