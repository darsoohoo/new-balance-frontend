import React from "react";
import Chip from "@mui/material/Chip";
import Icon from "@mui/icons-material/ArrowDropDown";
import { styled, alpha, useTheme } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import WorkIcon from "@mui/icons-material/Work";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

interface Props {
  children: React.ReactNode;
  handleClick: () => void;
}

const ConnectButton: React.FC<Props> = ({ children, handleClick }) => {
  const theme = useTheme();

  const CustomButton = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1F2328" : "#D7DCE5", // Your custom styles here
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "15px",
    color: theme.palette.text.primary,
    height: "40px",
    boxShadow: "none",
    fontFamily: "Varela Round, sans-serif", // Your custom font
    disableElevation: true,
  }));

  const onClick = () => {
    console.info("You clicked the Chip.");
    handleClick();
  };

  return <CustomButton onClick={onClick}>{children}</CustomButton>;
};

export default ConnectButton;
