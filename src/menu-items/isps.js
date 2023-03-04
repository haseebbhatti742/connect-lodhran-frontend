// assets
import { IconNetwork } from '@tabler/icons';

// ==============================|| EXTRA ISP MENU ITEMS ||============================== //

const isps = {
    id: 'isps',
    title: 'ISPs',
    // caption: 'Handle your isps',
    type: 'group',
    children: [
        {
            id: 'add',
            title: 'Manage ISPs',
            type: 'collapse',
            icon: IconNetwork,
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
