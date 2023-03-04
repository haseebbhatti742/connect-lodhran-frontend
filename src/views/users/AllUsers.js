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

function createData(sr, name, userId, cnic, mobile, email, address, action) {
    return { sr, name, userId, cnic, mobile, email, address, action };
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

export default function AllUsers() {
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
        setIsLoading(true);
        jwt.getAllUsers()
            .then((res) => {
                setIsLoading(false);
                let rowsData = [];
                res?.data?.map((item, index) =>
                    rowsData.push(
                        createData(
                            index + 1,
                            item?.fullname,
                            item?.userId,
                            item?.cnic,
                            item?.mobile,
                            item?.email,
                            item?.address,
                            <DeleteButton id={item?.id} />
                        )
                    )
                );
                setRows(rowsData);
            })
            .catch((err) => {
                setErrorMessage(err?.response?.data?.message);
                setIsError(true);
                setIsLoading(false);
            });
    }, []);

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            {isLoading && <h3>Loading...!</h3>}
            {isError ? (
                <Alert severity="error">{errorMessage}</Alert>
            ) : (
                <>
                    <TableContainer sx={{ maxHeight: 440 }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <TableCell style={style}>Sr.</TableCell>
                                    <TableCell style={style}>Name</TableCell>
                                    <TableCell style={style}>User Id</TableCell>
                                    <TableCell style={style}>CNIC</TableCell>
                                    <TableCell style={style}>Mobile</TableCell>
                                    <TableCell style={style}>Email</TableCell>
                                    <TableCell style={style}>Address</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                            <TableCell>{row?.sr}</TableCell>
                                            <TableCell>{row?.name}</TableCell>
                                            <TableCell>{row?.userId}</TableCell>
                                            <TableCell>{row?.cnic}</TableCell>
                                            <TableCell>{row?.mobile}</TableCell>
                                            <TableCell>{row?.email}</TableCell>
                                            <TableCell>{row?.address}</TableCell>
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
            )}
        </Paper>
    );
}
