import * as Yup from 'yup';

export const AddISPValidationSchema = Yup.object().shape({
    name: Yup.string().required('ISP name is required'),
    vlan: Yup.number().required('VLAN is requried')
});
