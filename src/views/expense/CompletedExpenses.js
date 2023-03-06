import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Alert, FormControl, Grid, InputLabel, OutlinedInput } from '@mui/material';
import { THEME_COLOR_DARK, THEME_COLOR_TINT } from 'utils/Constants';
import { useState } from 'react';
import { useEffect } from 'react';
import jwt from 'jwtservice/jwtService';
import moment from 'moment';
import { getPaymentMethodNameByKey } from 'utils/Functions';
import { useNavigate } from 'react-router';
import TotalIncomeDarkCard from 'views/dashboard/Default/TotalIncomeDarkCard';

function createData(staff, paymentMethod, tid, amount, date, details, spentBy, status) {
    return { staff, paymentMethod, tid, amount, date, details, spentBy, status };
}

export default function CompletedExpenses() {
    const navigate = useNavigate();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [rows, setRows] = useState([]);

    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const [startDate, setStartDate] = useState(moment(new Date()).format('YYYY-MM-DD'));
    const [endDate, setEndDate] = useState(moment(new Date()).format('YYYY-MM-DD'));
    const [total, setTotal] = useState(0);

    const style = { backgroundColor: THEME_COLOR_DARK, color: 'white' };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    useEffect(() => {
        getCompletedExpenses();
    }, [startDate, endDate]);

    const getCompletedExpenses = () => {
        setIsLoading(true);
        jwt.getCompletedExpenses({
            startDate: startDate,
            endDate: startDate !== endDate ? endDate : ''
        })
            .then((res) => {
                console.log(res);
                let rowsData = [];
                res?.data?.expenses?.map((item) =>
                    rowsData.push(
                        createData(
                            item?.staff?.fullname,
                            getPaymentMethodNameByKey(item?.paymentMethod),
                            item?.tid,
                            item?.amount,
                            moment(item?.date).format('DD/MM/YYYY'),
                            item?.details,
                            item?.spentBy,
                            item?.status
                        )
                    )
                );
                setRows(rowsData);
                setTotal(res?.data?.total);
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
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={3} lg={3}>
                        <FormControl fullWidth>
                            <InputLabel> Start Date </InputLabel>
                            <OutlinedInput
                                id="startDate"
                                name="startDate"
                                type="date"
                                value={moment(startDate).format('YYYY-MM-DD')}
                                onChange={(e) => setStartDate(e.target.value)}
                                label="Start Date"
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12} md={3} lg={3}>
                        <FormControl fullWidth>
                            <InputLabel> End Date </InputLabel>
                            <OutlinedInput
                                id="endDate"
                                name="endDate"
                                type="date"
                                value={moment(endDate).format('YYYY-MM-DD')}
                                onChange={(e) => setEndDate(e.target.value)}
                                label="End Date"
                            />
                        </FormControl>
                    </Grid>
                </Grid>
            </form>
            <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={12} sm={12} md={3} lg={3}>
                    <TotalIncomeDarkCard isLoading={false} title="Total Expense" total={total} />
                </Grid>
            </Grid>
            <Paper sx={{ width: '100%', overflow: 'hidden', mt: 4 }}>
                {isLoading && <h3>Loading...!</h3>}
                {isError ? (
                    <Alert severity="error">{errorMessage}</Alert>
                ) : (
                    !isLoading && (
                        <>
                            <TableContainer sx={{ maxHeight: 440 }}>
                                <Table stickyHeader aria-label="sticky table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell style={style}>Sr.</TableCell>
                                            <TableCell style={style}>Date</TableCell>
                                            <TableCell style={style}>Details</TableCell>
                                            <TableCell style={style}>Spent By</TableCell>
                                            <TableCell style={style}>Amount</TableCell>
                                            <TableCell style={style}>Payment Method</TableCell>
                                            <TableCell style={style}>TID/Cheque#</TableCell>
                                            <TableCell style={style}>Staff</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                                            return (
                                                <TableRow
                                                    role="checkbox"
                                                    tabIndex={-1}
                                                    key={index}
                                                    sx={{ backgroundColor: row?.status === 'pending' ? '#FDDA0D' : 'white' }}
                                                >
                                                    <TableCell>{index + 1}</TableCell>
                                                    <TableCell>{row?.date}</TableCell>
                                                    <TableCell>{row?.details}</TableCell>
                                                    {typeof row?.spentBy === 'string' ? (
                                                        <TableCell>Company</TableCell>
                                                    ) : (
                                                        <TableCell>{row?.spentBy?.fullname}</TableCell>
                                                    )}
                                                    <TableCell>{row?.status !== 'pending' ? row?.amount : 0}</TableCell>
                                                    <TableCell>{row?.paymentMethod}</TableCell>
                                                    <TableCell>{row?.tid}</TableCell>
                                                    <TableCell>{row?.staff}</TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <TablePagination
                                rowsPerPageOptions={[10, 25, 100]}
                                component="div"
                                count={rows.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </>
                    )
                )}
            </Paper>
        </>
    );
}
