import { styled } from "@mui/system";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";

const CustomBox = styled(ButtonBase)(({ theme }) => ({
  // Your custom styles here
  borderRadius: "7px",

  height: "55px",
  padding: "10px",
  width: "100%",
  display: "flex", // Add this line
  alignItems: "center", //

  // Add any other CSS properties you want to override.
}));

const WalletButtonWrap = ({ children }: any) => {
  return (
    <CustomBox>
      <Stack spacing={2} sx={{ width: "100%" }} direction="row" justifyContent={"flex-start"} alignItems={"center"}>
        {children}
      </Stack>
    </CustomBox>
  );
};

export default WalletButtonWrap;
