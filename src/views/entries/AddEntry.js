import { FormControl, FormHelperText, Grid, InputLabel, Menu, MenuItem, OutlinedInput, Select } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/system';
import { Formik } from 'formik';
import { useLocation } from 'react-router';
import SimpleButton from 'ui-component/SimpleButton';

import { AddPackageValidationSchema } from '../../utils/ValidationSchemas';

const onSubmit = (values) => {
    console.log('values');
    console.log(values);
};

function AddEntry() {
    const theme = useTheme();

    // const { ispId, color } = useLocation().state;
    const initialValues = {
        isp: '',
        name: '',
        bandwidth: '',
        rateType: '',
        ratePerDay: '',
        purchaseRate: '',
        saleRate: '',
        validity: ''
    };

    const handleRatePerDayChange = (event, setFieldValue) => {
        const { value } = event.target;
        setFieldValue('ratePerDay', value);
        setFieldValue('purchaseRate', (value * 31).toFixed(2));
    };

    return (
        <>
            <h3>Add Entry Details</h3>
            <Formik initialValues={initialValues} validationSchema={AddPackageValidationSchema} onSubmit={onSubmit}>
                {({ values, errors, isValid, touched, handleChange, handleBlur, handleSubmit, setFieldValue }) => (
                    <form onSubmit={handleSubmit}>
                        <FormControl fullWidth error={Boolean(touched.name && errors.name)} sx={{ ...theme.typography.customInput }}>
                            <InputLabel> Select USers's ISP </InputLabel>
                            <Select
                                id="isp"
                                name="name"
                                type="text"
                                value={values.name}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                label="User's ISP"
                                inputProps={{}}
                            >
                                <MenuItem>Connect</MenuItem>
                                <MenuItem>GetLinks</MenuItem>
                                <MenuItem>Transworld</MenuItem>
                                <MenuItem>Wateen</MenuItem>
                            </Select>
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
                                    <InputLabel> Username </InputLabel>
                                    <OutlinedInput
                                        id="bandwidth"
                                        name="bandwidth"
                                        type="number"
                                        value={values.bandwidth}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        label="Username"
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
                                    <InputLabel> Select Package </InputLabel>
                                    <Select
                                        id="isp"
                                        name="name"
                                        type="text"
                                        value={values.name}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        label="Select Package"
                                        inputProps={{}}
                                    >
                                        <MenuItem>2Mb</MenuItem>
                                        <MenuItem>4Mb</MenuItem>
                                        <MenuItem>6Mb</MenuItem>
                                        <MenuItem>8Mb</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <FormControl
                                    fullWidth
                                    error={Boolean(touched.rateType && errors.rateType)}
                                    sx={{ ...theme.typography.customInput }}
                                >
                                    <InputLabel> Select Payment Method </InputLabel>
                                    <Select
                                        id="isp"
                                        name="name"
                                        type="text"
                                        value={values.name}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        label="Select Payment Method"
                                        inputProps={{}}
                                    >
                                        <MenuItem>NET</MenuItem>
                                        <MenuItem>Meezan Bank</MenuItem>
                                        <MenuItem>JazzCash</MenuItem>
                                        <MenuItem>EasyPaisa</MenuItem>
                                        <MenuItem>U-Paisa</MenuItem>
                                        <MenuItem>NayaPay</MenuItem>
                                        <MenuItem>SadaPay</MenuItem>
                                        <MenuItem>Other</MenuItem>
                                        <MenuItem>Pending</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl
                                    fullWidth
                                    error={Boolean(touched.purchaseRate && errors.purchaseRate)}
                                    sx={{ ...theme.typography.customInput }}
                                >
                                    <InputLabel> TID </InputLabel>
                                    <OutlinedInput
                                        id="purchaseRate"
                                        name="purchaseRate"
                                        type="number"
                                        value={values.purchaseRate}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        label="TID"
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
                                    <InputLabel> Expiry Date </InputLabel>
                                    <OutlinedInput
                                        id="validity"
                                        name="validity"
                                        type="date"
                                        value={values.validity}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        label="Expriy Date"
                                        inputProps={{}}
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
                                <SimpleButton isValid={!isValid} title="Add Package" />
                            </Grid>
                        </Box>
                    </form>
                )}
            </Formik>
        </>
    );
}

export default AddEntry;
