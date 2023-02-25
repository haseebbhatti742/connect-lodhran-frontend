import * as Yup from 'yup';

export const AddISPValidationSchema = Yup.object().shape({
    name: Yup.string().required('ISP name is required'),
    vlan: Yup.number().required('VLAN is requried'),
    color: Yup.string().required('Color is requried')
});

export const AddPackageValidationSchema = Yup.object().shape({
    isp: Yup.string().required('ISP id is required'),
    name: Yup.string().required('Package Name is requried'),
    bandwidth: Yup.number().required('Bandwidth is requried'),
    rateType: Yup.string().required('Rate type is requried'),
    ratePerDay: Yup.number(),
    purchaseRate: Yup.number().required('Purchase rate is requried'),
    saleRate: Yup.number()
        .required('Sale rate is requried')
        .test('greaterThan', 'Sale Rate must be greater than Purchase Rate', function (value) {
            const purchaseRate = this.parent.purchaseRate;
            return value > purchaseRate;
        }),
    validity: Yup.number().required('Validity is requried')
});

export const AddUserValidationSchema = Yup.object().shape({
    fullname: Yup.string().required('Full Name is requires'),
    userId: Yup.string().required('User Id is requires'),
    cnic: Yup.string().required('CNIC is requires'),
    mobile: Yup.string().required('Mobile is requires'),
    address: Yup.string().required('Address is requires')
});
