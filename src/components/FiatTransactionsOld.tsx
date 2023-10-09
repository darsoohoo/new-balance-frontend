import * as React from "react";
import { useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { Divider } from "@mui/material";
import ComponentBox from "./ComponentBox";
import Hidden from "@mui/material/Hidden";
import ArrowRightTwoToneIcon from "@mui/icons-material/ArrowRightTwoTone";
import ArrowDropDownTwoToneIcon from "@mui/icons-material/ArrowDropDownTwoTone";

export interface FiatTransactionsProps {
    usdTransactions: any;
}

const FiatTransactions: React.FC<FiatTransactionsProps> = ({ usdTransactions }) => {
    const [showExtraColumns, setShowExtraColumns] = useState(false);

    const capitalizeFirstLetter = (str: string) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };
    const handleShowExtraColumnsChange = () => {
        setShowExtraColumns(!showExtraColumns);
    };


    const formatNumberWithVariableDecimals = (number: number) => {
        const decimals = (number.toString().split(".")[1] || "").length;
        return decimals > 0 ? number.toFixed(decimals) : number.toString();
    };


    return (
        <ComponentBox>
            <TableContainer sx={{ maxHeight: 720 }}>
                <Stack direction="row" spacing={2} sx={{ padding: "10px", paddingLeft: "0px" }} justifyContent="space-between" alignItems="flex-start">
                    <Typography variant="h5">Transactions Old</Typography>
                </Stack>
            </TableContainer>
            <Divider />
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <Hidden smDown>

                                <TableCell style={{ maxWidth: 70, fontWeight: "bold" }} align="left">
                                    Date
                                </TableCell>
                            </Hidden>
                            <TableCell style={{ maxWidth: 80, fontWeight: "bold" }} align="left">
                                Asset
                            </TableCell>
                            <TableCell style={{ maxWidth: 80, fontWeight: "bold" }} align="left">
                                Type
                            </TableCell>
                            <Hidden smDown>
                                <TableCell style={{ maxWidth: 80, fontWeight: "bold" }} align="left">
                                    Platform
                                </TableCell>
                            </Hidden>
                            <TableCell style={{ maxWidth: 70, fontWeight: "bold" }} align="left">
                                Price
                            </TableCell>

                            <TableCell style={{ maxWidth: 80, fontWeight: "bold" }} align="left">
                                Amount
                            </TableCell>
                            <TableCell style={{ maxWidth: 70, fontWeight: "bold" }} align="left">
                                <Stack direction="row">
                                    Total

                                    {showExtraColumns ? (
                                        <ArrowRightTwoToneIcon onClick={handleShowExtraColumnsChange} />
                                    ) : (
                                        <ArrowDropDownTwoToneIcon onClick={handleShowExtraColumnsChange} />
                                    )}


                                </Stack>
                            </TableCell>
                            {showExtraColumns && (
                                <TableCell style={{ maxWidth: 100, fontWeight: "bold" }} align="left">
                                    Fee
                                </TableCell>
                            )}
                            {showExtraColumns && (
                                <TableCell style={{ maxWidth: 100, fontWeight: "bold" }} align="left">
                                    Subtotal
                                </TableCell>
                            )}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {usdTransactions.map((row: any, index: number) => {
                            return (
                                <TableRow hover role="fiat-transactions" tabIndex={-1} key={row.id}>
                                    <Hidden smDown>

                                        <TableCell style={{ maxWidth: 70, fontWeight: "bold" }} align="left">
                                            {new Date(row.created_at).toLocaleDateString() + "  " + new Date(row.created_at).toLocaleTimeString()}
                                        </TableCell>
                                    </Hidden>
                                    <TableCell style={{ maxWidth: 80, fontWeight: "bold" }} align="left">
                                        {row.total_amount.currency}
                                    </TableCell>
                                    <TableCell style={{ maxWidth: 80, fontWeight: "bold" }} align="left">
                                        {capitalizeFirstLetter(row.resource)}
                                    </TableCell>
                                    <Hidden smDown>

                                        <TableCell style={{ maxWidth: 80, fontWeight: "bold" }} align="left">
                                            {capitalizeFirstLetter(row.Platform)}
                                        </TableCell>
                                    </Hidden>
                                    <TableCell style={{ maxWidth: 70, fontWeight: "bold" }} align="left">
                                        {row.resource === "buy" ? "$" + Number(row.unit_price.amount).toFixed(2) : "N/A"}
                                    </TableCell>

                                    <TableCell style={{ maxWidth: 80, fontWeight: "bold" }} align="left">
                                        {row.total_amount && row.total_amount.amount && formatNumberWithVariableDecimals(Number(row.total_amount.amount))}
                                    </TableCell>
                                    <TableCell style={{ maxWidth: 70, fontWeight: "bold" }} align="left">
                                        ${formatNumberWithVariableDecimals(Number(row.dollar_amount))}
                                    </TableCell>
                                    {showExtraColumns && (
                                        <TableCell style={{ maxWidth: 100, fontWeight: "bold" }} align="left">
                                            ${Number(row.fee.amount)}
                                        </TableCell>
                                    )}
                                    {showExtraColumns && (
                                        <TableCell style={{ maxWidth: 100, fontWeight: "bold" }} align="left">
                                            ${Number(row.subtotal.amount)}
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