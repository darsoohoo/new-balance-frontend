import * as React from "react";
import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ComponentBox from "./ComponentBox";
import Hidden from "@mui/material/Hidden";
import PaidTwoToneIcon from "@mui/icons-material/PaidTwoTone";
import ArrowRightTwoToneIcon from "@mui/icons-material/ArrowRightTwoTone";
import ArrowDropDownTwoToneIcon from "@mui/icons-material/ArrowDropDownTwoTone";
import TableSortLabel from '@mui/material/TableSortLabel';
import Button from '@mui/material/Button';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { useTheme } from '@mui/material/styles';


interface FiatTransactionsProps {
    usdTransactions: any;
    removeBorder: string;
}

const FiatTransactions: React.FC<FiatTransactionsProps> = ({
    usdTransactions,
    removeBorder


}) => {



    // Now, sortedRows contains the rows sorted by Date


    const transactions = usdTransactions.map((item: any, index: number) => {
        return {
            ...item,
            Date: item.created_at,
        }
    })

    // Now, sortedRows contains the rows sorted by TokenSymbol

    const theme = useTheme();
    const [showExtraColumns, setShowExtraColumns] = useState(false);
    const [sortByUser, setSortByUser] = useState(false);
    const [sortBy, setSortBy] = useState("Platform");
    const [orderBy, setOrderBy] = useState({ column: sortBy, order: 'asc' });
    const [filterBy, setFilterBy] = useState("");
    // Usage:
  
    const columns = [{
        id: 'CreatedAt',
        numeric: true,
        disablePadding: false,
        displayName: 'Date',
        icon: null,
        isExtraColumn: false,
        maxWidth: 70,
        maxHeight: 50
    },
    {
        id: 'TotalAmountCurrency',
        numeric: false,
        disablePadding: true,
        displayName: 'Asset',
        icon: null,
        isExtraColumn: false,
        maxWidth: 80,
        maxHeight: 50
    },
        {
            id: 'Type',
            numeric: false,
            disablePadding: true,
            displayName: 'Type',
            icon: null,
            isExtraColumn: false,
            maxWidth: 80,
            maxHeight: 50
        },
    {
        id: 'Platform',
        numeric: false,
        disablePadding: true,
        displayName: 'Platform',
        icon: null,
        isExtraColumn: false,
        maxWidth: 80,
        maxHeight: 50
    },
    {
        id: 'UnitPrice',
        numeric: true,
        disablePadding: false,
        displayName: 'Price',
        icon: null,
        isExtraColumn: false,
        maxWidth: 70,
        maxHeight: 50
    },
    {
        id: 'TotalAmount',
        numeric: true,
        disablePadding: false,
        displayName: 'Amount',
        icon: null,
        isExtraColumn: false,
        maxWidth: 80,
        maxHeight: 50
    },
    {
        id: 'DollarAmount',
        numeric: true,
        disablePadding: false,
        displayName: 'Total',
        icon: null,
        isExtraColumn: false,
        maxWidth: 70,
        maxHeight: 50

    },
    {
        id: 'Fee',
        numeric: false,
        disablePadding: false,
        displayName: 'Fee',
        icon: null,
        isExtraColumn: true,
        maxWidth: 120,
        maxHeight: 50
    },
    {
        id: 'Subtotal',
        numeric: false,
        disablePadding: 'Subtotal',
        icon: null,
        isExtraColumn: true,
        maxWidth: 100,
        maxHeight: 50
    },


    ];

    const capitalizeFirstLetter = (str: string) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    const handleShowExtraColumnsChange = () => {
        setShowExtraColumns(!showExtraColumns);
    };

    const rows = transactions.map((item: any, index: number) => {
        return {
            row: index + 1,
            Date: item.Date,
            TotalAmountCurrency: item.total_amount.currency,
            PosibleSpam: item.PossibleSpam,
            Type: item.resource,
            Platform: item.Platform,
            UnitPrice: item.resource === 'buy'  && item.unit_price && item.unit_price.amount ? Number(item.unit_price.amount) : "N/A",
            TotalAmount: item.total_amount && item.total_amount.amount ? Number(item.total_amount.amount) : null,
            DollarAmount: Number(item.dollar_amount),
            Fee: item.fee.amount,
            SubTotalAmount: item.subtotal.amount,
            PlatformType: item.PlatformType,
            AssetType: item.AssetType,
            TableDateType: item.TableDateType,
            LogoURI: item.LogoURI,
            item
     
        }
    })

    console.log("---ROWS---", rows)

    function sortByColumn(rows: any, columnName: any, orderByState: any) {
        const isAsc = orderByState.column === columnName && orderByState.order === 'asc';

        // Use Array.sort() to sort the rows by the specified column
        rows.sort((a: any, b: any) => {
            const valueA = a[columnName];
            const valueB = b[columnName];

            let comparison = 0;

            if (typeof valueA === 'number' && typeof valueB === 'number') {
                // If both values are numbers, perform a numeric comparison
                comparison = valueA - valueB;
            } else if (typeof valueA === 'string' && typeof valueB === 'string') {
                // If both values are strings, perform a string comparison (case-insensitive)
                const stringA = valueA.toUpperCase();
                const stringB = valueB.toUpperCase();
                if (stringA < stringB) {
                    comparison = -1;
                }
                if (stringA > stringB) {
                    comparison = 1;
                }
            } else if (typeof valueA === 'boolean' && typeof valueB === 'boolean') {
                // If both values are booleans, perform a boolean comparison
                comparison = valueA === valueB ? 0 : valueA ? -1 : 1;
            } else {
                // Handle other types (e.g., mixed types) by falling back to string comparison
                const stringA = String(valueA).toUpperCase();
                const stringB = String(valueB).toUpperCase();
                if (stringA < stringB) {
                    comparison = -1;
                }
                if (stringA > stringB) {
                    comparison = 1;
                }
            }

            // Apply orderBy (ascending or descending)
            return isAsc ? comparison : comparison * -1;
        });
        return rows;
    }


    // Usage:
    const sortedRows = sortByColumn(rows, sortBy, orderBy);

    const handleSortByChange = (columnName: string) => {
        setSortByUser(true);
        setSortBy(columnName);
        setOrderBy((prevOrderBy) => ({
            column: columnName,
            order: prevOrderBy.column === columnName && prevOrderBy.order === 'asc' ? 'desc' : 'asc',
        }));
    }



    console.log("---NEW TRANSACTIONS sortedRows---", sortedRows)

    const formatNumberWithVariableDecimals = (number: number) => {
        const decimals = (number.toString().split(".")[1] || "").length;
        return decimals > 0 ? number.toFixed(decimals) : number.toString();
    };

    return (
        <ComponentBox>
            <TableContainer >
                <div style={{ overflowX: "auto" }}>
                    {" "}
                    {/* Enable horizontal scrolling */}
                    <Stack direction="row" spacing={2} sx={{ padding: "10px", paddingLeft: "0px" }} justifyContent="space-between" alignItems="flex-start">
                        <Typography variant="h5">Transactions</Typography>
                    </Stack>
                </div>
            </TableContainer>
            <Divider />
            <TableContainer sx={{ maxHeight: 720 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead sx={{ paddingLeft: "10px" }}>
                        <TableRow>
                            <Hidden smDown>
                                <TableCell style={{ maxWidth: 65, fontWeight: "bold" }} align="left">
                                    <Stack direction='row' spacing={1}>
                                    <div
                                        onClick={() => handleSortByChange("Date")}
                                        style={{
                                            fontSize: "0.9rem",
                                        }}>
                                        Date
                                    </div>
                                    {sortBy === 'Date' && sortByUser === true ? orderBy.order === 'asc' ? <ArrowUpwardIcon onClick={() => handleSortByChange("Date")} sx={{ color: theme.palette.primary.main, width: '17px' }} /> : <ArrowDownwardIcon onClick={() => handleSortByChange("Date")} sx={{ color: theme.palette.primary.main, width: '17px' }} /> : null}
                                        </Stack>
                                </TableCell>
                            </Hidden>
                            <TableCell style={{ maxWidth: 80, fontWeight: "bold" }} align="left">
                                <Stack direction='row' spacing={1}>
                                    <div
                                        onClick={() => handleSortByChange("TotalAmountCurrency")}
                                        style={{
                                            fontSize: "0.9rem",
                                        }}>
                                        Asset

                                    </div>
                                    {sortBy === 'TotalAmountCurrency' && sortByUser === true ? orderBy.order === 'asc' ? <ArrowUpwardIcon onClick={() => handleSortByChange("TotalAmountCurrency")} sx={{ color: theme.palette.primary.main, width: '17px' }} /> : <ArrowDownwardIcon onClick={() => handleSortByChange("TotalAmountCurrency")} sx={{ color: theme.palette.primary.main, width: '17px' }} /> : null}
                                </Stack>

                            </TableCell>
                            <TableCell style={{ maxWidth: 80, fontWeight: "bold" }} align="left">
                                <Stack direction='row' spacing={1}>
                                    <div
                                        onClick={() => handleSortByChange("Type")}
                                        style={{
                                            fontSize: "0.9rem",
                                        }}>
                                        Type

                                    </div>
                                    {sortBy === 'Type' && sortByUser === true ? orderBy.order === 'asc' ? <ArrowUpwardIcon onClick={() => handleSortByChange("Type")} sx={{ color: theme.palette.primary.main, width: '17px' }} /> : <ArrowDownwardIcon onClick={() => handleSortByChange("Type")} sx={{ color: theme.palette.primary.main, width: '17px' }} /> : null}
                                </Stack>

                            </TableCell>
                            <Hidden smDown>
                                <TableCell style={{ maxWidth: 85 }} align="left">
                                    <Stack direction='row' spacing={1}>
                                        <div
                                            onClick={() => handleSortByChange("Platform")}
                                            style={{
                                                fontSize: "0.9rem",
                                            }}>
                                            Platform
                                        </div>
                                        {sortBy === 'Platform' && sortByUser === true ? orderBy.order === 'asc' ? <ArrowUpwardIcon onClick={() => handleSortByChange("Platform")} sx={{ color: theme.palette.primary.main, width: '17px' }} /> : <ArrowDownwardIcon onClick={() => handleSortByChange("Platform")} sx={{ color: theme.palette.primary.main, width: '17px' }} /> : null}
                                    </Stack>
                                </TableCell>
                            </Hidden>

                            <TableCell style={{ maxWidth: 70 }} align="left">
                                <Stack direction="row" spacing={1}>
                                    <div
                                        onClick={() => handleSortByChange("UnitPrice")}
                                        style={{
                                            fontSize: "0.9rem",
                                        }}>
                                        Price
                                    </div>
                                    {sortBy === 'UnitPrice' && sortByUser === true ? orderBy.order === 'asc' ? <ArrowUpwardIcon onClick={() => handleSortByChange("UnitPrice")} sx={{ color: theme.palette.primary.main, width: '17px' }} /> : <ArrowDownwardIcon onClick={() => handleSortByChange("UnitPrice")} sx={{ color: theme.palette.primary.main, width: '17px' }} /> : null}
                                </Stack>
                            </TableCell>
                            <TableCell style={{ maxWidth: 75 }} align="left">
                                <Stack direction="row" spacing={1}>
                                    <div
                                        onClick={() => handleSortByChange("TotalAmount")}
                                        style={{
                                            fontSize: "0.9rem",
                                        }}>
                                       Amount
                                    </div>
                                    {sortBy === 'TotalAmount' && sortByUser === true ? orderBy.order === 'asc' ? <ArrowUpwardIcon onClick={() => handleSortByChange("TotalAmount")} sx={{ color: theme.palette.primary.main, width: '17px' }} /> : <ArrowDownwardIcon onClick={() => handleSortByChange("TotalAmount")} sx={{ color: theme.palette.primary.main, width: '17px' }} /> : null}
                                </Stack>
                            </TableCell>
                            <TableCell style={{ maxWidth: 65 }} align="left">
                                <Stack direction="row" spacing={1}>
                                    <div
                                        onClick={() => handleSortByChange("DollarAmount")}
                                        style={{
                                            fontSize: "0.9rem",
                                        }}>
                                        Total
                                    </div>
                                    {sortBy === 'DollarAmount' && sortByUser === true ? orderBy.order === 'asc' ? <ArrowUpwardIcon onClick={() => handleSortByChange("DollarAmount")} sx={{ color: theme.palette.primary.main, width: '17px' }} /> : <ArrowDownwardIcon onClick={() => handleSortByChange("DollarAmount")} sx={{ color: theme.palette.primary.main, width: '17px' }} /> : null}
                                    {showExtraColumns ? <ArrowRightTwoToneIcon onClick={handleShowExtraColumnsChange} /> : <ArrowDropDownTwoToneIcon onClick={handleShowExtraColumnsChange} />}{" "}
                                </Stack>
                            </TableCell>

                            {showExtraColumns && (
                                <TableCell style={{ maxWidth: 125 }} align="left">
                                    <Stack direction="row" spacing={1}>
                                        <div
                                            onClick={() => handleSortByChange("Fee")}
                                            style={{
                                                fontSize: "0.9rem",
                                            }}>
                                            Fee
                                        </div>
                                        {sortBy === 'Fee' && sortByUser === true ? orderBy.order === 'asc' ? <ArrowUpwardIcon onClick={() => handleSortByChange("Fee")} sx={{ color: theme.palette.primary.main, width: '17px' }} /> : <ArrowDownwardIcon onClick={() => handleSortByChange("Fee")} sx={{ color: theme.palette.primary.main, width: '17px' }} /> : null}
                                    </Stack>
                                </TableCell>
                            )}
                            {showExtraColumns && (
                                <TableCell style={{ maxWidth: 130 }} align="left">
                                    <Stack direction="row" spacing={1}>
                                        <div
                                            onClick={() => handleSortByChange("SubTotalAmount")}
                                            style={{
                                                fontSize: "0.9rem",
                                            }}>
                                            Subtotal
                                        </div>
                                        {sortBy === 'SubTotalAmount' && sortByUser === true ? orderBy.order === 'asc' ? <ArrowUpwardIcon onClick={() => handleSortByChange("SubTotalAmount")} sx={{ color: theme.palette.primary.main, width: '17px' }} /> : <ArrowDownwardIcon onClick={() => handleSortByChange("SubTotalAmount")} sx={{ color: theme.palette.primary.main, width: '17px' }} /> : null}
                                    </Stack>
                                </TableCell>
                            )}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedRows.map((row: any, index: number) => {
                            return (
                                <TableRow hover role="fiat-transactions" tabIndex={-1} key={row.id}>
                                    <Hidden smDown>

                                        <TableCell style={{ maxWidth: 70, fontWeight: "bold" }} align="left">
                                            {new Date(row.Date).toLocaleDateString() + "  " + new Date(row.Date).toLocaleTimeString()}
                                        </TableCell>
                                    </Hidden>
                                    <TableCell style={{ maxWidth: 80, fontWeight: "bold" }} align="left">
                                        {row.TotalAmountCurrency}
                                    </TableCell>
                                    <TableCell style={{ maxWidth: 80, fontWeight: "bold" }} align="left">
                                        {capitalizeFirstLetter(row.Type)}
                                    </TableCell>
                                    <Hidden smDown>

                                        <TableCell style={{ maxWidth: 80, fontWeight: "bold" }} align="left">
                                            {capitalizeFirstLetter(row.Platform)}
                                        </TableCell>
                                    </Hidden>
                                    <TableCell style={{ maxWidth: 70, fontWeight: "bold" }} align="left">
                                        {row.UnitPrice}
                                    </TableCell>

                                    <TableCell style={{ maxWidth: 80, fontWeight: "bold" }} align="left">
                                        {row.TotalAmount ? formatNumberWithVariableDecimals(Number(row.TotalAmount)) : null}
                                    </TableCell>
                                    <TableCell style={{ maxWidth: 70, fontWeight: "bold" }} align="left">
                                        ${formatNumberWithVariableDecimals(Number(row.DollarAmount))}
                                    </TableCell>
                                    {showExtraColumns && (
                                        <TableCell style={{ maxWidth: 100, fontWeight: "bold" }} align="left">
                                            ${Number(row.Fee)}
                                        </TableCell>
                                    )}
                                    {showExtraColumns && (
                                        <TableCell style={{ maxWidth: 100, fontWeight: "bold" }} align="left">
                                            ${Number(row.SubTotalAmount)}
                                        </TableCell>
                                    )}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </ComponentBox>
    );

};

export default FiatTransactions;