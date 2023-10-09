import React, { useState } from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import ArrowRightTwoToneIcon from "@mui/icons-material/ArrowRightTwoTone";
import ArrowDropDownTwoToneIcon from "@mui/icons-material/ArrowDropDownTwoTone";
import Hidden from "@mui/material/Hidden";
import ComponentBox from "./ComponentBox";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";

interface BalancesProps {
  balances: any;
  removeBorder: string;
}

const Balances: React.FC<BalancesProps> = ({
  balances,
  removeBorder
}) => {

  interface Data {
    RowNum: number;
    TokenSymbol: string | null;
    Platform: string;
    PlatformType: string;
    TokenPrice: number | null;
    WalletBalance: number | null;
    USDValue: number | null;
    TokenAddress: string | null;
    PossibleSpam: boolean | null;
    LogoURI: string | null;
  }


  const rows = balances.map((item: any, index: number) => {
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
    }
  })


  function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  type Order = 'asc' | 'desc';

  function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key,
  ): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string },
  ) => number {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  // Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
  // stableSort() brings sort stability to non-modern browsers (notably IE11). If you
  // only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
  // with exampleArray.slice().sort(exampleComparator)
  function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  const [showExtraColumns, setShowExtraColumns] = useState(false);

  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const handleShowExtraColumnsChange = () => {
    setShowExtraColumns(!showExtraColumns);
  };

  interface HeadCell {
    disablePadding: boolean;
    id: keyof Data;
    label: string;
    numeric: boolean;
    icon: any;
    isExtraColumn: boolean;
    maxWidth: number;
    maxHeight: number;
  }

  const headCells: readonly HeadCell[] = [{
    id: 'RowNum',
    numeric: true,
    disablePadding: false,
    label: 'Row',
    icon: null,
    isExtraColumn: false,
    maxWidth: 70,
    maxHeight: 50
  },
  {
    id: 'TokenSymbol',
    numeric: false,
    disablePadding: true,
    label: 'Symbol',
    icon: null,
    isExtraColumn: false,
    maxWidth: 80,
    maxHeight: 50
  },
  {
    id: 'Platform',
    numeric: false,
    disablePadding: true,
    label: 'Platform',
    icon: null,
    isExtraColumn: false,
    maxWidth: 80,
    maxHeight: 50
  },
  {
    id: 'TokenPrice',
    numeric: true,
    disablePadding: false,
    label: 'Price',
    icon: null,
    isExtraColumn: false,
    maxWidth: 70,
    maxHeight: 50
  },
  {
    id: 'WalletBalance',
    numeric: true,
    disablePadding: false,
    label: 'Balance',
    icon: null,
    isExtraColumn: false,
    maxWidth: 80,
    maxHeight: 50
  },
  {
    id: 'USDValue',
    numeric: true,
    disablePadding: false,
    label: 'Total',
    icon: showExtraColumns ? <ArrowRightTwoToneIcon onClick={handleShowExtraColumnsChange} /> : < ArrowDropDownTwoToneIcon onClick={handleShowExtraColumnsChange} />,
    isExtraColumn: false,
    maxWidth: 70,
    maxHeight: 50

  },
  {
    id: 'TokenAddress',
    numeric: false,
    disablePadding: false,
    label: 'Token Address',
    icon: null,
    isExtraColumn: true,
    maxWidth: 120,
    maxHeight: 50
  },
  {
    id: 'PossibleSpam',
    numeric: false,
    disablePadding: false,
    label: 'Possible Spam',
    icon: null,
    isExtraColumn: true,
    maxWidth: 100,
    maxHeight: 50
  },


  ];

  interface EnhancedTableProps {
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
  }

  function EnhancedTableHead(props: EnhancedTableProps) {
    const { order, orderBy, rowCount, onRequestSort } =
      props;
    const createSortHandler =
      (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
        onRequestSort(event, property);
      };

    return (
      <TableHead>
        <TableRow sx={{height:'40px', padding:'0px', border:'red solid'+removeBorder}}>
          {headCells.map((headCell) => (
            headCell.isExtraColumn === true && showExtraColumns === true ? (<TableCell
              key={headCell.id}
              align={'left'}
              padding={'normal'}
              sortDirection={orderBy === headCell.id ? order : false}
            
            >
              <Stack direction="row" justifyContent="flex-start" alignItems="left" spacing={1}>
                <TableSortLabel
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : 'asc'}
                  onClick={createSortHandler(headCell.id)}
                >
                  {headCell.label}
                  {orderBy === headCell.id ? (
                    <Box component="span" sx={visuallyHidden}>
                      {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                    </Box>
                  ) : null}
                </TableSortLabel>
                {headCell.icon}
              </Stack>

            </TableCell>) :
              headCell.isExtraColumn === true && showExtraColumns === false ? null : (<TableCell
                key={headCell.id}
                align={'left'}
                padding={'normal'}
                sortDirection={orderBy === headCell.id ? order : false}

              >
                <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={1}>
                  <TableSortLabel
                    active={orderBy === headCell.id}
                    direction={orderBy === headCell.id ? order : 'asc'}
                    onClick={createSortHandler(headCell.id)}
                  >
                    {headCell.label}
                    {orderBy === headCell.id ? (
                      <Box component="span" sx={visuallyHidden}>
                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                      </Box>
                    ) : null}
                  </TableSortLabel>
                  {headCell.icon}
                </Stack>
              </TableCell>)

          ))}
        </TableRow>
      </TableHead>
    );
  }





  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Data>('RowNum');
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };



  // // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      ),
    [order, orderBy, page, rowsPerPage],
  );

  return (
    <ComponentBox>
      <TableContainer sx={{ maxHeight: 720 }}>
        <div style={{ overflowX: "auto" }}>
          {" "}
          {/* Enable horizontal scrolling */}
          <Stack direction="row" spacing={1} sx={{ padding: "1px", paddingLeft: "0px" }} justifyContent="space-between" alignItems="flex-start">
            <Typography variant="h5">Balances</Typography>
          </Stack>
        </div>
      </TableContainer>
      <Divider />
      <TableContainer sx={{ maxHeight: 720 }}>
        <Table
          sx={{}}
          aria-labelledby="tableTitle"
          size={dense ? 'small' : 'medium'}
        >
          <EnhancedTableHead
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            rowCount={rows.length}
          />
          <TableBody>
            {rows.map((row:any, index:number) => {
              const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <TableRow

                  hover
                  role="none"
                  tabIndex={-1}
                  key={labelId}
                  sx={{ paddingLeft: '30px', border: 'red' + removeBorder }}
                >

                  <Hidden smDown>
                    <TableCell
                      style={{ maxWidth: 70 }}
                      id={labelId}
                      scope="row"
                      padding="normal"
                      sx={{ paddingLeft: '30px', border: 'green' + removeBorder }}
                    >
                      
                      {index + 1}
                    </TableCell>
                  </Hidden>
                  <TableCell sx={{ paddingLeft: '25px', border: 'blue' + removeBorder }} style={{ maxWidth: 80 }} >{row.TokenSymbol && row.TokenSymbol}</TableCell>
                  <Hidden smDown>
                    <TableCell sx={{ paddingLeft: '25px', border: 'blue' + removeBorder }} style={{ maxWidth: 80 }} align="left">   {row.Platform ? capitalizeFirstLetter(row.Platform ? row.Platform.toString() : "") : null}</TableCell>
                  </Hidden>
                  <TableCell sx={{ paddingLeft: '25px', border: 'orange' + removeBorder }} style={{ maxWidth: 70 }} align="left">    {row.TokenPrice && "$" + Number(row.TokenPrice).toFixed(4)}</TableCell>
                  <TableCell sx={{ paddingLeft: '25px', border: 'blue' + removeBorder }} style={{ maxWidth: 80 }} align="left">  {row.WalletBalance && Number(row.WalletBalance).toFixed(4)}{" "}</TableCell>
                  <TableCell sx={{ paddingLeft: '25px', border: 'red' + removeBorder }} style={{ maxWidth: 70 }} align="left">{row.USDValue && Number(row.USDValue).toFixed(2)}</TableCell>
                  {showExtraColumns && (
                    <TableCell sx={{ paddingLeft: '25px', wordWrap: 'break-word', whiteSpace: 'normal', border: 'blue solid' + removeBorder }} style={{ maxWidth: 100 }} align="left">
                      {row.TokenAddress ? row.TokenAddress : null}
                    </TableCell>
                  )}
                  {showExtraColumns && (
                    <TableCell sx={{ paddingLeft: '25px', border: 'blue' + removeBorder }} style={{ maxWidth: 90 }} align="left">
                      {row.PossibleSpam ? row.PossibleSpam.toString() : "false"}
                    </TableCell>
                  )}

                </TableRow>
              );
            })}
            {emptyRows > 0 && (
              <TableRow
                style={{
                  height: (dense ? 33 : 53) * emptyRows,
                }}
              >
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>


    </ComponentBox>
  );
}

export default Balances;

/*
align="center"

paddingLeft=""

*/