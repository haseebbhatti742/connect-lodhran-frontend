import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Button } from '@mui/material';
import { THEME_COLOR_LIGHT } from 'utils/Constants';

const columns = [
    { id: 'fullname', label: 'Full Name', minWidth: 170 },
    { id: 'userId', label: 'ISO\u00a0User ID', minWidth: 100 },
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
    // {
    //     id: 'action',
    //     label: 'Action',
    //     minWidth: 170,
    //     align: 'right',
    //     format: (value) => value.toFixed(2)
    // }
];

function createData(fullname, userId, cnic, mobile, address, action) {
    return { fullname, userId, cnic, mobile, address, action };
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

const rows = [
    createData('Haseeb Ahmed', 'haseeb.ahmed', '3620379037003', '03062244907', 'Lodhran', <DeleteButton id={1} />),
    createData('Haseeb Ahmed', 'haseeb.ahmed', '3620379037003', '03062244907', 'Lodhran', <DeleteButton id={2} />),
    createData('Haseeb Ahmed', 'haseeb.ahmed', '3620379037003', '03062244907', 'Lodhran', <DeleteButton id={3} />),
    createData('Haseeb Ahmed', 'haseeb.ahmed', '3620379037003', '03062244907', 'Lodhran', <DeleteButton id={4} />),
    createData('Haseeb Ahmed', 'haseeb.ahmed', '3620379037003', '03062244907', 'Lodhran', <DeleteButton id={5} />),
    createData('Haseeb Ahmed', 'haseeb.ahmed', '3620379037003', '03062244907', 'Lodhran', <DeleteButton id={6} />)
];

export default function AllUsers() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
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
        </Paper>
    );
}
