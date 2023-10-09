import { useMetaMask } from "../hooks/useMetaMask";
import { formatChainAsNum } from "../utils";
import ComponentBox from "./ComponentBox";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import MenuItem from '@mui/material/MenuItem';
import { useEffect , useState} from "react";

export const MetaMaskDisplay =  () => {
  const { wallet, ens} = useMetaMask();

  return (
    <>
      {wallet.accounts.length > 0 && (

   <>
        <MenuItem> <Typography variant='h5' sx={{  overflowWrap: 'break-word', 
    wordWrap: 'break-word', 
    wordBreak: 'break-all',
    whiteSpace: 'normal' }}>Wallet Accounts: {wallet.accounts[0]}</Typography></MenuItem>
        <MenuItem> <Typography variant='h5' sx={{ wordBreak: 'break-all' }}> ENS {ens}</Typography></MenuItem>
         <MenuItem> <Typography variant='h5' sx={{ wordBreak: 'break-all' }}>Wallet Balance: {wallet.balance}</Typography></MenuItem>
         <MenuItem> <Typography variant='h5' sx={{ wordBreak: 'break-all' }}>Hex ChainId: {wallet.chainId}</Typography></MenuItem>
         <MenuItem> <Typography variant='h5' sx={{ wordBreak: 'break-all' }}>Numeric ChainId: {formatChainAsNum(wallet.chainId)}</Typography></MenuItem>
   </>
    
    
      )}
    </>
  );
};
