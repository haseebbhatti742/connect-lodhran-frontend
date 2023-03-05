import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Alert, Button } from '@mui/material';
import { THEME_COLOR_DARK } from 'utils/Constants';
import { useState } from 'react';
import { useEffect } from 'react';
import jwt from 'jwtservice/jwtService';
import moment from 'moment';
import { getPaymentMethodNameByKey } from 'utils/Functions';
import { useNavigate } from 'react-router';

function createData(isp, entryDate, userId, packageName, paymentMethod, saleRate, expiryDate, action) {
    return { isp, entryDate, userId, packageName, paymentMethod, saleRate, expiryDate, action };
}

export default function PendingEntries() {
    const navigate = useNavigate();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [rows, setRows] = useState([]);

    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const style = { backgroundColor: THEME_COLOR_DARK, color: 'white' };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    useEffect(() => {
        getEntry();
    }, []);

    const getEntry = () => {
        setIsLoading(true);
        jwt.getAllPendingEntries()
            .then((res) => {
                let rowsData = [];
                res?.data?.map((item) =>
                    rowsData.push(
                        createData(
                            item?.isp?.name,
                            moment(item?.entryDate).format('DD/MM/YYYY'),
                            item?.userId,
                            item?.package?.name,
                            getPaymentMethodNameByKey(item?.paymentMethod),
                            item?.package?.saleRate,
                            moment(item?.expiryDate).format('DD/MM/YYYY'),
                            <CompletePaymentButton id={item?.id} />
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

    const deletePackage = (id) => {
        console.log(id);
    };

    const completePayment = (id) => {
        navigate(`/dashboard/complete-payment/${id}`);
    };

    const DeleteButton = ({ id }) => {
        return (
            <Button variant="contained" color="error" onClick={() => deletePackage(id)}>
                Delete
            </Button>
        );
    };

    const CompletePaymentButton = ({ id }) => {
        return (
            <Button variant="contained" color="warning" onClick={() => completePayment(id)}>
                Pay
            </Button>
        );
    };

    return (
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
                                        <TableCell style={style}>ISP</TableCell>
                                        <TableCell style={style}>User Id</TableCell>
                                        <TableCell style={style}>Package</TableCell>
                                        <TableCell style={style}>Payment Method</TableCell>
                                        <TableCell style={style}>Amount</TableCell>
                                        <TableCell style={style}>Expiry Date</TableCell>
                                        <TableCell style={style}>Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                                <TableCell>{index + 1}</TableCell>
                                                <TableCell>{row?.entryDate}</TableCell>
                                                <TableCell>{row?.isp}</TableCell>
                                                <TableCell>{row?.userId}</TableCell>
                                                <TableCell>{row?.packageName}</TableCell>
                                                <TableCell>{row?.paymentMethod}</TableCell>
                                                <TableCell>{row?.saleRate}</TableCell>
                                                <TableCell>{row?.expiryDate}</TableCell>
                                                <TableCell>{row?.action}</TableCell>
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
    );
}
