import { Alert, FormControl, FormHelperText, Grid, InputLabel, MenuItem, OutlinedInput, Select } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/system';
import { Formik } from 'formik';
import jwt from 'jwtservice/jwtService';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import SimpleButton from 'ui-component/SimpleButton';

import { AddPackageValidationSchema } from '../../utils/ValidationSchemas';

function AddPackage() {
    const theme = useTheme();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const { ispId, color } = useLocation().state;
    const initialValues = {
        isp: ispId,
        name: '',
        bandwidth: '',
        rateType: '',
        ratePerDay: 0,
        purchaseRate: '',
        saleRate: '',
        validity: ''
    };

    const handleRatePerDayChange = (event, setFieldValue) => {
        const { value } = event.target;
        setFieldValue('ratePerDay', value);
        setFieldValue('purchaseRate', (value * 31).toFixed(2));
    };

    const onSubmit = (values) => {
        setIsLoading(true);
        jwt.createPackage(values)
            .then((res) => {
                console.log(res);
                setIsLoading(false);
                toast.success('Package Added');
                navigate(-1);
            })
            .catch((err) => {
                setErrorMessage(err?.response?.data?.message);
                setIsError(true);
                setIsLoading(false);
            });
    };

    return (
        <>
            <h3>Add Package Details</h3>
            {isError && <Alert severity="error">{errorMessage}</Alert>}
            <Formik initialValues={initialValues} validationSchema={AddPackageValidationSchema} onSubmit={onSubmit}>
                {({ values, errors, isValid, touched, handleChange, handleBlur, handleSubmit, setFieldValue }) => (
                    <form onSubmit={handleSubmit}>
                        <FormControl fullWidth error={Boolean(touched.name && errors.name)} sx={{ ...theme.typography.customInput }}>
                            <InputLabel> Package Name </InputLabel>
                            <OutlinedInput
                                id="name"
                                name="name"
                                type="text"
                                value={values.name}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                label="ISP Name"
                                inputProps={{}}
                            />
                            {touched.name && errors.name && (
                                <FormHelperText error id="standard-weight-helper-text-name">
                                    {errors.name}
                                </FormHelperText>
                            )}
                        </FormControl>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <FormControl
                                    fullWidth
                                    error={Boolean(touched.bandwidth && errors.bandwidth)}
                                    sx={{ ...theme.typography.customInput }}
                                >
                                    <InputLabel> Bandwidth (In MBs)</InputLabel>
                                    <OutlinedInput
                                        id="bandwidth"
                                        name="bandwidth"
                                        type="number"
                                        value={values.bandwidth}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        label="Bandwidth (In MBs)"
                                        inputProps={{ min: 0 }}
                                    />
                                    {touched.bandwidth && errors.bandwidth && (
                                        <FormHelperText error id="standard-weight-helper-text-bandwidth">
                                            {errors.bandwidth}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl
                                    fullWidth
                                    error={Boolean(touched.rateType && errors.rateType)}
                                    sx={{ ...theme.typography.customInput }}
                                >
                                    <InputLabel> Rate Type </InputLabel>
                                    <Select
                                        variant="outlined"
                                        id="rateType"
                                        name="rateType"
                                        value={values.rateType}
                                        onChange={handleChange}
                                        label="Rate Type"
                                        sx={{ paddingTop: '15px' }}
                                    >
                                        <MenuItem value="day">Per Day</MenuItem>
                                        <MenuItem value="month">Per Month</MenuItem>
                                    </Select>
                                    {touched.rateType && errors.rateType && (
                                        <FormHelperText error id="standard-weight-helper-text-rate-type">
                                            {errors.rateType}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <FormControl
                                    fullWidth
                                    error={Boolean(touched.ratePerDay && errors.ratePerDay)}
                                    sx={{ ...theme.typography.customInput }}
                                >
                                    <InputLabel> Rate Per Day </InputLabel>
                                    <OutlinedInput
                                        id="ratePerDay"
                                        name="ratePerDay"
                                        type="number"
                                        value={values.rateType === 'day' ? values.ratePerDay : 0}
                                        onBlur={handleBlur}
                                        onChange={(event) => handleRatePerDayChange(event, setFieldValue)}
                                        label="Rate Per Day"
                                        inputProps={{ min: 0 }}
                                        disabled={values.rateType !== 'day'}
                                    />
                                    {touched.ratePerDay && errors.ratePerDay && (
                                        <FormHelperText error id="standard-weight-helper-text-rate-per-day">
                                            {errors.ratePerDay}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl
                                    fullWidth
                                    error={Boolean(touched.purchaseRate && errors.purchaseRate)}
                                    sx={{ ...theme.typography.customInput }}
                                >
                                    <InputLabel> Purchase Rate </InputLabel>
                                    <OutlinedInput
                                        id="purchaseRate"
                                        name="purchaseRate"
                                        type="number"
                                        value={values.purchaseRate}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        label="Purchase Rate"
                                        inputProps={{ min: 0 }}
                                    />
                                    {touched.purchaseRate && errors.purchaseRate && (
                                        <FormHelperText error id="standard-weight-helper-text-purchase-rate">
                                            {errors.purchaseRate}
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
                                    error={Boolean(touched.validity && errors.validity)}
                                    sx={{ ...theme.typography.customInput }}
                                >
                                    <InputLabel> Validity (In days) </InputLabel>
                                    <OutlinedInput
                                        id="validity"
                                        name="validity"
                                        type="number"
                                        value={values.validity}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        label="Validity (In Days)"
                                        inputProps={{ min: 0 }}
                                    />
                                    {touched.validity && errors.validity && (
                                        <FormHelperText error id="standard-weight-helper-text-validity">
                                            {errors.validity}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Box sx={{ mt: 2 }}>
                            <Grid sx={{ width: '100%' }}>
                                <SimpleButton isValid={!isValid || isLoading} title="Add Package" color={color} />
                            </Grid>
                        </Box>
                    </form>
                )}
            </Formik>
        </>
    );
}

export default AddPackage;
