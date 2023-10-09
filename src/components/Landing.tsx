import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import "../App.css";
// import { useLocation } from 'react-router-dom';
import { ThemeProvider, useTheme } from "@mui/material/styles";

import { styled, alpha } from "@mui/material/styles";
import Menu, { MenuProps } from "@mui/material/Menu";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
// import { useMetaMask } from '../hooks/useMetaMask';
// import { QueryParams } from './types';

// import LoadingBackdrop from './LoadingBackdrop';
import Navigation from "./Navigation";
// import mockData from '../../../mockDataTs';
import { CssBaseline } from "@mui/material";
import { WalletDisplayContextProvider } from "../hooks/useWalletDisplay";

export interface LandingProps {
  handleThemeModeSwitch: any;
  darkMode: boolean;
  handleThemeColorChange: any;
  themeColor: string;

}

interface LocationState {
  userData: string | null;
}

interface URLSearchParams {
  get: (key: string) => string | null;
}

const Landing: React.FC<LandingProps> = ({ handleThemeModeSwitch, darkMode, handleThemeColorChange, themeColor }) => {
 
  const [testMode, setTestMode] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);


  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleTestModeChange = () => {
    setTestMode(!testMode);
  };

  const removeBorder = testMode === false ? "none" : "";
  const theme = useTheme();
  return (

      <WalletDisplayContextProvider>
        <CssBaseline />
        <Box
          style={{

            paddingRight: "10px",
            paddingLeft: "35px",
            border: "red dashed 12px" + removeBorder,
            minHeight: "100vh",
            width: `${windowWidth - 20}px`,
            backgroundColor: theme.palette.background.default,
          }}
        >
          <Navigation
            handleTestModeChange={handleTestModeChange}
            testMode={testMode}
            darkMode={darkMode}
            handleThemeModeSwitch={handleThemeModeSwitch}
            removeBorder={removeBorder}
          handleThemeColorChange={handleThemeColorChange}
          themeColor={themeColor}
      
          />
        </Box>
      </WalletDisplayContextProvider>

  );
};
export default Landing;
