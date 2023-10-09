import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import WalletButtonChip from "./WalletButtonChip";
import { Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import Hidden from "@mui/material/Hidden";

interface CoinbaseAccountButtonProps {
  coinbaseUser: any;
  coinbaseLogin: () => void;
  handleBackdropSetting: () => void;
}

const CoinbaseAccountButton: React.FC<CoinbaseAccountButtonProps> = ({ coinbaseUser, coinbaseLogin, handleBackdropSetting }) => {
  const handleCoinbaseLogin = () => {
    coinbaseLogin();
    handleBackdropSetting();
  };

  return (
    <div>
      {coinbaseUser ? (
        <Button
          startIcon={<WalletButtonChip assetName="coinbase_logo" />}
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            paddingLeft: "15px",
            height: "55px",
          }}
          variant="contained"
          sx={{ border: "none" }}
          onClick={coinbaseLogin}
        >
          <Stack direction="row">
            <Typography variant="h5">Connected {coinbaseUser.data.name}...</Typography>
          </Stack>
        </Button>
      ) : (
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
          onClick={handleCoinbaseLogin}
          startIcon={<WalletButtonChip assetName="coinbase_logo" />}
        >
          <Typography variant="h5"> Coinbase</Typography>
        </Button>
      )}
    </div>
  );
};

export default CoinbaseAccountButton;
