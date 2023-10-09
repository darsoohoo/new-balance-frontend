import * as React from "react";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";
import CoinbaseAccountButton from "./CoinbaseAccountButton";
import CoinbaseWalletButton from "./CoinbaseWalletButton";
import MetaMaskButton from "./MetaMaskButton";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import "./Wallets.css";
import WalletButtonChip from "./WalletButtonChip";
import ExitChip from "./ExitChip";
import Typography from "@mui/material/Typography";
import WalletBox from "./WalletBox";
import ButtonBase from "@mui/material/ButtonBase";

interface WalletsProps {
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
}

const Wallets: React.FC<WalletsProps> = ({
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
}) => {
  const theme = useTheme();

  const handleGetDataClick = () => {
    console.log("HANDLING GET DATA CLICK:");
    handleGetData();
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
        <Stack direction="row" alignItems="flex-start" justifyContent="space-between">
          <Typography variant="h4">Connect Wallet</Typography>
          <ExitChip />
        </Stack>
        <Stack direction="column" justifyContent="center" alignItems="stretch" spacing={1}>
          <MetaMaskButton />

          <CoinbaseAccountButton coinbaseUser={coinbaseUser} coinbaseLogin={coinbaseLogin} handleBackdropSetting={handleBackdropSetting} />
          <CoinbaseWalletButton coinbaseUser={coinbaseUser} coinbaseLogin={coinbaseLogin} handleBackdropSetting={handleBackdropSetting} />
        </Stack>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1}
          style={{
            maxWidth: "100%",
          }}
        >
          <Paper elevation={0} component="form" sx={{ p: "4px 10px 4px 10px", width: "100%", border: "1px solid darkgray", height: "40px" }}>
            <InputBase
              id="filled-search3"
              placeholder="Binance Api Key"
              inputProps={{ "aria-label": "search google maps" }}
              value={binanceApiKey}
              type="search"
              onChange={onBinanceApiKeyChange}
            />
          </Paper>

          <Paper elevation={0} component="form" sx={{ p: "4px 10px 4px 10px", width: "100%", border: "1px solid darkgray", height: "40px", backgroundColor: "transparent" }}>
            <InputBase id="filled-search4" placeholder="Binance Api Secret" value={binanceApiSecret} type="search" onChange={onBinanceApiSecretChange} />
          </Paper>
        </Stack>

        <ButtonBase
          style={{
            borderRadius: "7px",
            height: "55px",
            padding: "10px",
            width: "100%",
          }}
          onClick={handleGetDataClick}
        >
          <Typography variant="h5">Get Data</Typography>
        </ButtonBase>
      </Stack>
    </WalletBox>
  );
};

export default Wallets;
