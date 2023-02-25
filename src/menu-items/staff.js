// assets
import { IconUser } from '@tabler/icons';

// constant
const icons = {
    IconUser
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
            title: 'Manage Staff',
            type: 'collapse',
            icon: icons.IconUser,
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
