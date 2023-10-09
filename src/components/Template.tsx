import * as React from "react";
import FormGroup from "@mui/material/FormGroup";
import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export interface DarkModeSwitchProps {
  handleThemeModeSwitch: () => void;
  darkMode: boolean;
}

const DarkModeSwitch: React.FC<DarkModeSwitchProps> = ({ handleThemeModeSwitch, darkMode }) => {
  const handleChange = () => {
    handleThemeModeSwitch();
  };

  return <Switch checked={darkMode} onChange={handleChange} inputProps={{ "aria-label": "controlled" }} />;
};

export default DarkModeSwitch;
