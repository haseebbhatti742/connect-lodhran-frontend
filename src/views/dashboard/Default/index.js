import { useEffect, useState } from 'react';

// material-ui
import { Grid, MenuItem, Select } from '@mui/material';

// project imports
import EarningCard from './EarningCard';
import PopularCard from './PopularCard';
import TotalOrderLineChartCard from './TotalOrderLineChartCard';
import TotalIncomeDarkCard from './TotalIncomeDarkCard';
import TotalIncomeLightCard from './TotalIncomeLightCard';
import TotalGrowthBarChart from './TotalGrowthBarChart';
import { gridSpacing } from 'store/constant';
import IspGrandSummaryCard from './IspGrandSummaryCard';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
    const [isLoading, setLoading] = useState(false);

    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
    const startYear = 2020;
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: currentYear - startYear + 1 }, (_, index) => startYear + index);

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        <Grid container spacing={2}>
                            <Grid item sm={3} xs={3} md={3} lg={3}>
                                <Select
                                    fullWidth
                                    sx={{ height: '100%' }}
                                    value={selectedMonth}
                                    onChange={(event) => setSelectedMonth(event.target.value)}
                                >
                                    <MenuItem value="1">January</MenuItem>
                                    <MenuItem value="2">February</MenuItem>
                                    <MenuItem value="3">March</MenuItem>
                                    <MenuItem value="4">April</MenuItem>
                                    <MenuItem value="5">May</MenuItem>
                                    <MenuItem value="6">June</MenuItem>
                                    <MenuItem value="7">July</MenuItem>
                                    <MenuItem value="8">August</MenuItem>
                                    <MenuItem value="9">September</MenuItem>
                                    <MenuItem value="10">Ocotber</MenuItem>
                                    <MenuItem value="11">November</MenuItem>
                                    <MenuItem value="12">December</MenuItem>
                                </Select>
                            </Grid>
                            <Grid item sm={3} xs={3} md={3} lg={3}>
                                <Select
                                    fullWidth
                                    sx={{ height: '100%' }}
                                    value={selectedYear}
                                    onChange={(event) => setSelectedYear(event.target.value)}
                                >
                                    {years.map((year) => (
                                        <MenuItem key={year} value={year}>
                                            {year}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </Grid>
                            <Grid item sm={6} xs={6} md={6} lg={6}>
                                <TotalIncomeDarkCard isLoading={isLoading} title="Total Profit" total={23000} />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container item spacing={2}>
                        <Grid item sm={3} xs={3} md={3} lg={3}>
                            <TotalIncomeDarkCard isLoading={isLoading} title="Total Income" total={23000} />
                        </Grid>
                        <Grid item sm={3} xs={3} md={3} lg={3}>
                            <TotalIncomeLightCard isLoading={isLoading} title="Total Entry" total={23000} />
                        </Grid>
                        <Grid item sm={3} xs={3} md={3} lg={3}>
                            <TotalIncomeDarkCard isLoading={isLoading} title="Total Invoice" total={23000} />
                        </Grid>
                        <Grid item sm={3} xs={3} md={3} lg={3}>
                            <TotalIncomeLightCard isLoading={isLoading} title="Total Balance" total={23000} />
                        </Grid>
                    </Grid>
                    <>
                        <Grid item lg={4} md={6} sm={6} xs={12}>
                            <IspGrandSummaryCard isLoading={isLoading} />
                        </Grid>
                    </>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Dashboard;
