import { Box } from "@mui/material";
import { styled } from "@mui/system";

const NewBox = styled(Box)(({ theme }) => ({
  // Your custom styles here
  backgroundColor: theme.palette.background.paper,
  borderRadius: "3%",
  padding: "15px",
  width: "100%",

  // Add any other CSS properties you want to override.
}));

const WalletBox = ({ children }: any) => {
  return <NewBox>{children}</NewBox>;
};

export default WalletBox;
