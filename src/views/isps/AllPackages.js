import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { THEME_COLOR_DARK, THEME_COLOR_LIGHT, THEME_COLOR_TINT } from '../../utils/Constants';
import { useLocation } from 'react-router';
import { Alert, Button } from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';
import jwt from 'jwtservice/jwtService';

const columns = [
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'bandwidth', label: '\u00a0Bandwidth', minWidth: 100 },
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

// eslint-disable-next-line
const DeleteButton = ({ id }) => {
    return (
        <Button variant="contained" color="error" onClick={() => deletePackage(id)}>
            Delete
        </Button>
    );
};

export default function AllPackages() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [rows, setRows] = useState([]);
    const [companyName, setCompanyName] = useState('');

    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const { ispId = '', color = THEME_COLOR_DARK } = useLocation().state;
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    useEffect(() => {
        setIsLoading(true);
        jwt.getAllPackages(ispId)
            .then((res) => {
                console.log('Get Packages Result');
                console.log(res);
                setIsLoading(false);
                setCompanyName(res?.data[0]?.isp?.name);
                let rowsData = [];
                res?.data?.map((item) =>
                    rowsData.push(
                        createData(
                            item?.name,
                            item?.bandwidth,
                            item?.rateType === 'day' ? 'Per Day' : 'Per Month',
                            item?.ratePerDay,
                            item?.purchaseRate,
                            item?.saleRate,
                            item?.validity,
                            <DeleteButton id={item?.id} />
                        )
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
                                    <TableCell
                                        colSpan={columns.length}
                                        sx={{ fontSize: 'xx-large', backgroundColor: color, color: 'white' }}
                                    >
                                        {companyName}
                                    </TableCell>
                                </TableRow>
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
