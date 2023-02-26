import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Alert, Button } from '@mui/material';
import { THEME_COLOR_LIGHT } from 'utils/Constants';
import { useState } from 'react';
import { useEffect } from 'react';
import jwt from 'jwtservice/jwtService';

const columns = [
    { id: 'fullname', label: 'Full Name', minWidth: 170 },
    { id: 'userId', label: '\u00a0User ID', minWidth: 100 },
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

function createData(fullname, userId, cnic, mobile, address, action) {
    return { fullname, userId, cnic, mobile, address, action };
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

export default function AllUsers() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [rows, setRows] = useState([]);

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
        setIsLoading(true);
        jwt.getAllUsers()
            .then((res) => {
                console.log('Get Packages Result');
                console.log(res);
                setIsLoading(false);
                let rowsData = [];
                res?.data?.map((item) =>
                    rowsData.push(
                        createData(item?.fullname, item?.userId, item?.cnic, item?.mobile, item?.address, <DeleteButton id={item?.id} />)
                    )
                );
                setRows(rowsData);
            })
            .catch((err) => {
                console.log('Get Packages Error');
                console.log(err);
                setErrorMessage(err?.response?.data?.message);
                setIsError(true);
                setIsLoading(false);
            });
        // eslint-disable-next-line
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
                                    {columns.map((column) => (
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{ minWidth: column.minWidth, backgroundColor: THEME_COLOR_LIGHT, color: 'white' }}
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
            )}
        </Paper>
    );
}
