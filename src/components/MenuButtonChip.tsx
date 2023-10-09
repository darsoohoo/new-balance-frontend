import React from "react";
import Chip from "@mui/material/Chip";
import Icon from "@mui/icons-material/ArrowDropDown";
import { styled } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import WorkIcon from "@mui/icons-material/Work";
interface MenuButtonChipProps {
  Icon: any;
}

const MenuButtonChip: React.FC<MenuButtonChipProps> = ({ Icon }) => {
  const CustomChip = styled(Chip)(({ theme }) => ({
    "& .MuiChip-avatar": {
      marginLeft: "46%",
      backgroundColor: "rgb(233, 237, 242)",
      hoverBackgroundColor: "rgb(233, 237, 242)",
      color: "rgb(0, 34, 55)",
    },
    height: "40px",
    backgroundColor: "rgb(233, 237, 242)",
  }));

  const handleClick = () => {
    console.info("You clicked the Chip.");
  };

  return (
    <CustomChip
      id="demo-customized-button"
      size="medium"
      avatar={
        <Avatar>
          <Icon />
        </Avatar>
      }
      variant="filled"
      label=""
      onClick={handleClick}
    />
  );
};

export default MenuButtonChip;
