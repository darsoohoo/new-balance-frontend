import React from "react";
import Chip from "@mui/material/Chip";
import Icon from "@mui/icons-material/Settings";
import { styled, alpha } from "@mui/material/styles";


interface SettingsChipProps {
  handleOpenSettingsDrawer: () => void;
}

const CustomChip = styled(Chip)(({ theme }) => ({
  height: "45px",
  width: "45px",
  backgroundColor: "transparent",
  border: "none",
  borderRadius: "50px",
  "& .MuiChip-icon": {
    marginLeft: "45%",
    height: "45px",
    width: "45px",
  },
  "&:hover": {
    backgroundColor: alpha("#1F2328", 0.5), // Set the background color on hover
    height: "45px",
    width: "45px",
},
}));

const SettingsChip: React.FC<SettingsChipProps> = ({ handleOpenSettingsDrawer }) => {
  const handleOnClick = () => {
    handleOpenSettingsDrawer();
  };
  return <CustomChip id="demo-customized-button" size="medium" variant="outlined" label="" onClick={handleOnClick} icon={<Icon />} />;
};

export default SettingsChip;
