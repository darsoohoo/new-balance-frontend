import Box from "@mui/material/Box";
import { styled } from "@mui/system";
import Paper from "@mui/material/Paper";

const NewBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper, // Your custom styles here
  border: "#D7DCE5 solid 1px",
  borderRadius: "10px",
  padding: "15px",

  // Add any other CSS properties you want to override.
}));

const ComponentBox = ({ children }: any) => {
  return (
    <NewBox>
      <Paper elevation={0} sx={{ overflow: "hidden", borderRadius: "10px", padding: "10px" }}>
        {children}
      </Paper>
    </NewBox>
  );
};

export default ComponentBox;
