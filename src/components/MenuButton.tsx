import React from "react";
import Chip from "@mui/material/Chip";
import Icon from "@mui/icons-material/ArrowDropDown";
import { styled, useTheme } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import WorkIcon from "@mui/icons-material/Work";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

interface Props {
  children: React.ReactNode;
}

const MenuButton: React.FC<Props> = ({ children }) => {
  const theme = useTheme();
  const NewButton = styled(Box)(() => ({
    variant: "filled",
    borderRadius: "7px",
    height: "55px",
    padding: "10px",
    width: "100%",
    backgroundColor: theme.palette.mode === "dark" ? "#1F2328" : "white",
    "&:hover": {
      backgroundColor: theme.palette.mode === "dark" ? "#1F2328" : "#D7DCE5",
    },
    // Your custom styles here
  }));

  return (
    <NewButton>
      <Stack spacing={2} sx={{ width: "100%" }} direction="row" justifyContent={"flex-start"} alignItems={"center"}>
        {children}
      </Stack>
    </NewButton>
  );
};

export default MenuButton;
