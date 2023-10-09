import Button from "@mui/material/Button";
import ButtonBase from "@mui/material/ButtonBase";
import Paper from "@mui/material/Paper";
import WalletButtonChip from "./WalletButtonChip";
import { Typography } from "@mui/material";
import WalletButtonWrap from "./WalletButtonWrap";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { useMetaMask } from "../hooks/useMetaMask";
import { formatAddress } from "../utils";
import { useEffect, useState } from "react";


interface MetaMaskButtonProps {
  // ens: string | null
}

const MetaMaskButton: React.FC<MetaMaskButtonProps> = () => {
  const { wallet, hasProvider, isConnecting, connectMetaMask, ens } = useMetaMask();


  return (
    <div>
      {!hasProvider && (
                <Button
                href="https://metamask.io" rel="noreferrer" target="_blank"
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  paddingLeft: "15px",
                  height: "55px",
                }}
                variant="contained"
                disableElevation={true}
                startIcon={<WalletButtonChip assetName="metamask_logo" />}
   

              >
                {/* Your content goes here */}
                <Typography variant="h5"> Install MetaMaskk</Typography>
              </Button>
       
  
   
      )}

      {window.ethereum?.isMetaMask && wallet.accounts.length < 1 && (
        <Button
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            paddingLeft: "15px",
            height: "55px",
          }}
          variant="contained"
          disableElevation={true}
          startIcon={<WalletButtonChip assetName="metamask_logo" />}
          disabled={isConnecting}
          onClick={connectMetaMask}
        >
          {/* Your content goes here */}
          <Typography variant="h5">MetaMask</Typography>
        </Button>
      )}

      {hasProvider && wallet.accounts.length > 0 && (
        <Button
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            paddingLeft: "15px",
            height: "55px",
          }}
          variant="contained"
          disableElevation={true}
          startIcon={<WalletButtonChip assetName="metamask_logo" />}
        >
          <Typography variant="h5">Connected  {ens!==''? ens : formatAddress(wallet.accounts[0])}</Typography>
        </Button>
      )}
    </div>
  );
};

export default MetaMaskButton;
