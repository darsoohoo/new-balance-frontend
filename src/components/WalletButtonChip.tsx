import React from "react";
import Chip from "@mui/material/Chip";
import Icon from "@mui/icons-material/ArrowDropDown";
import { styled } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import WorkIcon from "@mui/icons-material/Work";

interface WalletButtonChipProps {
  assetName: string;
}

const CustomChip = styled(Chip)(({ theme }) => ({
  "& .MuiChip-avatar": {
    marginLeft: "46%",
    backgroundColor: "white",
    hoverColor: "white",
  },
  height: "40px",

  backgroundColor: "white",
}));

const WalletButtonChip: React.FC<WalletButtonChipProps> = ({ assetName }) => {
  const brandLogo = new URL(`../assets/${assetName}.png`, import.meta.url).href;
  const handleClick = () => {
    console.info("You clicked the Chip.");
  };

  return <CustomChip id="demo-customized-button" size="medium" avatar={<Avatar src={brandLogo}></Avatar>} variant="filled" label="" onClick={handleClick} />;
};

export default WalletButtonChip;
