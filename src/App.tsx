import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { MetaMaskContextProvider } from "./hooks/useMetaMask";
import Landing from "./components/Landing";
import Spinner from "./components/Spinner";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import axios from "axios";

import getTheme from "./theme";
import colors from './colors';


const App: React.FC = () => {

  let color = colors[0].value;
  const [darkMode, setDarkMode] = useState(false);
  const [themeColor, setThemeColor] = React.useState<any>(color);
  const handleThemeModeSwitch = () => {
    setDarkMode(!darkMode);
  };
  const handleThemeColorChange = (newValue: string) => {
    setThemeColor(newValue);
  };

  const theme = getTheme(darkMode, themeColor);
  return (



    <MetaMaskContextProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
              <Route path="/" element={<Landing handleThemeModeSwitch={handleThemeModeSwitch} darkMode={darkMode} handleThemeColorChange={handleThemeColorChange} themeColor={themeColor}  />} />
              <Route path="/oauth/callback" element={<Landing handleThemeModeSwitch={handleThemeModeSwitch} darkMode={darkMode} handleThemeColorChange={handleThemeColorChange} themeColor={themeColor} />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </MetaMaskContextProvider>

  );
};
export default App;
