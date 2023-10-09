import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import WalletButtonChip from "./WalletButtonChip";
import { Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import { useMetaMask } from "../hooks/useMetaMask";

interface WalletConnectButtonProps {
  coinbaseUser: any;
  coinbaseLogin: () => void;
  handleBackdropSetting: () => void;
}

const WalletConnectButton: React.FC<WalletConnectButtonProps> = ({ coinbaseUser, coinbaseLogin, handleBackdropSetting }) => {
  const handleCoinbaseLogin = () => {
    coinbaseLogin();
    handleBackdropSetting();
  };
  const { wallet, hasProvider, isConnecting, connectMetaMask, ens } = useMetaMask();
  return (
    <div>

        <Button
        disabled
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            paddingLeft: "15px",
            height: "55px",
          }}
          variant="contained"
          disableElevation={true}
          onClick={connectMetaMask}
          startIcon={<WalletButtonChip assetName="wallet_connect_logo" />}
        >
        <Typography variant="h5"> WalletConnect  </Typography> &nbsp; &nbsp; <Typography variant="subtitle1">(coming soon...)</Typography>
        </Button>

    </div>
  );
};

export default WalletConnectButton;
