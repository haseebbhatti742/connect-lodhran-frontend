import { FormControl, Grid, InputLabel, MenuItem, OutlinedInput, Select } from '@mui/material';
import jwt from 'jwtservice/jwtService';
import moment from 'moment';
import { useEffect } from 'react';
import { useState } from 'react';
import { PAYMENT_METHODS } from 'utils/Constants';

const SendInvoice = () => {
    const [isps, setIsps] = useState([]);

    const [ispSelected, setIspSelected] = useState('');
    const [date, setDate] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');

    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        getIsps();
    }, []);

    const getIsps = () => {
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
    };

    return (
        <>
            <form style={{ marginTop: '15px' }}>
                {JSON.stringify()}
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <InputLabel> Select ISP </InputLabel>
                            <Select
                                id="isp"
                                name="isp"
                                type="text"
                                value={ispSelected}
                                onChange={(event) => setIspSelected(event.target.value)}
                                label="Select ISP"
                            >
                                {isps.map((isp, index) => (
                                    <MenuItem key={index} value={isp.id}>
                                        {isp.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <InputLabel> Date </InputLabel>
                            <OutlinedInput
                                id="date"
                                name="date"
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                label="Date"
                            />
                        </FormControl>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <InputLabel> Select Payment Method </InputLabel>
                            <Select
                                id="paymentMethod"
                                name="paymentMethod"
                                type="text"
                                value={paymentMethod}
                                onChange={(event) => setPaymentMethod(event.target.value)}
                                label="Select Payment Method"
                                sx={{ paddingTop: '15px' }}
                            >
                                {PAYMENT_METHODS.map((item) => (
                                    <MenuItem value={item.key}>{item.value}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </form>
        </>
    );
};

export default SendInvoice;
