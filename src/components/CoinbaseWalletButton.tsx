import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import WalletButtonChip from "./WalletButtonChip";
import { Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import { useMetaMask } from "../hooks/useMetaMask";

interface CoinbaseWalletButtonProps {
  coinbaseUser: any;
  coinbaseLogin: () => void;
  handleBackdropSetting: () => void;
}

const CoinbaseWalletButton: React.FC<CoinbaseWalletButtonProps> = ({ coinbaseUser, coinbaseLogin, handleBackdropSetting }) => {
  const handleCoinbaseLogin = () => {
    coinbaseLogin();
    handleBackdropSetting();
  };
  const { wallet, hasProvider, isConnecting, connectMetaMask, ens } = useMetaMask();
  return (
    <div>

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
          onClick={connectMetaMask}
          startIcon={<WalletButtonChip assetName="coinbase_wallet_logo" />}
        >
          <Typography variant="h5"> Coinbase Wallet </Typography> &nbsp; <Typography variant="subtitle1"></Typography>
        </Button>

    </div>
  );
};

export default CoinbaseWalletButton;
