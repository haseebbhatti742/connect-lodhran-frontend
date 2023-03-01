import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Alert, Button, FormControl, Grid, InputLabel, MenuItem, OutlinedInput, Select } from '@mui/material';
import { THEME_COLOR_LIGHT } from 'utils/Constants';
import { useState } from 'react';
import { useEffect } from 'react';
import jwt from 'jwtservice/jwtService';
import moment from 'moment';
import { getPaymentMethodNameByKey } from 'utils/Functions';

const columns = [
    { id: 'sr', label: 'Sr.', minWidth: 170 },
    { id: 'isp', label: 'Isp', minWidth: 170 },
    { id: 'userId', label: '\u00a0User Id', minWidth: 100 },
    {
        id: 'packageName',
        label: 'Package',
        minWidth: 170,
        align: 'left',
        format: (value) => value.toLocaleString('en-US')
    },
    {
        id: 'paymentMethod',
        label: 'Payment Method\u00a0',
        minWidth: 170,
        align: 'left',
        format: (value) => value.toLocaleString('en-US')
    },
    {
        id: 'tid',
        label: 'TID',
        minWidth: 170,
        align: 'left',
        format: (value) => value.toFixed(2)
    },
    {
        id: 'saleRate',
        label: 'Sale Rate',
        minWidth: 170,
        align: 'left',
        format: (value) => value.toFixed(2)
    },
    {
        id: 'expiryDate',
        label: 'Expiry Date',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toFixed(2)
    }
];

function createData(sr, isp, userId, packageName, paymentMethod, tid, saleRate, expiryDate) {
    return { sr, isp, userId, packageName, paymentMethod, tid, saleRate, expiryDate };
}

const deletePackage = (id) => {
    console.log(id);
};

// eslint-disable-next-line
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
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    useEffect(() => {
        getEntries();
        getIsps();
    }, []);

    const getEntries = () => {
        setIsLoading(true);
        jwt.getAllCompletedEntries()
            .then((res) => {
                let rowsData = [];
                res?.data?.map((item, index) =>
                    rowsData.push(
                        createData(
                            index + 1,
                            item?.isp?.name,
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
                console.log('All Isps Result');
                console.log(res);
                setIsps(res?.data);
                setIsLoading(false);
                setIsError(false);
            })
            .catch((err) => {
                console.log('All Isps Error');
                console.log(err);
                setErrorMessage(err?.response?.data?.message);
                setIsError(true);
                setIsLoading(false);
            });
    };

    return (
        <>
            <form>
                <Grid container spacing={2} sx={{ mb: 2 }}>
                    <Grid item xs={6}>
                        <InputLabel> Select Start Date </InputLabel>
                        <OutlinedInput id="validity" name="validity" type="date" label="Date" inputProps={{}} sx={{ mr: 2 }} />
                    </Grid>
                    <Grid item xs={6}>
                        <InputLabel> Select End Date </InputLabel>
                        <OutlinedInput id="validity" name="validity" type="date" label="Date" inputProps={{}} sx={{ mr: 2 }} />
                    </Grid>
                </Grid>

                <FormControl sx={{ width: '100%' }}>
                    <InputLabel> Select ISP </InputLabel>
                    <Select
                        id="isp"
                        name="isp"
                        type="text"
                        value={ispSelected}
                        onChange={(event) => setIspSelected(event.target.value)}
                        label="Select ISP"
                        sx={{ paddingTop: '15px' }}
                    >
                        <MenuItem value="Wateen">Wateen</MenuItem>
                        {isps.map((isp) => (
                            <MenuItem value={isp.id}>{isp.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </form>
            <Paper sx={{ width: '100%', overflow: 'hidden', mt: 5 }}>
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
                                            {columns.map((column) => (
                                                <TableCell
                                                    key={column.id}
                                                    align={column.align}
                                                    style={{
                                                        minWidth: column.minWidth,
                                                        backgroundColor: THEME_COLOR_LIGHT,
                                                        color: 'white'
                                                    }}
                                                >
                                                    {column.label}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                            return (
                                                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                                    {columns.map((column) => {
                                                        const value = row[column.id];
                                                        return (
                                                            <TableCell key={column.id} align={column.align}>
                                                                {column.format && typeof value === 'number' ? column.format(value) : value}
                                                            </TableCell>
                                                        );
                                                    })}
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
