import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Alert, Button, FormControl, Grid, InputLabel, MenuItem, OutlinedInput, Select } from '@mui/material';
import { THEME_COLOR_DARK, THEME_COLOR_LIGHT } from 'utils/Constants';
import { useState } from 'react';
import { useEffect } from 'react';
import jwt from 'jwtservice/jwtService';
import moment from 'moment';
import { getPaymentMethodNameByKey } from 'utils/Functions';
import TotalIncomeDarkCard from 'views/dashboard/Default/TotalIncomeDarkCard';

function createData(sr, entryDate, userId, packageName, paymentMethod, tid, saleRate, expiryDate) {
    return { sr, entryDate, userId, packageName, paymentMethod, tid, saleRate, expiryDate };
}

const deletePackage = (id) => {
    console.log(id);
};

const DeleteButton = ({ id }) => {
    return (
        <Button variant="contained" color="error" onClick={() => deletePackage(id)}>
            Delete
        </Button>
    );
};

export default function AllEntries() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [rows, setRows] = useState([]);

    const [isps, setIsps] = useState([]);
    const [ispSelected, setIspSelected] = useState('');
    const [startDate, setStartDate] = useState(moment(new Date()).format('YYYY-MM-DD'));
    const [endDate, setEndDate] = useState(moment(new Date()).format('YYYY-MM-DD'));
    const [total, setTotal] = useState(0);
    const [colorBg, setColorBg] = useState(THEME_COLOR_LIGHT);

    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const style = { backgroundColor: colorBg, color: 'white' };

    useEffect(() => {
        getIsps();
    }, []);

    useEffect(() => {
        ispSelected !== '' && getEntries();
    }, [startDate, endDate, ispSelected]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const getEntries = () => {
        setIsLoading(true);
        jwt.getAllCompletedEntries({
            isp: ispSelected,
            startDate: startDate,
            endDate: startDate !== endDate ? endDate : ''
        })
            .then((res) => {
                let rowsData = [];
                res?.data?.entries?.map((item, index) =>
                    rowsData.push(
                        createData(
                            index + 1,
                            moment(item?.entryDate).format('DD/MM/YYYY'),
                            item?.userId,
                            item?.package?.name,
                            getPaymentMethodNameByKey(item?.paymentMethod),
                            item?.tid,
                            item?.saleRate,
                            moment(item?.expiryDate).format('DD/MM/YYYY')
                        )
                    )
                );
                setRows(rowsData);
                setTotal(res?.data?.total);
                setColorBg(res?.data?.entries[0]?.isp?.color);
                setIsLoading(false);
                setIsError(false);
            })
            .catch((err) => {
                setErrorMessage(err?.response?.data?.message);
                setIsError(true);
                setIsLoading(false);
            });
    };

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
                    <Grid item xs={12} sm={12} md={6} lg={6}>
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
                </Grid>
            </form>
            <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={12} sm={12} md={3} lg={3}>
                    <TotalIncomeDarkCard isLoading={false} total={total} />
                </Grid>
            </Grid>
            <Paper sx={{ width: '100%', overflow: 'hidden', mt: 5 }}>
                {isLoading && <h3>Loading...!</h3>}
                {isError ? (
                    <Alert severity="error">{errorMessage}</Alert>
                ) : ispSelected === '' ? (
                    <Alert severity="error">Please Select an ISP</Alert>
                ) : (
                    !isLoading && (
                        <>
                            <TableContainer sx={{ maxHeight: 440 }}>
                                <Table stickyHeader aria-label="sticky table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell style={style}>Sr.</TableCell>
                                            <TableCell style={style}>Date</TableCell>
                                            <TableCell style={style}>User Id</TableCell>
                                            <TableCell style={style}>Package</TableCell>
                                            <TableCell style={style}>Payment Method</TableCell>
                                            <TableCell style={style}>TID</TableCell>
                                            <TableCell style={style}>Amount</TableCell>
                                            <TableCell style={style}>Expiry Date</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                                            return (
                                                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                                    <TableCell>{index + 1}</TableCell>
                                                    <TableCell>{row?.entryDate}</TableCell>
                                                    <TableCell>{row?.userId}</TableCell>
                                                    <TableCell>{row?.packageName}</TableCell>
                                                    <TableCell>{row?.paymentMethod}</TableCell>
                                                    <TableCell>{row?.tid}</TableCell>
                                                    <TableCell>{row?.saleRate}</TableCell>
                                                    <TableCell>{row?.expiryDate}</TableCell>
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
