import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Alert, Button, Grid } from '@mui/material';
import { STAFF_TYPES, THEME_COLOR_DARK } from 'utils/Constants';
import { useState } from 'react';
import { useEffect } from 'react';
import jwt from 'jwtservice/jwtService';
import moment from 'moment';
import { getPaymentMethodNameByKey } from 'utils/Functions';
import { useNavigate } from 'react-router';
import TotalIncomeDarkCard from 'views/dashboard/Default/TotalIncomeDarkCard';

function createData(id, staff, paymentMethod, tid, amount, date, details, status) {
    return { id, staff, paymentMethod, tid, amount, date, details, status };
}

export default function PendingExpenses() {
    const navigate = useNavigate();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [rows, setRows] = useState([]);

    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
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
        getPendingExpenses();
    }, []);

    const getPendingExpenses = () => {
        setIsLoading(true);
        jwt.getPendingExpenses()
            .then((res) => {
                console.log(res);
                let rowsData = [];
                res?.data?.expenses?.map((item) =>
                    rowsData.push(
                        createData(
                            item?.id,
                            item?.staff?.fullname,
                            getPaymentMethodNameByKey(item?.paymentMethod),
                            item?.tid,
                            item?.amount,
                            moment(item?.date).format('DD/MM/YYYY'),
                            item?.details,
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

    const deleteExpense = (id) => {
        setIsLoading(true);
        jwt.deleteExpense(id)
            .then((res) => {
                setIsLoading(false);
                setIsError(false);
                alert('Expense Deleted');
                navigate('/dashboard/completed-expenses');
            })
            .catch((err) => {
                setErrorMessage(err?.response?.data?.message);
                setIsError(true);
                setIsLoading(false);
            });
    };

    const approveExpense = (id) => {
        setIsLoading(true);
        jwt.approveExpense(id)
            .then((res) => {
                setIsLoading(false);
                setIsError(false);
                alert('Expense Approved');
                navigate(-1);
            })
            .catch((err) => {
                setErrorMessage(err?.response?.data?.message);
                setIsError(true);
                setIsLoading(false);
            });
    };

    const DeleteButton = ({ id }) => {
        return (
            <Button variant="contained" color="error" onClick={() => deleteExpense(id)}>
                Delete
            </Button>
        );
    };

    const ApproveButton = ({ id }) => {
        return (
            <Button variant="contained" color="warning" onClick={() => approveExpense(id)}>
                Approve
            </Button>
        );
    };

    return (
        <>
            <Grid container spacing={2} sx={{ mt: 1, mb: 2 }}>
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
                                            <TableCell style={style}>Amount</TableCell>
                                            <TableCell style={style}>Payment Method</TableCell>
                                            <TableCell style={style}>TID/Cheque#</TableCell>
                                            <TableCell style={style}>Staff</TableCell>
                                            {jwt.getUser()?.type === STAFF_TYPES.admin && (
                                                <TableCell colSpan={2} style={style} align="center">
                                                    Action
                                                </TableCell>
                                            )}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                                            return (
                                                <TableRow tabIndex={-1} key={index}>
                                                    <TableCell>{index + 1}</TableCell>
                                                    <TableCell>{row?.date}</TableCell>
                                                    <TableCell>{row?.details}</TableCell>
                                                    <TableCell>{row?.amount}</TableCell>
                                                    <TableCell>{row?.paymentMethod}</TableCell>
                                                    <TableCell>{row?.tid}</TableCell>
                                                    <TableCell>{row?.staff}</TableCell>
                                                    {jwt.getUser()?.type === STAFF_TYPES.admin && (
                                                        <>
                                                            <TableCell>
                                                                <ApproveButton id={row?.id} />
                                                            </TableCell>
                                                            <TableCell>
                                                                <DeleteButton id={row?.id} />
                                                            </TableCell>
                                                        </>
                                                    )}
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
