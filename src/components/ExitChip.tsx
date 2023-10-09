import React from "react";
import Chip from "@mui/material/Chip";
import Icon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import { useWalletDisplay } from "../hooks/useWalletDisplay";

const CustomChip = styled(Chip)(({ theme }) => ({
  height: "30px",
  width: "30px",
  borderRadius: "7px",
  "& .MuiChip-icon": {
    marginLeft: "59%",
    height: "18px",
    width: "18px",
  },
}));

const ExitChip = (props: any) => {
  const { hideDisplay } = useWalletDisplay();

  return <CustomChip id="demo-customized-button" size="medium" variant="filled" label="" onClick={hideDisplay} icon={<Icon />} />;
};

export default ExitChip;
