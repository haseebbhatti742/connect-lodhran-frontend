import { Alert, FormControl, FormHelperText, Grid, InputLabel, MenuItem, OutlinedInput, Select } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/system';
import { Field, Formik } from 'formik';
import jwt from 'jwtservice/jwtService';
import moment from 'moment';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';
import SimpleButton from 'ui-component/SimpleButton';
import { PAYMENT_METHODS } from 'utils/Constants';

import { CreateEntryValidationSchema } from '../../utils/ValidationSchemas';

function CompletePayment() {
    const theme = useTheme();
    const { id } = useParams();
    const [entry, setEntry] = useState({});
    const [initialValues, setInitialValues] = useState({});
    const [isps, setIsps] = useState([]);
    const [packages, setPackages] = useState([]);

    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        getEntry();
        getAllIsps();
        // eslint-disable-next-line
    }, []);

    const getEntry = () => {
        setIsLoading(true);
        jwt.getEntryById(id)
            .then((res) => {
                console.log('Get Entry Result');
                console.log(res);
                setEntry(res?.data);
                setIsLoading(false);
                setIsError(false);
            })
            .catch((err) => {
                console.log('Get Entry Error');
                console.log(err);
                setErrorMessage(err?.response?.data?.message);
                setIsError(true);
                setIsLoading(false);
            });
    };

    const getAllIsps = () => {
        setIsLoading(true);
        jwt.getAllIsps()
            .then((res) => {
                console.log('All Isps Result');
                console.log(res);
                setIsps(res?.data);
                setIsLoading(false);
                setIsError(false);
            })
            .catch((err) => {
                console.log('All Isps Error');
                console.log(err);
                setErrorMessage(err?.response?.data?.message);
                setIsError(true);
                setIsLoading(false);
            });
    };

    const onSubmit = (values) => {
        setIsLoading(true);
        jwt.updateEntry(id, values)
            .then((res) => {
                console.log('Update Entry Result');
                console.log(res);
                setIsLoading(false);
                setIsError(false);
                toast.success('Entry Update');
                navigate('/dashboard/all-entries');
            })
            .catch((err) => {
                console.log('Create Entry Error');
                console.log(err);
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

    const getPackages = (isp) => {
        setIsLoading(true);
        jwt.getAllPackages(isp)
            .then((res) => {
                console.log('All Packages Result');
                console.log(res);
                setPackages(res?.data);
                setIsLoading(false);
                setIsError(false);
            })
            .catch((err) => {
                console.log('All Packages Error');
                console.log(err);
                setErrorMessage(err?.response?.data?.message);
                setIsError(true);
                setIsLoading(false);
            });
    };

    useEffect(() => {
        getPackages(entry?.isp?.id);
        setInitialValues({
            isp: entry?.isp?.id,
            userId: entry?.userId,
            package: entry?.package?.id,
            paymentMethod: entry?.paymentMethod,
            tid: entry?.tid,
            saleRate: entry?.saleRate,
            expiryDate: moment(entry?.expiryDate).format('YYYY-MM-DD')
        });
    }, [entry]);

    return (
        <>
            <h3>Complete Payment</h3>
            {isLoading && <h3>Loading...!</h3>}
            {isError && <Alert severity="error">{errorMessage}</Alert>}
            {!isLoading && (
                <Formik initialValues={initialValues} validationSchema={CreateEntryValidationSchema} onSubmit={onSubmit}>
                    {({ values, errors, isValid, touched, handleChange, handleBlur, handleSubmit, setFieldValue }) => (
                        <form onSubmit={handleSubmit}>
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
                                    sx={{ paddingTop: '15px' }}
                                    disabled
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
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
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
                                            inputProps={{ min: 0 }}
                                            disabled
                                        />
                                        {touched.userId && errors.userId && (
                                            <FormHelperText error id="standard-weight-helper-text-userId">
                                                {errors.userId}
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6}>
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
                                            disabled
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
                                <Grid item xs={6}>
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
                                <Grid item xs={6}>
                                    <FormControl
                                        fullWidth
                                        error={Boolean(touched.tid && errors.tid)}
                                        sx={{ ...theme.typography.customInput }}
                                    >
                                        <InputLabel> TID </InputLabel>
                                        <OutlinedInput
                                            id="tid"
                                            name="tid"
                                            type="text"
                                            value={values.tid}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            label="TID"
                                            inputProps={{ min: 0 }}
                                            disabled={values.paymentMethod === 'net' || values.paymentMethod === 'pending'}
                                        />
                                        {touched.tid && errors.tid && (
                                            <FormHelperText error id="standard-weight-helper-text-tid">
                                                {errors.tid}
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
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
                                            inputProps={{ min: 0 }}
                                            sx={{ paddingTop: '15px' }}
                                            disabled={values.paymentMethod === 'pending'}
                                        />
                                        {touched.saleRate && errors.saleRate && (
                                            <FormHelperText error id="standard-weight-helper-text-sale-rate">
                                                {errors.saleRate}
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6}>
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
                                            sx={{ paddingTop: '15px' }}
                                            disabled
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
                                <Field
                                    id="sendWelcomeMessage"
                                    name="sendWelcomeMessage"
                                    type="checkbox"
                                    checked={values.sendWelcomeMessage}
                                />
                                Send SMS SLert
                            </label>
                            <Box sx={{ mt: 2 }}>
                                <Grid sx={{ width: '100%' }}>
                                    <SimpleButton isValid={!isValid} title="Complete Payment" />
                                </Grid>
                            </Box>
                        </form>
                    )}
                </Formik>
            )}
        </>
    );
}

export default CompletePayment;
