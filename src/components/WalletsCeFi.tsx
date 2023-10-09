import * as React from "react";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";
import CoinbaseAccountButton from "./CoinbaseAccountButton";
import CoinbaseWalletButton from "./CoinbaseWalletButton";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import "./Wallets.css";
import WalletButtonChip from "./WalletButtonChip";
import ExitChip from "./ExitChip";
import Typography from "@mui/material/Typography";
import WalletBox from "./WalletBox";
import ButtonBase from "@mui/material/ButtonBase";
import ErrorModal from "./ErrorModal";

interface WalletsCeFiProps {
  windowWidth: number;
  coinbaseUser: any;
  removeBorder: string;
  binanceApiKey: string | undefined;
  binanceApiSecret: string | undefined;
  handleBackdropSetting: () => void;
  coinbaseLogin: () => void;
  handleGetData: () => void;
  handleBinanceApiKeyChange: (newValue: string) => void;
  handleBinanceApiSecretChange: (newValue: string) => void;
  handleShowErrorModalChange: () => void;
        showErrorModal: boolean;
}

const WalletsCeFi: React.FC<WalletsCeFiProps> = ({
  windowWidth,
  coinbaseUser,
  removeBorder,
  binanceApiKey,
  binanceApiSecret,
  handleBinanceApiKeyChange,
  handleBinanceApiSecretChange,
  handleBackdropSetting,
  coinbaseLogin,
  handleGetData,
  handleShowErrorModalChange,
  showErrorModal
}) => {
  const theme = useTheme();

  const handleGetDataClick = () => {
    console.log("HANDLING GET DATA CLICK:");
    if((binanceApiKey!=='' && binanceApiSecret!=='')|| coinbaseUser){
      handleGetData();
    } else {
      //alert("Please connect to an exchange");
      handleShowErrorModalChange();
    }

  };

  const onBinanceApiKeyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleBinanceApiKeyChange(event.target.value);
  };

  const onBinanceApiSecretChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleBinanceApiSecretChange(event.target.value);
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
        errorMessage="Please connect to at least one exchange first" />
        <Stack direction="row" alignItems="flex-start" justifyContent="space-between">
          <Typography variant="h5">Connect one or more exchanges</Typography>
        </Stack>
        <Stack direction="column" justifyContent="center" alignItems="stretch" spacing={1}>
          <CoinbaseAccountButton coinbaseUser={coinbaseUser} coinbaseLogin={coinbaseLogin} handleBackdropSetting={handleBackdropSetting} />
         
        </Stack>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1}
          style={{
            maxWidth: "100%",
          }}
        >
        
            <InputBase
              id="filled-search3"
              placeholder="Binance.US Api Key"
              inputProps={{ "aria-label": "search google maps" }}
              value={binanceApiKey}
              type="search"
              onChange={onBinanceApiKeyChange}
            />
   

        
            <InputBase id="filled-search4" placeholder="Binance.US Api Secret" value={binanceApiSecret} type="search" onChange={onBinanceApiSecretChange} />
        
        </Stack>

        <ButtonBase
          style={{
            borderRadius: "10px",
            height: "45px",
            padding: "10px",
            width: "100%",
            border: "1px solid darkgray",
          }}
          onClick={handleGetDataClick}
        >
          <Typography variant="h5">Get Data</Typography>
        </ButtonBase>
      </Stack>
    </WalletBox>
  );
};

export default WalletsCeFi;
