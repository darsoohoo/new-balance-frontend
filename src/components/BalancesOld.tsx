import * as React from "react";
import { useState } from "react";
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

interface BalancesProps {
  balances: any;
  removeBorder: string;
}

const Balances: React.FC<BalancesProps> = ({
  balances,
  removeBorder


}) => {
  const theme = useTheme();
  const [showExtraColumns, setShowExtraColumns] = useState(false);
  const [sortByUser, setSortByUser] = useState(false);
  const [sortBy, setSortBy] = useState("TokenSymbol");
  const [orderBy, setOrderBy] = useState({ column: sortBy, order: 'asc' });
  const [filterBy, setFilterBy] = useState("");


  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const handleShowExtraColumnsChange = () => {
    setShowExtraColumns(!showExtraColumns);
  };
  const rows = balances.filter((row: any) => row.WalletBalance > 0 && row.PossibleSpam === false).map((item: any, index: number) => {
    return {
      row: index + 1,
      TokenSymbol: item.TokenSymbol,
      Platform: item.Platform,
      PlatformType: item.PlatformType,
      TokenPrice: item.TokenPrice,
      WalletBalance: item.WalletBalance,
      USDValue: item.USDValue,
      TokenAddress: item.TokenAddress,
      PossibleSpam: item.PossibleSpam,
      LogoURI: item.LogoURI,
      item
    }
  })

  console.log("---ROWS---", rows)

  function sortByColumn(rows:any, columnName:any, orderByState:any) {
    const isAsc = orderByState.column === columnName && orderByState.order === 'asc';

    // Use Array.sort() to sort the rows by the specified column
    rows.sort((a:any, b:any) => {
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
  // Now, sortedRows contains the rows sorted by TokenSymbol

  const handleSortByChange = (columnName: string) => {
    setSortByUser(true);
    setSortBy(columnName);
    setOrderBy((prevOrderBy) => ({
      column: columnName,
      order: prevOrderBy.column === columnName && prevOrderBy.order === 'asc' ? 'desc' : 'asc',
    }));
  }


  const newBalances = sortedRows.filter((row: any) => row.PossibleSpam === false);

  console.log("---NEW BALANCES---", newBalances)

  return (
    <ComponentBox>
      <TableContainer >
        <div style={{ overflowX: "auto" }}>
          {" "}
          {/* Enable horizontal scrolling */}
          <Stack direction="row" spacing={2} sx={{ padding: "10px", paddingLeft: "0px" }} justifyContent="space-between" alignItems="flex-start">
            <Typography variant="h5">Balances</Typography>
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
                  <div
                    style={{
                      fontSize: "0.9rem",
                    }}>
                    Row
                    </div>

                </TableCell>
              </Hidden>
              <TableCell style={{ maxWidth: 80, fontWeight: "bold" }} align="left">
                <Stack direction='row' spacing={1}>
                  <div
                    onClick={() => handleSortByChange("TokenSymbol")}
                    style={{
                      fontSize: "0.9rem",
                    }}>
                    Asset

                  </div>
                  {sortBy === 'TokenSymbol' && sortByUser === true ? orderBy.order === 'asc' ? <ArrowUpwardIcon onClick={() => handleSortByChange("TokenSymbol")} sx={{ color: theme.palette.primary.main, width: '17px' }} /> : <ArrowDownwardIcon onClick={() => handleSortByChange("TokenSymbol")} sx={{ color: theme.palette.primary.main, width: '17px' }} /> : null}
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
                    {sortBy === 'Platform' && sortByUser===true ? orderBy.order === 'asc' ? <ArrowUpwardIcon onClick={() => handleSortByChange("Platform")} sx={{ color: theme.palette.primary.main, width: '17px' }} /> : <ArrowDownwardIcon onClick={() => handleSortByChange("Platform")} sx={{ color: theme.palette.primary.main, width: '17px' }} /> : null}
                  </Stack>
                </TableCell>
              </Hidden>

              <TableCell style={{ maxWidth: 70 }} align="left">
                <Stack direction="row" spacing={1}>
                <div
                  onClick={() => handleSortByChange("TokenPrice")}
                    style={{
                      fontSize: "0.9rem",
                    }}>
                  Price
                </div>
                  {sortBy === 'TokenPrice' && sortByUser === true ? orderBy.order === 'asc' ? <ArrowUpwardIcon onClick={() => handleSortByChange("TokenPrice")} sx={{ color: theme.palette.primary.main, width: '17px' }} /> : <ArrowDownwardIcon onClick={() => handleSortByChange("TokenPrice")} sx={{ color: theme.palette.primary.main, width: '17px' }} /> : null }
                </Stack>
              </TableCell>
              <TableCell style={{ maxWidth: 75 }} align="left">
                <Stack direction="row" spacing={1}>
                <div
                  onClick={() => handleSortByChange("WalletBalance")}
                    style={{
                      fontSize: "0.9rem",
                    }}>
                  Balance
                </div>
                  {sortBy === 'WalletBalance' && sortByUser === true ? orderBy.order === 'asc' ? <ArrowUpwardIcon onClick={() => handleSortByChange("WalletBalance")} sx={{ color: theme.palette.primary.main, width: '17px' }} /> : <ArrowDownwardIcon onClick={() => handleSortByChange("WalletBalance")} sx={{ color: theme.palette.primary.main, width: '17px' }} /> : null }
                </Stack>
              </TableCell>
              <TableCell style={{ maxWidth: 65 }} align="left">
                <Stack direction="row" spacing={1}>
                  <div
                    onClick={() => handleSortByChange("USDValue")}
                    style={{
                      fontSize: "0.9rem",
                    }}>
                    Total 
                  </div>
                  {sortBy === 'USDValue' && sortByUser === true ? orderBy.order === 'asc' ? <ArrowUpwardIcon onClick={() => handleSortByChange("USDValue")} sx={{ color: theme.palette.primary.main, width: '17px' }} /> : <ArrowDownwardIcon onClick={() => handleSortByChange("USDValue")} sx={{ color: theme.palette.primary.main, width: '17px' }} /> : null}
                  {showExtraColumns ? <ArrowRightTwoToneIcon onClick={handleShowExtraColumnsChange} /> : <ArrowDropDownTwoToneIcon onClick={handleShowExtraColumnsChange} />}{" "}
                </Stack>
              </TableCell>

              {showExtraColumns && (
                <TableCell style={{ maxWidth: 125 }} align="left">
                  <Stack direction="row" spacing={1}>
                    <div
                      onClick={() => handleSortByChange("TokenAddress")}
                      style={{
                        fontSize: "0.9rem",
                      }}>
                      Token Address
                  </div>
                    {sortBy === 'TokenAddress' && sortByUser === true ? orderBy.order === 'asc' ? <ArrowUpwardIcon onClick={() => handleSortByChange("TokenAddress")} sx={{ color: theme.palette.primary.main, width: '17px' }} /> : <ArrowDownwardIcon onClick={() => handleSortByChange("TokenAddress")} sx={{ color: theme.palette.primary.main, width: '17px' }} />  : null }
                  </Stack>
                </TableCell>
              )}
              {showExtraColumns && (
                <TableCell style={{ maxWidth: 130 }} align="left">
                  <Stack direction="row" spacing={1}>
                    <div
                      onClick={() => handleSortByChange("PossibleSpam")}
                      style={{
                        fontSize: "0.9rem",
                      }}>
                      Possible Spam
                  </div>
                    {sortBy === 'PossibleSpam' && sortByUser === true ? orderBy.order === 'asc' ? <ArrowUpwardIcon onClick={() => handleSortByChange("PossibleSpam")} sx={{ color: theme.palette.primary.main, width: '17px' }} /> : <ArrowDownwardIcon onClick={() => handleSortByChange("PossibleSpam")} sx={{ color: theme.palette.primary.main, width: '17px' }} /> : null}
                  </Stack>
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {newBalances.map((row: any, index: number) => {
              return (
                <TableRow key={row.id} hover role="checkbox" tabIndex={-1}>
                  <Hidden smDown>
                    <TableCell style={{ maxWidth: 65 }} align="left">
                      <Stack justifyContent="flex-start" alignItems="center" spacing={1} direction="row">
                        {index + 1}
                      </Stack>
                    </TableCell>
                  </Hidden>
                  <TableCell style={{ maxWidth: 80 }} align="left">
                    {row.TokenSymbol ? row.TokenSymbol : "undefined"}
                  </TableCell>
                  <Hidden smDown>
                    <TableCell style={{ maxWidth: 85 }} align="left">
                      {capitalizeFirstLetter(row.PlatformType === "defi" ? "Defi" : row.Platform)}
                    </TableCell>
                  </Hidden>
                  <TableCell style={{ maxWidth: 70 }} align="left">
                    {row.TokenPrice ? "$" + row.TokenPrice.toFixed(4) : null}
                  </TableCell>
                  <TableCell style={{ maxWidth: 80 }} align="left">
                    {row.WalletBalance.toFixed(4)}{" "}
                  </TableCell>
                  <TableCell style={{ maxWidth: 85 }} align="left">
                    {"$" + row.USDValue.toFixed(2)}
                  </TableCell>
                  {showExtraColumns && (
                    <TableCell sx={{ wordWrap: 'break-word', whiteSpace: 'normal' }} style={{ maxWidth: 100 }} align="left">
                      {row.TokenAddress ? row.TokenAddress : null}
                    </TableCell>
                  )}
                  {showExtraColumns && (
                    <TableCell style={{ maxWidth: 75 }} align="left">
                      {row.PossibleSpam ? row.PossibleSpam.toString() : "false"}
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

export default Balances;