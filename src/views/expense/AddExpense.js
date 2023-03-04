import { useTheme } from '@emotion/react';
import { Alert, FormControl, FormHelperText, Grid, InputLabel, MenuItem, OutlinedInput, Select } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { format } from 'date-fns';
import { Box } from '@mui/system';
import { Formik } from 'formik';
import { useState } from 'react';
import SimpleButton from 'ui-component/SimpleButton';
import { PAYMENT_METHODS } from 'utils/Constants';

import { AddExpenseValidationSchema } from '../../utils/ValidationSchemas';

const initialValues = {
    paymentMethod: '',
    tid: '',
    amount: '',
    date: '',
    time: '',
    details: ''
};

function AddExpense() {
    const theme = useTheme();
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const onSubmit = (values) => {
        try {
            values.time = format(values['time']['$d'], 'h:mm a');
            console.log('values');
            console.log(values);
            setErrorMessage('');
            setIsError(false);
        } catch (e) {
            setErrorMessage(e.message);
            setIsError(true);
        }
    };

    return (
        <>
            <h3>Add Expense Details</h3>
            {isLoading && <h3>Loading...!</h3>}
            {isError && <Alert severity="error">{errorMessage}</Alert>}
            <Formik initialValues={initialValues} validationSchema={AddExpenseValidationSchema} onSubmit={onSubmit}>
                {({ values, errors, touched, isValid, handleChange, handleBlur, handleSubmit, setFieldValue }) => (
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
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
                                        onChange={(event) => handleChange(event)}
                                        label="Select Payment Method"
                                        sx={{ paddingTop: '15px' }}
                                    >
                                        {PAYMENT_METHODS.map(
                                            (item) => item.key !== 'pending' && <MenuItem value={item.key}>{item.value}</MenuItem>
                                        )}
                                    </Select>
                                    {touched.paymentMethod && errors.paymentMethod && (
                                        <FormHelperText error id="standard-weight-helper-text-paymentMethod">
                                            {errors.paymentMethod}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
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
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <FormControl
                                    fullWidth
                                    error={Boolean(touched.amount && errors.amount)}
                                    sx={{ ...theme.typography.customInput }}
                                >
                                    <InputLabel> Amount </InputLabel>
                                    <OutlinedInput
                                        id="amount"
                                        name="amount"
                                        type="number"
                                        value={values.amount}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        label="Amount"
                                        inputProps={{ min: 0 }}
                                        sx={{ paddingTop: '15px' }}
                                    />
                                    {touched.amount && errors.amount && (
                                        <FormHelperText error id="standard-weight-helper-text-amount">
                                            {errors.amount}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <FormControl
                                    fullWidth
                                    error={Boolean(touched.date && errors.date)}
                                    sx={{ ...theme.typography.customInput }}
                                >
                                    <InputLabel> Date </InputLabel>
                                    <OutlinedInput
                                        id="date"
                                        name="date"
                                        type="date"
                                        value={values.date}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        label="Date"
                                        sx={{ paddingTop: '15px' }}
                                    />
                                    {touched.date && errors.date && (
                                        <FormHelperText error id="standard-weight-helper-text-date">
                                            {errors.date}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <FormControl
                                    fullWidth
                                    error={Boolean(touched.time && errors.time)}
                                    sx={{ ...theme.typography.customInput }}
                                >
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoContainer components={['TimePicker', 'TimePicker']}>
                                            <TimePicker
                                                label="Time"
                                                value={values.time}
                                                onChange={(value) => setFieldValue('time', value)}
                                                sx={{ width: '100%' }}
                                            />
                                            {touched.time && errors.time && (
                                                <FormHelperText error id="standard-weight-helper-text-sale-rate">
                                                    {errors.time}
                                                </FormHelperText>
                                            )}
                                        </DemoContainer>
                                    </LocalizationProvider>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <FormControl
                                    fullWidth
                                    error={Boolean(touched.details && errors.details)}
                                    sx={{ ...theme.typography.customInput }}
                                >
                                    <InputLabel> Details </InputLabel>
                                    <OutlinedInput
                                        id="details"
                                        name="details"
                                        type="text"
                                        value={values.details}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        label="Details"
                                        inputProps={{ min: 0 }}
                                    />
                                    {touched.details && errors.details && (
                                        <FormHelperText error id="standard-weight-helper-text-sale-rate">
                                            {errors.details}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Box sx={{ mt: 2 }}>
                            <Grid sx={{ width: '100%' }}>
                                <SimpleButton isValid={!isValid} title="Add Expense" />
                            </Grid>
                        </Box>
                    </form>
                )}
            </Formik>
        </>
    );
}

export default AddExpense;
