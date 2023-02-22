// assets
import { IconNetwork } from '@tabler/icons';

// constant
const icons = {
    IconNetwork
};

// ==============================|| EXTRA ISP MENU ITEMS ||============================== //

const isps = {
    id: 'isps',
    title: 'ISPs',
    // caption: 'Handle your isps',
    type: 'group',
    children: [
        {
            id: 'add',
            title: 'Handle ISPs',
            type: 'collapse',
            icon: icons.IconNetwork,
            children: [
                {
                    id: 'add-isp',
                    title: 'Add ISP',
                    type: 'item',
                    url: '/dashboard/add-isp',
                    target: false
                },
                {
                    id: 'all-isps',
                    title: 'All ISPs',
                    type: 'item',
                    url: '/dashboard/all-isps',
                    target: false
                }
            ]
        }
    ]
};

export default isps;
