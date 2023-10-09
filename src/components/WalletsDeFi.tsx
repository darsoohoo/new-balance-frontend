import * as React from "react";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";
import CoinbaseWalletButton from "./CoinbaseWalletButton";
import WalletConnectButton from "./WalletConnectButton";
import  MetaMaskButton  from "./MetaMaskButton";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import "./Wallets.css";
import WalletButtonChip from "./WalletButtonChip";
import ExitChip from "./ExitChip";
import Typography from "@mui/material/Typography";
import WalletBox from "./WalletBox";
import ButtonBase from "@mui/material/ButtonBase";
import ErrorModal from "./ErrorModal";

interface WalletsDeFiProps {
  windowWidth: number;
  coinbaseUser: any;
  removeBorder: string;
  handleBackdropSetting: () => void;
  coinbaseLogin: () => void;
  handleGetData: () => void;
  handleShowErrorModalChange: () => void;
  showErrorModal: boolean;
  wallet: any;
}

const WalletsDeFi: React.FC<WalletsDeFiProps> = ({
  windowWidth,
  coinbaseUser,
  removeBorder,
  handleBackdropSetting,
  coinbaseLogin,
  handleGetData,
  handleShowErrorModalChange,
  showErrorModal,
  wallet
}) => {
  const theme = useTheme();


  const handleGetDataClick = () => {
    console.log("1. HANDLING GET DATA CLICK:");
    if (wallet.accounts[0]) {
      console.log("1.1 Getting defi data")
      handleGetData();
    } else {
      console.log("1.2 wallet.acounts", wallet.accounts)
      console.log("1.3. Wallet accounts not found. Please connect to an exchange")
      //alert("Please connect to an exchange");
      handleShowErrorModalChange();
    }

  };



  return (
    <WalletBox>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="stretch"
        spacing={1}
        tabIndex={0}
        style={{
          border: "gold solid" + removeBorder,
          minWidth: "180px",
          paddingBottom: "10px",
        }}
      >
        <ErrorModal handleShowErrorModalChange={handleShowErrorModalChange} showErrorModal={showErrorModal}
          errorMessage="Please connect a Web3 wallet first" />
        <Stack direction="row" alignItems="flex-start" justifyContent="space-between">
          <Typography variant="h5">Connect a Web3 wallet</Typography>
        </Stack>
        <Stack direction="column" justifyContent="center" alignItems="stretch" spacing={1}>
          <MetaMaskButton  />
          <CoinbaseWalletButton coinbaseUser={coinbaseUser} coinbaseLogin={coinbaseLogin} handleBackdropSetting={handleBackdropSetting} />
          <WalletConnectButton coinbaseUser={coinbaseUser} coinbaseLogin={coinbaseLogin} handleBackdropSetting={handleBackdropSetting} />
         
        </Stack>

  

        <ButtonBase
          style={{
            borderRadius: "10px",
            height: "45px",
            padding: "10px",
            width: "100%",
            border: "1px solid darkgrey"
          }}
          onClick={handleGetDataClick}
        >
          <Typography variant="h5">Get Data</Typography>
        </ButtonBase>
      </Stack>
    </WalletBox>
  );
};

export default WalletsDeFi;
