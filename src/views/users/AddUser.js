import { Checkbox, FormControl, FormControlLabel, FormHelperText, Grid, InputLabel, OutlinedInput } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/system';
import { Formik } from 'formik';
import SimpleButton from 'ui-component/SimpleButton';

import { AddUserValidationSchema } from '../../utils/ValidationSchemas';

const onSubmit = (values) => {
    console.log('values');
    console.log(values);
};

function AddUser() {
    const theme = useTheme();

    // const { ispId, color } = useLocation().state;
    const initialValues = {
        fullname: '',
        userId: '',
        cnic: '',
        mobile: '',
        address: ''
    };

    return (
        <>
            <h3>Add User Details</h3>
            <Formik initialValues={initialValues} validationSchema={AddUserValidationSchema} onSubmit={onSubmit}>
                {({ values, errors, isValid, touched, handleChange, handleBlur, handleSubmit, setFieldValue }) => (
                    <form onSubmit={handleSubmit}>
                        <FormControl
                            fullWidth
                            error={Boolean(touched.fullname && errors.fullname)}
                            sx={{ ...theme.typography.customInput }}
                        >
                            <InputLabel> Full Name </InputLabel>
                            <OutlinedInput
                                id="fullname"
                                name="fullname"
                                type="text"
                                value={values.fullname}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                label="Full Name"
                                inputProps={{}}
                            />
                            {touched.fullname && errors.fullname && (
                                <FormHelperText error id="standard-weight-helper-text-name">
                                    {errors.fullname}
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
                                    />
                                    {touched.userId && errors.userId && (
                                        <FormHelperText error id="standard-weight-helper-text-bandwidth">
                                            {errors.userId}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl
                                    fullWidth
                                    error={Boolean(touched.cnic && errors.cnic)}
                                    sx={{ ...theme.typography.customInput }}
                                >
                                    <InputLabel> CNIC </InputLabel>
                                    <OutlinedInput
                                        id="cnic"
                                        name="cnic"
                                        type="text"
                                        value={values.cnic}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        label="User Id"
                                        inputProps={{ min: 0 }}
                                    />
                                    {touched.cnic && errors.cnic && (
                                        <FormHelperText error id="standard-weight-helper-text-bandwidth">
                                            {errors.cnic}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <FormControl
                                    fullWidth
                                    error={Boolean(touched.mobile && errors.mobile)}
                                    sx={{ ...theme.typography.customInput }}
                                >
                                    <InputLabel> Mobile </InputLabel>
                                    <OutlinedInput
                                        id="mobile"
                                        name="mobile"
                                        type="text"
                                        value={values.mobile}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        label="User Id"
                                        inputProps={{ min: 0 }}
                                    />
                                    {touched.mobile && errors.mobile && (
                                        <FormHelperText error id="standard-weight-helper-text-bandwidth">
                                            {errors.mobile}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl
                                    fullWidth
                                    error={Boolean(touched.address && errors.address)}
                                    sx={{ ...theme.typography.customInput }}
                                >
                                    <InputLabel> Address </InputLabel>
                                    <OutlinedInput
                                        id="address"
                                        name="address"
                                        type="text"
                                        value={values.address}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        label="address"
                                        inputProps={{ min: 0 }}
                                    />
                                    {touched.address && errors.address && (
                                        <FormHelperText error id="standard-weight-helper-text-purchase-rate">
                                            {errors.address}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                        </Grid>
                        <FormControlLabel control={<Checkbox />} label="Send Welcome Message" />
                        <Box sx={{ mt: 2 }}>
                            <Grid sx={{ width: '100%' }}>
                                <SimpleButton isValid={!isValid} title="Add User" />
                            </Grid>
                        </Box>
                    </form>
                )}
            </Formik>
        </>
    );
}

export default AddUser;
