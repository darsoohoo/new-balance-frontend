import * as React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

interface BalancesProps {
  balances: any;
}

const Balances: React.FC<BalancesProps> = ({
  balances
}) => {

  console.log("balances", balances)

  const columns: GridColDef[] = [

    { field: 'row', headerName: 'Row', width: 170 },
    { field: 'TokenSymbol', headerName: 'Asset', width: 280 },
    { field: 'Platform', headerName: 'Platform', width: 280 },
    { field: 'TokenPrice', headerName: 'Price', type: 'number', width: 270 },
     { field: 'WalletBalance', headerName: 'Balance', type: 'number', maxWidth: 80 },
     { field: 'USDValue', headerName: 'Total', type: 'number', maxWidth: 80 },
    { field: 'TokenAddress', headerName: 'Token Address',  maxWidth: 80 },
    { field: 'PossibleSpam', headerName: 'Possible Spam',  maxWidth: 80 },
  ];


  const newBalances = balances.map((item: any, index: number) => {
    return {
      row: index + 1,
      TokenSymbol: item.TokenSymbol,
      Platform: item.Platform,
      TokenPrice: item.TokenPrice,
      WalletBalance: item.WalletBalance,
      USDValue: item.USDValue,
      TokenAddress: item.TokenAddress,
      PossibleSpam: item.PossibleSpam,
    }
  })

console.log("newBalances", newBalances)

  return (
    <div style={{ maxHeight: 700, width: '100%' }}>
      <DataGrid
        rows={newBalances}
        columns={columns}

      />
    </div>
  );
}

export default Balances;