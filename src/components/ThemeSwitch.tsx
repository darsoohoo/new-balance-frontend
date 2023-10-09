import * as React from "react";
import { styled } from "@mui/material/styles";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch, { SwitchProps } from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

interface ThemeSwitchProps {
  // handleThemeModeSwitch: () => void;
  darkMode: boolean;
  onChange: () => void;
}
const NewSwitch = styled(Switch)(({ theme }) => ({}));

const ThemeSwitch: React.FC<ThemeSwitchProps> = ({ onChange, darkMode }) => {
  const handleChange = () => {
    onChange();
  };

  return <NewSwitch checked={darkMode} onChange={handleChange} />;
};

export default ThemeSwitch;
