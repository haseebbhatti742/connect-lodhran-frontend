// assets
import { IconKey } from '@tabler/icons';

// constant
const icons = {
    IconKey
};

// ==============================|| EXTRA staff MENU ITEMS ||============================== //

const staff = {
    id: 'staff',
    title: 'Staff',
    // caption: 'Handle your staff',
    type: 'group',
    children: [
        {
            id: 'add',
            title: 'Handle Staff',
            type: 'collapse',
            icon: icons.IconKey,
            children: [
                {
                    id: 'add-staff',
                    title: 'Add Staff',
                    type: 'item',
                    url: '/dashboard/add-staff',
                    target: false
                }
            ]
        }
    ]
};

export default staff;
