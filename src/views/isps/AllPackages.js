import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { THEME_COLOR_DARK } from '../../utils/Constants';
import { useLocation } from 'react-router';
import { Button } from '@mui/material';

const columns = [
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'bandwidth', label: 'ISO\u00a0Bandwidth', minWidth: 100 },
    {
        id: 'rateType',
        label: 'Rate Type',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toLocaleString('en-US')
    },
    {
        id: 'ratePerDay',
        label: 'Rate/Day\u00a0',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toLocaleString('en-US')
    },
    {
        id: 'purchaseRate',
        label: 'Purchase Rate',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toFixed(2)
    },
    {
        id: 'saleRate',
        label: 'Sale Rate',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toFixed(2)
    },
    {
        id: 'validity',
        label: 'Validity',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toFixed(2)
    },
    {
        id: 'action',
        label: 'Action',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toFixed(2)
    }
];

function createData(name, bandwidth, rateType, ratePerDay, purchaseRate, saleRate, validity, action) {
    return { name, bandwidth, rateType, ratePerDay, purchaseRate, saleRate, validity, action };
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
    createData('2MB', 2, 'Month', 0, 500, 1000, 31, <DeleteButton id={1} />),
    createData('2MB', 2, 'Month', 0, 500, 1000, 31, <DeleteButton id={2} />),
    createData('2MB', 2, 'Month', 0, 500, 1000, 31, <DeleteButton id={3} />),
    createData('2MB', 2, 'Month', 0, 500, 1000, 31, <DeleteButton id={4} />),
    createData('2MB', 2, 'Month', 0, 500, 1000, 31, <DeleteButton id={5} />),
    createData('2MB', 2, 'Month', 0, 500, 1000, 31, <DeleteButton id={6} />),
    createData('2MB', 2, 'Month', 0, 500, 1000, 31, <DeleteButton id={7} />),
    createData('2MB', 2, 'Month', 0, 500, 1000, 31, <DeleteButton id={8} />),
    createData('2MB', 2, 'Month', 0, 500, 1000, 31, <DeleteButton id={9} />),
    createData('2MB', 2, 'Month', 0, 500, 1000, 31, <DeleteButton id={10} />)
];

export default function AllPackages() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const { ispId = '', color = THEME_COLOR_DARK } = useLocation().state;
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
                            <TableCell> Company Name </TableCell>
                        </TableRow>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth, backgroundColor: color, color: 'white' }}
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
