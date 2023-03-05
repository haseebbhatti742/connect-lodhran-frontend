import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Alert, Button } from '@mui/material';
import { STAFF_TYPES, THEME_COLOR_LIGHT } from 'utils/Constants';
import { useState } from 'react';
import { useEffect } from 'react';
import jwt from 'jwtservice/jwtService';

const columns = [
    { id: 'fullname', label: 'Full Name', minWidth: 170 },
    { id: 'email', label: '\u00a0Email', minWidth: 100 },
    {
        id: 'cnic',
        label: 'CNIC',
        minWidth: 170,
        align: 'left',
        format: (value) => value.toLocaleString('en-US')
    },
    {
        id: 'mobile',
        label: 'Mobile\u00a0',
        minWidth: 170,
        align: 'left',
        format: (value) => value.toLocaleString('en-US')
    },
    {
        id: 'address',
        label: 'Address',
        minWidth: 170,
        align: 'left',
        format: (value) => value.toFixed(2)
    }
];

function createData(fullname, type, share, email, cnic, mobile, address) {
    return { fullname, type, share, email, cnic, mobile, address };
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

export default function AllStaff() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [rows, setRows] = useState([]);

    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const style = { backgroundColor: THEME_COLOR_LIGHT, color: 'white' };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    useEffect(() => {
        setIsLoading(true);
        jwt.getAllStaffs()
            .then((res) => {
                setIsLoading(false);
                let rowsData = [];
                res?.data?.map((item) =>
                    rowsData.push(createData(item?.fullname, item?.type, item?.share, item?.email, item?.cnic, item?.mobile, item?.address))
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
        <Paper sx={{ width: '100%', overflow: 'hidden', mt: 4 }}>
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
                                    <TableCell style={style}>Type</TableCell>
                                    <TableCell style={style}>Share</TableCell>
                                    <TableCell style={style}>Email</TableCell>
                                    <TableCell style={style}>Mobile</TableCell>
                                    <TableCell style={style}>CNIC</TableCell>
                                    <TableCell style={style}>Address</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                                    return (
                                        <TableRow
                                            key={index}
                                            style={{ backgroundColor: row?.type === STAFF_TYPES.partner ? '#f0f0d2' : 'white' }}
                                        >
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>{row?.fullname}</TableCell>
                                            <TableCell>{row?.type}</TableCell>
                                            <TableCell>{row?.share}</TableCell>
                                            <TableCell>{row?.email}</TableCell>
                                            <TableCell>{row?.mobile}</TableCell>
                                            <TableCell>{row?.cnic}</TableCell>
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
