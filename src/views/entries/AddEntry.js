import { Alert, FormControl, FormHelperText, Grid, InputLabel, MenuItem, OutlinedInput, Select } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/system';
import { Field, Formik } from 'formik';
import jwt from 'jwtservice/jwtService';
import moment from 'moment';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import SimpleButton from 'ui-component/SimpleButton';
import { PAYMENT_METHODS, THEME_COLOR_DARK } from 'utils/Constants';

import { CreateEntryValidationSchema } from '../../utils/ValidationSchemas';

function AddEntry() {
    const theme = useTheme();
    const [isps, setIsps] = useState([]);
    const [packages, setPackages] = useState([]);

    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [colorBg, setColorBg] = useState(THEME_COLOR_DARK);

    const startDateRef = useRef(null);

    const navigate = useNavigate();

    useEffect(() => {
        setIsLoading(true);
        jwt.getAllIsps()
            .then((res) => {
                setIsps(res?.data);
                setIsLoading(false);
                setIsError(false);
            })
            .catch((err) => {
                setErrorMessage(err?.response?.data?.message);
                setIsError(true);
                setIsLoading(false);
            });
    }, []);

    const initialValues = {
        entryDate: '',
        isp: '',
        userId: '',
        package: '',
        paymentMethod: '',
        tid: '',
        saleRate: '',
        startDate: '',
        expiryDate: ''
    };

    const onSubmit = (values) => {
        console.log('values');
        console.log(values);
        setIsLoading(true);
        jwt.createEntry(values)
            .then((res) => {
                setIsLoading(false);
                setIsError(false);
                alert('Entry Created');
                navigate('/dashboard/all-entries');
            })
            .catch((err) => {
                setErrorMessage(err?.response?.data?.message);
                setIsError(true);
                setIsLoading(false);
            });
    };

    const handleIspSelectChange = (event, setFieldValue) => {
        const ispId = event.target.value;
        setFieldValue('isp', ispId);
        getPackages(ispId);
    };

    const handlePaymentMethodChange = (event, setFieldValue) => {
        const paymentMethod = event.target.value;
        setFieldValue('paymentMethod', paymentMethod);
        if (paymentMethod === 'net' || paymentMethod === 'pending') {
            setFieldValue('tid', '');
        }
        if (paymentMethod === 'pending') {
            setFieldValue('saleRate', 0);
        }
    };

    const handleStartDate = (event, setFieldValue) => {
        const givenDate = new Date(event.target.value);
        const oneMonthLaterDate = new Date(givenDate.getFullYear(), givenDate.getMonth() + 1, givenDate.getDate());
        setFieldValue('startDate', event.target.value);
        setFieldValue('expiryDate', moment(oneMonthLaterDate).format('YYYY-MM-DD'));
        startDateRef.current.blur();
    };

    const getPackages = (isp) => {
        setIsLoading(true);
        jwt.getAllPackages(isp)
            .then((res) => {
                setPackages(res?.data);
                setColorBg(res?.data[0]?.isp?.color);
                setIsLoading(false);
                setIsError(false);
            })
            .catch((err) => {
                setErrorMessage(err?.response?.data?.message);
                setIsError(true);
                setIsLoading(false);
            });
    };

    return (
        <>
            <h3>Add Entry Details</h3>
            {isLoading && <h3>Loading...!</h3>}
            {isError && <Alert severity="error">{errorMessage}</Alert>}
            <Formik initialValues={initialValues} validationSchema={CreateEntryValidationSchema} onSubmit={onSubmit}>
                {({ values, errors, isValid, touched, handleChange, handleBlur, handleSubmit, setFieldValue }) => (
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <FormControl
                                    fullWidth
                                    error={Boolean(touched.entryDate && errors.entryDate)}
                                    sx={{ ...theme.typography.customInput }}
                                >
                                    <InputLabel> Entry Date </InputLabel>
                                    <OutlinedInput
                                        id="entryDate"
                                        name="entryDate"
                                        type="date"
                                        value={values.entryDate}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        label="Entry Date"
                                        sx={{ paddingTop: '10px' }}
                                        inputProps={{ max: moment(new Date()).format('YYYY-MM-DD') }}
                                    />
                                    {touched.entryDate && errors.entryDate && (
                                        <FormHelperText error id="standard-weight-helper-text-entryDate">
                                            {errors.entryDate}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <FormControl fullWidth error={Boolean(touched.isp && errors.isp)} sx={{ ...theme.typography.customInput }}>
                                    <InputLabel> Select User's ISP </InputLabel>
                                    <Select
                                        id="isp"
                                        name="isp"
                                        type="text"
                                        value={values.isp}
                                        onBlur={handleBlur}
                                        onChange={(event) => handleIspSelectChange(event, setFieldValue)}
                                        label="User's ISP"
                                        sx={{ paddingTop: '20px' }}
                                    >
                                        {isps.map((isp) => (
                                            <MenuItem value={isp.id}>{isp.name}</MenuItem>
                                        ))}
                                    </Select>
                                    {touched.isp && errors.isp && (
                                        <FormHelperText error id="standard-weight-helper-text-name">
                                            {errors.isp}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <FormControl
                                    fullWidth
                                    error={Boolean(touched.userId && errors.userId)}
                                    sx={{ ...theme.typography.customInput }}
                                >
                                    <InputLabel> User Id </InputLabel>
                                    <OutlinedInput
                                        id="userId"
                                        name="userId"
                                        type="text"
                                        value={values.userId}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        label="User Id"
                                        inputProps={{ min: 1 }}
                                        sx={{ paddingTop: '5px' }}
                                    />
                                    {touched.userId && errors.userId && (
                                        <FormHelperText error id="standard-weight-helper-text-userId">
                                            {errors.userId}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <FormControl
                                    fullWidth
                                    error={Boolean(touched.package && errors.package)}
                                    sx={{ ...theme.typography.customInput }}
                                >
                                    <InputLabel> Select Package </InputLabel>
                                    <Select
                                        id="package"
                                        name="package"
                                        type="text"
                                        value={values.package}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        label="Select Package"
                                        sx={{ paddingTop: '15px' }}
                                    >
                                        {packages.map((item) => (
                                            <MenuItem value={item.id}>{item.name}</MenuItem>
                                        ))}
                                    </Select>
                                    {touched.package && errors.package && (
                                        <FormHelperText error id="standard-weight-helper-text-package">
                                            {errors.package}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12} md={4} lg={4}>
                                <FormControl
                                    fullWidth
                                    error={Boolean(touched.paymentMethod && errors.paymentMethod)}
                                    sx={{ ...theme.typography.customInput }}
                                >
                                    <InputLabel> Select Payment Method </InputLabel>
                                    <Select
                                        id="paymentMethod"
                                        name="paymentMethod"
                                        type="text"
                                        value={values.paymentMethod}
                                        onBlur={handleBlur}
                                        onChange={(event) => handlePaymentMethodChange(event, setFieldValue)}
                                        label="Select Payment Method"
                                        sx={{ paddingTop: '15px' }}
                                    >
                                        {PAYMENT_METHODS.map((item) => (
                                            <MenuItem value={item.key}>{item.value}</MenuItem>
                                        ))}
                                    </Select>
                                    {touched.paymentMethod && errors.paymentMethod && (
                                        <FormHelperText error id="standard-weight-helper-text-paymentMethod">
                                            {errors.paymentMethod}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={12} md={4} lg={4}>
                                <FormControl fullWidth error={Boolean(touched.tid && errors.tid)} sx={{ ...theme.typography.customInput }}>
                                    <InputLabel> TID </InputLabel>
                                    <OutlinedInput
                                        id="tid"
                                        name="tid"
                                        type="text"
                                        value={values.tid}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        label="TID"
                                        sx={{ paddingTop: '5px' }}
                                        inputProps={{ min: 1 }}
                                        disabled={values.paymentMethod === 'net' || values.paymentMethod === 'pending'}
                                    />
                                    {touched.tid && errors.tid && (
                                        <FormHelperText error id="standard-weight-helper-text-tid">
                                            {errors.tid}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={12} md={4} lg={4}>
                                <FormControl
                                    fullWidth
                                    error={Boolean(touched.saleRate && errors.saleRate)}
                                    sx={{ ...theme.typography.customInput }}
                                >
                                    <InputLabel> Sale Rate </InputLabel>
                                    <OutlinedInput
                                        id="saleRate"
                                        name="saleRate"
                                        type="number"
                                        value={values.saleRate}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        label="Sale Rate"
                                        inputRef={startDateRef}
                                        inputProps={{ min: 1 }}
                                        sx={{ paddingTop: '5px' }}
                                        disabled={values.paymentMethod === 'pending'}
                                    />
                                    {touched.saleRate && errors.saleRate && (
                                        <FormHelperText error id="standard-weight-helper-text-sale-rate">
                                            {errors.saleRate}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <FormControl
                                    fullWidth
                                    error={Boolean(touched.startDate && errors.startDate)}
                                    sx={{ ...theme.typography.customInput }}
                                >
                                    <InputLabel> Start Date </InputLabel>
                                    <OutlinedInput
                                        id="startDate"
                                        name="startDate"
                                        type="date"
                                        value={values.startDate}
                                        onBlur={handleBlur}
                                        onChange={(e) => handleStartDate(e, setFieldValue)}
                                        label="Expriy Date"
                                        sx={{ paddingTop: '10px' }}
                                    />
                                    {touched.startDate && errors.startDate && (
                                        <FormHelperText error id="standard-weight-helper-text-startDate">
                                            {errors.startDate}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <FormControl
                                    fullWidth
                                    error={Boolean(touched.expiryDate && errors.expiryDate)}
                                    sx={{ ...theme.typography.customInput }}
                                >
                                    <InputLabel> Expiry Date </InputLabel>
                                    <OutlinedInput
                                        id="expiryDate"
                                        name="expiryDate"
                                        type="date"
                                        value={values.expiryDate}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        label="Expriy Date"
                                        sx={{ paddingTop: '10px' }}
                                    />
                                    {touched.expiryDate && errors.expiryDate && (
                                        <FormHelperText error id="standard-weight-helper-text-expiryDate">
                                            {errors.expiryDate}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                        </Grid>
                        <label htmlFor="sendWelcomeMessage">
                            <Field id="sendWelcomeMessage" name="sendWelcomeMessage" type="checkbox" checked={values.sendWelcomeMessage} />
                            Send SMS Alert
                        </label>
                        <Box sx={{ mt: 2 }}>
                            <Grid sx={{ width: '100%' }}>
                                <SimpleButton isValid={!isValid} title="Add Package" color={colorBg} />
                            </Grid>
                        </Box>
                    </form>
                )}
            </Formik>
        </>
    );
}

export default AddEntry;
