import * as React from "react";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import Chip from "@mui/material/Chip";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import CoinbaseButton from "./CoinbaseAccountButton";
import { MetaMaskButton } from "./MetaMaskButton";
import Icon from "@mui/material/Icon";
import { visuallyHidden } from "@mui/utils";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import DirectionsIcon from "@mui/icons-material/Directions";
import DevIcon from "@mui/icons-material/LogoDev";
import FaceIcon from "@mui/icons-material/Face";
import SendIcon from "@mui/icons-material/Send";
import "./Wallets.css";
import WalletButtonChip from "./WalletButtonChip";
import ExitChip from "./ExitChip";
import Typography from "@mui/material/Typography";
import WalletBox from "./WalletBox";
import WalletButtonWrap from "./WalletButtonWrap";
import { Wallet } from "ethers";
import ButtonBase from "@mui/material/ButtonBase";

interface ConnectWalletsProps {
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

const ConnectWallets: React.FC<ConnectWalletsProps> = ({
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

          <CoinbaseButton coinbaseUser={coinbaseUser} coinbaseLogin={coinbaseLogin} handleBackdropSetting={handleBackdropSetting} />
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

export default ConnectWallets;
