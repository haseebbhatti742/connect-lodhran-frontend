import { useEffect, useState } from 'react';

// material-ui
import { Divider, Grid, MenuItem, Select } from '@mui/material';

// project imports
import TotalIncomeDarkCard from './TotalIncomeDarkCard';
import { gridSpacing } from 'store/constant';
import IspGrandSummaryCard from './IspGrandSummaryCard';
import jwt from 'jwtservice/jwtService';
import RemainingProfitCard from './RemainingProfitCard';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
    const [isLoading, setLoading] = useState(false);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
    const [ispsData, setIspsData] = useState([]);
    const [totalIncome, setTotalIncome] = useState(0);
    const [companyExpense, setCompanyExpense] = useState(0);
    const [companyProfit, setCompanyProfit] = useState(0);
    const [partnersExpense, setPartnersExpense] = useState(0);
    const [totalRemainingProfit, setTotalRemainingProfit] = useState(0);

    const startYear = 2020;
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: currentYear - startYear + 1 }, (_, index) => startYear + index);

    useEffect(() => {
        if (selectedMonth && selectedYear) {
            getSummary(selectedMonth, selectedYear);
        }
    }, [selectedMonth, selectedYear]);

    const getSummary = (month, year) => {
        setLoading(true);
        jwt.getSummary({ month, year })
            .then((res) => {
                console.log(res);
                setIspsData(res?.data?.data);
                setTotalIncome(res?.data?.totalIncome);
                setCompanyExpense(res?.data?.companyExpense);
                setCompanyProfit(res?.data?.companyProfit);
                setPartnersExpense(res?.data?.partnersExpense);
                setTotalRemainingProfit(res?.data?.totalRemainingProfit);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    };

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
                        </Grid>
                    </Grid>
                    <>
                        {ispsData.map((data, index) => (
                            <Grid key={index} item xl={3} lg={4} md={4} sm={6} xs={12}>
                                <IspGrandSummaryCard isLoading={isLoading} data={data} />
                            </Grid>
                        ))}
                    </>
                    <Grid container item spacing={2}>
                        <Grid item sm={3} xs={3} md={3} lg={3}>
                            <TotalIncomeDarkCard isLoading={isLoading} title="Total Income" total={totalIncome} />
                        </Grid>
                        <Grid item sm={3} xs={3} md={3} lg={3}>
                            <TotalIncomeDarkCard isLoading={isLoading} title="Company Expense" total={companyExpense} />
                        </Grid>
                        <Grid item sm={3} xs={3} md={3} lg={3}>
                            <TotalIncomeDarkCard isLoading={isLoading} title="Company Profit" total={companyProfit} />
                        </Grid>
                        <Grid item sm={3} xs={3} md={3} lg={3}>
                            <TotalIncomeDarkCard isLoading={isLoading} title="Partners Expense" total={partnersExpense} />
                        </Grid>
                    </Grid>
                    <Grid container item spacing={2}>
                        <Grid item sm={12} xs={12} md={3} lg={12}>
                            <RemainingProfitCard
                                color="red"
                                isLoading={isLoading}
                                title="Total Remaining Profit"
                                total={totalRemainingProfit}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Dashboard;
