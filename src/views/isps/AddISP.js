import { FormControl, FormHelperText, Grid, InputLabel, OutlinedInput } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/system';
import { Field, Formik } from 'formik';
import { CirclePicker } from 'react-color';
import SimpleButton from 'ui-component/SimpleButton';

import { AddISPValidationSchema } from '../../utils/ValidationSchemas';

const initialValues = {
    name: '',
    vlan: '',
    color: ''
};

const onSubmit = (values) => {
    console.log('values');
    console.log(values);
};

function AddISP() {
    const theme = useTheme();

    return (
        <>
            <h3>Add ISP Details</h3>
            <Formik initialValues={initialValues} validationSchema={AddISPValidationSchema} onSubmit={onSubmit}>
                {({ values, errors, isValid, touched, handleChange, handleBlur, handleSubmit, setFieldValue }) => (
                    <form onSubmit={handleSubmit}>
                        <FormControl fullWidth error={Boolean(touched.name && errors.name)} sx={{ ...theme.typography.customInput }}>
                            <InputLabel> ISP Name </InputLabel>
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
                                <FormHelperText error id="standard-weight-helper-text-isp-name">
                                    {errors.name}
                                </FormHelperText>
                            )}
                        </FormControl>
                        <FormControl fullWidth error={Boolean(touched.vlan && errors.vlan)} sx={{ ...theme.typography.customInput }}>
                            <InputLabel> ISP VLAN </InputLabel>
                            <OutlinedInput
                                id="vlan"
                                name="vlan"
                                type="number"
                                value={values.vlan}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                label="ISP VLAN"
                                inputProps={{}}
                            />
                            {touched.vlan && errors.vlan && (
                                <FormHelperText error id="standard-weight-helper-text-isp-vlan">
                                    {errors.vlan}
                                </FormHelperText>
                            )}
                        </FormControl>
                        <div style={{ marginTop: '10px' }}>
                            <Field name="color">
                                {({ field, meta }) => (
                                    <div>
                                        <label htmlFor="color">Select a color:</label>
                                        <CirclePicker
                                            id="color"
                                            name="color"
                                            {...field}
                                            onChange={(color) => {
                                                setFieldValue('color', color.hex);
                                            }}
                                        />
                                        {meta.touched && meta.error && (
                                            <FormHelperText error id="standard-weight-helper-text-isp-vlan">
                                                {meta.error}
                                            </FormHelperText>
                                        )}
                                    </div>
                                )}
                            </Field>
                        </div>
                        <Box sx={{ mt: 2 }}>
                            <Grid sx={{ width: '120px' }}>
                                <SimpleButton isValid={!isValid} title="Add ISP" />
                            </Grid>
                        </Box>
                    </form>
                )}
            </Formik>
        </>
    );
}

export default AddISP;
