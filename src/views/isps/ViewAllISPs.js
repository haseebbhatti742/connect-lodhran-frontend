import { useState, useEffect } from 'react';
import { gridSpacing } from 'store/constant';

// material-ui
import { Grid } from '@mui/material';

// project imports
import ISPCard from 'views/isps/ISPCard';
import jwt from 'jwtservice/jwtService';

function ViewAllISPs() {
    const [isps, setIsps] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        setLoading(true);
        jwt.getAllIsps()
            .then((res) => {
                setIsps(res?.data);
                setLoading(false);
            })
            .catch((err) => {
                setErrorMessage(err?.response?.data?.message);
                setIsError(true);
                setLoading(false);
            });
    }, []);

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    {isError ? (
                        <Grid item lg={4} md={4} sm={4} xs={12}>
                            <h3 style={{ color: 'black' }}>{errorMessage}</h3>
                        </Grid>
                    ) : (
                        <>
                            {isps.map((isp, index) => (
                                <Grid item lg={4} md={4} sm={4} xs={12}>
                                    <ISPCard key={index} isp={isp} isLoading={isLoading} />
                                </Grid>
                            ))}
                        </>
                    )}
                    {/* <Grid item lg={4} md={6} sm={6} xs={12}>
                        <TotalOrderLineChartCard isLoading={isLoading} />
                    </Grid>
                    <Grid item lg={4} md={12} sm={12} xs={12}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item sm={6} xs={12} md={6} lg={12}>
                                <TotalIncomeDarkCard isLoading={isLoading} />
                            </Grid>
                            <Grid item sm={6} xs={12} md={6} lg={12}>
                                <TotalIncomeLightCard isLoading={isLoading} />
                            </Grid>
                        </Grid>
                    </Grid> */}
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} md={8}>
                        {/* <TotalGrowthBarChart isLoading={isLoading} /> */}
                    </Grid>
                    <Grid item xs={12} md={4}>
                        {/* <PopularCard isLoading={isLoading} /> */}
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default ViewAllISPs;
