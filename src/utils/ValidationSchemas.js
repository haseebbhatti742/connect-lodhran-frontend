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
    cnic: Yup.string()
        .matches(/^\d{13}$/, 'Invalid CNIC format')
        .required('CNIC is requires'),
    mobile: Yup.string()
        .matches(/^92(3)\d{9}$/, 'Invalid phone number format')
        .required('Mobile is requires'),
    address: Yup.string().required('Address is requires'),
    sendWelcomeMessage: Yup.boolean().required()
});

export const AddStaffValidationSchema = Yup.object().shape({
    fullname: Yup.string().required('Full Name is requires'),
    cnic: Yup.string()
        .matches(/^\d{13}$/, 'Invalid CNIC format')
        .required('CNIC is requires'),
    mobile: Yup.string()
        .matches(/^92(3)\d{9}$/, 'Invalid phone number format')
        .required('Mobile is requires'),
    address: Yup.string().required('Address is requires'),
    email: Yup.string().email().required('Email is required'),
    password: Yup.string().required('Password is required'),
    sendWelcomeMessage: Yup.boolean().required()
});

export const CreateEntryValidationSchema = Yup.object().shape({
    isp: Yup.string().required('ISP is required'),
    userId: Yup.string().required('User id is required'),
    package: Yup.string().required('Package is required'),
    paymentMethod: Yup.string().required('Payment Method id is required'),
    tid: Yup.string(),
    saleRate: Yup.number().required('Sale Rate is required'),
    expiryDate: Yup.date().required('Expiry Date is required')
});
