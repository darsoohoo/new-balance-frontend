import * as React from "react";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import PersonOutline from "@mui/icons-material/PersonOutline";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ButtonBase from "@mui/material/ButtonBase";
import Switch, { SwitchProps } from "@mui/material/Switch";
import { styled, useTheme } from "@mui/material/styles";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import { DarkMode as DarkModeIcon } from "@mui/icons-material";
import { DarkModeOutlined as DarkModeOutlinedIcon } from "@mui/icons-material";
import { MetaMaskDisplay } from "./MetaMaskDisplay";
import Hidden from "@mui/material/Hidden";
import { useWalletDisplay } from "../hooks/useWalletDisplay";
import ConnectButton from "./ConnectButton";
import { useMetaMask } from "../hooks/useMetaMask";
import { formatAddress } from "../utils";
import MenuButton from "./MenuButton";
import Typography from "@mui/material/Typography";
import MenuButtonChip from "./MenuButtonChip";


interface TopRightToolbarProps {
  isLoaded: boolean;
  searched: boolean;
  performedSearch: boolean;
  coinbaseUser: any;
  tokenData: any;
  coinbaseUserLoggedIn: boolean;
  coinbaseURL: string;
  coinbaseAuthURL: string;
  developerMode: boolean;
  testMode: boolean;
  removeBorder: string;

  coinbaseLogin: () => void;
  handleBackdropSetting: () => void;
  storeToken: () => void;

  coinbaseLogout: () => void;

  windowWidth: number;
  darkMode: boolean;
  handleThemeModeSwitch: any;
}

interface CustomSwitchProps extends SwitchProps {
  sx?: any;
  checked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
}

const TopRightToolbar: React.FC<TopRightToolbarProps> = ({
  isLoaded,
  searched,
  performedSearch,
  removeBorder,
  coinbaseUser,

  coinbaseUserLoggedIn,
  coinbaseURL,
  coinbaseAuthURL,
  developerMode,
  testMode,
  coinbaseLogin,
  handleBackdropSetting,
  storeToken,
  coinbaseLogout,

  windowWidth,
  darkMode,
  handleThemeModeSwitch,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [profileDetailsAnchorEl, setProfileDetailsAnchorEl] = React.useState<null | HTMLElement>(null);
  const { isShowing, showDisplay, hideDisplay } = useWalletDisplay();
  const open = Boolean(anchorEl);
  const openProfileDetails = Boolean(profileDetailsAnchorEl);
  const { wallet, hasProvider, ens } = useMetaMask();

  const handleOpenTopRightToolbar = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };

  const handleOpenProfileDetails = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setProfileDetailsAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCloseProfileDetails = () => {
    setProfileDetailsAnchorEl(null);
  };

  const handleChange = (e: any) => {
    e.preventDefault();
    handleThemeModeSwitch();
  };

  const handleConnectWallet = () => {
    console.log("HANDLE CONNECT WALLET");
    !isShowing && showDisplay();
  };

  const CustomSwitch = styled((props) => (
    <Switch sx={{ m: 0 }} checked={true} onChange={handleThemeModeSwitch} focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
  ))(({ theme }) => ({
    width: 55,
    height: 29,
    padding: 0,
    borderRadius: 20,
    "& .MuiSwitch-switchBase": {
      padding: 0,
      border: "none",
      backgroundColor: "transparent",
      height: 25,
      width: 25,
      margin: 2,
      transitionDuration: "300ms",
      "&.Mui-checked": {
        transform: theme.palette.mode === "light" ? "translateX(100%)" : "translateX(0)",
        color: "#fff",
        "& + .MuiSwitch-track": {
          backgroundColor: theme.palette.primary.main,
          opacity: 1,
          border: 0,
        },
        "&.Mui-disabled + .MuiSwitch-track": {
          opacity: 0.5,
        },
      },
      "&.Mui-focusVisible .MuiSwitch-thumb": {
        color: "#33cf4d",
        border: "6px solid #fff",
      },
      "&.Mui-disabled .MuiSwitch-thumb": {
        color: theme.palette.mode === "light" ? theme.palette.grey[100] : theme.palette.grey[600],
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
      },
    },
    "& .MuiSwitch-thumb": {
      boxSizing: "border-box",
      width: 22,
      height: 22,
    },
    "& .MuiSwitch-track": {
      borderRadius: 26 / 2,
      backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
      opacity: 1,
      transition: theme.transitions.create(["background-color"], {
        duration: 500,
      }),
    },
  }));

  return (
    <Hidden smDown>
      <Stack direction="row" spacing={1}>
        {coinbaseUserLoggedIn ||
          (wallet.accounts.length > 0 && (
            <>
              <Chip id="top-right-toolbar-button" size="medium" variant="filled" onClick={handleOpenProfileDetails} icon={<PersonOutline />} />
              <Menu
                id="top-right-toolbar-button"
                MenuListProps={{
                  "aria-labelledby": "top-right-toolbar-button",
                }}
                anchorEl={profileDetailsAnchorEl}
                open={openProfileDetails}
                onClose={handleCloseProfileDetails}
              >
        
                
            
          
                        <MetaMaskDisplay />
                 
                
                 
            
             
              </Menu>
            </>
          ))}

     

      </Stack>
    </Hidden>
  );
};

export default TopRightToolbar;
