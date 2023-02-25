import { useState, useEffect } from 'react';
import { gridSpacing } from 'store/constant';

// material-ui
import { Grid } from '@mui/material';

// project imports
import ISPCard from 'views/isps/ISPCard';

const ISPS = [
    {
        id: 1,
        name: 'GetLinks',
        vlan: 150,
        totalUsers: 1500,
        color: '#00b050'
    },
    {
        id: 2,
        name: 'Connect',
        vlan: 160,
        totalUsers: 3000,
        color: '#ffa500'
    },
    {
        id: 3,
        name: 'Transworld',
        vlan: 170,
        totalUsers: 900,
        color: '#4472c4'
    },
    {
        id: 4,
        name: 'Wateen',
        vlan: 180,
        totalUsers: 2100,
        color: '#70ad47'
    }
];

function ViewAllISPs() {
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
    }, []);

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    {ISPS.map((isp, index) => (
                        <Grid item lg={4} md={4} sm={4} xs={12}>
                            <ISPCard key={index} isp={isp} isLoading={isLoading} />
                        </Grid>
                    ))}
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
