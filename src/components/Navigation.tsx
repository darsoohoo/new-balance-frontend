import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import FiberNewTwoToneIcon from "@mui/icons-material/FiberNewTwoTone";
import FiberNewRoundedIcon from "@mui/icons-material/FiberNewRounded";
import TopRightToolbar from "./TopRightToolbar";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useMetaMask } from "../hooks/useMetaMask";
import { QueryParams } from "./types";
import Hidden from "@mui/material/Hidden";
import Wallets from "./Wallets";


import Stats from "./Stats";
import Spinner from "./Spinner";
import InputBase from "@mui/material/InputBase";
import mockData from "../../../mockDataTs";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { useWalletDisplay } from "../hooks/useWalletDisplay";
import { DarkModeOutlined as DarkModeOutlinedIcon } from "@mui/icons-material";
import SettingsChip from "./SettingsChip";
import CloseIcon from "@mui/icons-material/Close";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Icon from "@mui/material/Icon";
import useBinanceData from "../hooks/useBinanceData";
import useCoinbaseData from "../hooks/useCoinbaseData";
import useDefiData from "../hooks/useDefiData";
import NFTList from "./NFTList";
import ViewTab from "./ViewTabs";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import colors from "../colors";
import WalletsCeFi from "./WalletsCeFi";
import WalletsDeFi from "./WalletsDeFi";
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import ErrorModal from "./ErrorModal";
import BalancesTest from "./BalancesTest";
import Balances from "./Balances";
import FiatTransactionsOld from "./FiatTransactionsOld";
import FiatTransactions from "./FiatTransactions";

interface NavigationProps {
    testMode: boolean;
    removeBorder: string;
    darkMode: boolean;
    handleThemeModeSwitch: any;
    handleTestModeChange: any;
    handleThemeColorChange: any;
    themeColor: string;
}
const Navigation: React.FC<NavigationProps> = ({ testMode, removeBorder, darkMode, handleThemeModeSwitch, handleTestModeChange, handleThemeColorChange, themeColor }) => {


    const [developerMode, setDeveloperMode] = useState(false);
    const [backdropOpen, setBackdropOpen] = useState(false);
    const [usdTransactions, setUsdTransactions] = useState<any[]>([]);
    const [balances, setBalances] = useState<any[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [searched, setSearched] = useState(false);
    const [performedSearch, setPerformedSearch] = useState(false);
    const [dataBeingFetched, setDataBeingFetched] = useState("");
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [errorMessage, setErrorMessage] = useState("");
    const [coinbaseUser, setCoinbaseUser] = useState<any>(null);
    const [binanceApiKey, setBinanceApiKey] = useState("");
    const [binanceApiSecret, setBinanceApiSecret] = useState("");
    const [coinbaseAccessToken, setCoinbaseAccessToken] = useState("");
    const [coinbaseRefreshToken, setCoinbaseRefreshToken] = useState("");
    const [coinbaseUserLoggedIn, setCoinbaseUserLoggedIn] = useState(false);
    const [coinbaseURL, setCoinbaseURL] = useState("");
    const [selectedPlatforms, setSelectedPlatforms] = useState<any[]>([]);
    const [tokenData, setTokenData] = useState<any>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [persistentOpen, setPersistentOpen] = React.useState(true);
    const [selectedTab, setSelectedTab] = React.useState("Portfolio");
    const connectionSteps = ['Connect to one or more exchanges', 'Connect a Web3 wallet', 'Analyze your data'];
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [ensResponse , setEnsResponse] = useState<any>(null);

    const platforms = [
        { platform: "coinbase", abbr: "cb" },
        { platform: "binance", abbr: "bin" },
        { platform: "defi", abbr: "defi" },
    ];
    const transactionsTypes = ["buy", "sell", "deposit", "withdrawal", "send", "receive"];
    const assetTypes = ["token", "nft", "fiat"];
    const filterDate = new Date("2020-01-01").toISOString();
    const drawerWidth = 200;

    const { wallet, hasProvider, isConnecting, connectMetaMask, ens } = useMetaMask();
    const { binanceTransactions, getBinanceTransactions, binanceBalances, getBinanceBalances } = useBinanceData(filterDate, binanceApiKey, binanceApiSecret);
    const { coinbaseTransactions, getCoinbaseTransactions, coinbaseBalances, getCoinbaseBalances } = useCoinbaseData(filterDate, coinbaseAccessToken);
    const { defiTransactions, getDefiTransactions, defiBalances, getDefiBalances, defiNFTs, getNFTs } = useDefiData(wallet);
    const { isShowing, showDisplay, hideDisplay } = useWalletDisplay();
    const location = useLocation();
    const theme = useTheme();
    const coinbase_random_state = "poopee";
    const coinbase_account_access = "all";
    const coinbase_scope =
        "wallet:addresses:read,wallet:buys:read,wallet:sells:read,wallet:deposits:read,wallet:withdrawals:read,wallet:accounts:read,wallet:transactions:read,wallet:payment-methods:read,wallet:supported-assets:read,wallet:accounts:create,wallet:addresses:create,wallet:checkouts:read,wallet:deposits:read,wallet:notifications:read,wallet:orders:read,wallet:trades:read,wallet:transactions:read,wallet:transactions:request,wallet:user:read,wallet:withdrawals:read";
    const coinbaseAuthURL = `https://www.coinbase.com/oauth/authorize?client_id=${import.meta.env.VITE_COINBASE_CLIENT_ID}&redirect_uri=${
        import.meta.env.VITE_COINBASE_REDIRECT_URL
    }&response_type=code&state=${coinbase_random_state}&account=${coinbase_account_access}&scope=${coinbase_scope}`;
    
    useEffect(() => {
        console.log("-----START USE EFFECT------");

        const getUserData = async () => {
            axios
                .get("/api/oauth/coinbase/user", {
                    headers: { access_token: coinbaseAccessToken ? coinbaseAccessToken : "" },
                })
                .then((response) => {
                    setCoinbaseUser(response.data);
                    setCoinbaseUserLoggedIn(true);
                    console.log("coinbaseUser", coinbaseUser);
                    console.log("coinbaseUserLoggedIn", coinbaseUserLoggedIn);
                })
                .catch((error) => {
                    console.log("ERROR", error);
                });
        };

        const setLogginParams = () => {
            const searchParams = new URLSearchParams(location.search);
            const accessToken = searchParams.get("accessToken");
            const refreshToken = searchParams.get("refreshToken");
            const state = searchParams.get("state");
            coinbaseAccessToken === "" && accessToken ? setCoinbaseAccessToken(accessToken ? accessToken : "") : console.log("acces token", accessToken)
            coinbaseUserLoggedIn === false && coinbaseAccessToken !== "" ? getUserData() : console.log("Not logged into Coinbase");
            if(coinbaseAccessToken !== "") {
                storeToken();

            }
        };

        setLogginParams();

        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };
        consolidateData();
        window.addEventListener("resize", handleResize);

        if (wallet.accounts[0]) {
          handleFindUser();
        }

       
        console.log("-----END USE EFFECT------");
    
        return () => {
            window.removeEventListener("resize", handleResize);
            setLogginParams();
       
    
      
        };
    }, [coinbaseTransactions, coinbaseBalances, binanceTransactions, binanceBalances, defiBalances, defiNFTs, coinbaseAccessToken]);


    const handleShowErrorModalChange = () => {
        setShowErrorModal(!showErrorModal);
    }
const onThemeColorChange = (event: SelectChangeEvent) => {
    console.log("setting theme color to ", event.target.value);
    handleThemeColorChange(event.target.value);
}
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };
    const handleSelectedTabChange = (newValue: string) => {
        setSelectedTab(newValue);
    };
    const handleBinanceApiKeyChange = (newValue: string) => {
        setBinanceApiKey(newValue);
    };

    const handleBinanceApiSecretChange = (newValue: string) => {
        setBinanceApiSecret(newValue);
    };
    const handleBackdropSetting = () => {
        setBackdropOpen(!backdropOpen);
    };
    const handleDeveloperModeChange = () => {
        setDeveloperMode(!developerMode);
    };
    const handleCoinbaseAccessTokenChange = (e: any) => {
        setCoinbaseAccessToken(e.target.value);
    };

    const handleGetBinanceTransactions = async () => {
        console.log("1. handleGetBinanceTransactions");
        try {
            await getBinanceTransactions();
        } catch (error) {
            console.log("there was an error trying to get binance accounts", error);
        }
        console.log("3. binanceTransactions", binanceTransactions);
        setUsdTransactions([...usdTransactions, ...binanceTransactions]);
    };

    const handleGetBinanceBalances = async () => {
        console.log("1. handleGetBinanceAccounts");
        try {
            await getBinanceBalances();
        } catch (error) {
            console.log("there was an error trying to get binance accounts", error);
        }
        console.log("3. binanceBalances", binanceBalances);
        setBalances([...balances, ...binanceBalances]);
    };
    const handleGetCoinbaseTransactions = async () => {
        console.log("1. handleGetCoinbaseTransactions");
        try {
            await getCoinbaseTransactions();
        } catch (error) {
            console.log("there was an error trying to get Coinbase accounts", error);
        }
        console.log("3.coinbaseTransactions", coinbaseTransactions);
        setUsdTransactions([...usdTransactions, ...coinbaseTransactions]);
    };

    const handleGetCoinbaseBalances = async () => {
        console.log("1. handleGetCoinbaseBalances");
        try {
            await getCoinbaseBalances();
        } catch (error) {
            console.log("there was an error trying to get Coinbase accounts", error);
        }
        console.log("3. CoinbaseBalances", coinbaseBalances);
        setBalances([...balances, ...coinbaseBalances]);
    };

    const handleGetDefiBalances = async () => {
        if (wallet.accounts[0] === "") {
            const message = "Please connect your defi wallet to view your Defi balances";
            window.alert(message);
        } else {
            try {
                await getDefiBalances(wallet.accounts[0]);
            } catch (error) {
                console.log("there was an error trying to get defi balances", error);
            }
        }
        setBalances([...balances, ...defiBalances]);
    };

    const handleGetNFTs = async () => {
        console.log("1. HANDLING FGET NFTS");
        if (wallet.accounts[0] === "") {
            const message = "Please connect your defi wallet to view your NFTs";
            window.alert(message);
        } else {
            try {
                await getNFTs(wallet.accounts[0]);
            } catch (error) {
                const message = "You got this NFT error that says: " + error;
                window.alert(message);
            }
        }
    };

    

    const handleGetData = async () => {
        console.log("GETTING DATA");
        setIsLoading(true);

        try {
            if (binanceApiKey !== "" && binanceApiSecret !== "") {
                setDataBeingFetched("Binance transactions");
                await handleGetBinanceTransactions();
                setDataBeingFetched("Binance accounts");
                await handleGetBinanceBalances();
            }
            if (coinbaseAccessToken !== "") {
                setDataBeingFetched("Coinbase transactions");
                await handleGetCoinbaseTransactions();
                setDataBeingFetched("Coinbase accounts");
                await handleGetCoinbaseBalances();
            }

            if (wallet.accounts[0]) {
                setDataBeingFetched("DeFi balances");
                await handleGetDefiBalances();
            }
            if (wallet.accounts[0]) {
                setDataBeingFetched("NFTs");
                await handleGetNFTs();
            }
            setIsLoading(false);
            setDataBeingFetched("");
            setIsLoaded(false);
            setSearched(true);
        } catch (error) {
            const message = "Please connect your defi wallet to view your Defi balances";
            window.alert(message);
        }

        await consolidateData();
    };


    const handleGetCeFiData = async () => {
        console.log("GETTING DATA");
        setIsLoading(true);

        try {
            if (binanceApiKey !== "" && binanceApiSecret !== "") {
                setDataBeingFetched("Binance transactions");
                await handleGetBinanceTransactions();
                setDataBeingFetched("Binance accounts");
                await handleGetBinanceBalances();
            }
            if (coinbaseAccessToken !== "") {
                setDataBeingFetched("Coinbase transactions");
                await handleGetCoinbaseTransactions();
                setDataBeingFetched("Coinbase accounts");
                await handleGetCoinbaseBalances();
            }

          
            setIsLoading(false);
            setDataBeingFetched("");
            setIsLoaded(false);
            setSearched(true);
        } catch (error) {
            const message = "Please connect your Cefi wallet to view your Cefi balances";
            window.alert(message);
        }

        await consolidateData();
    };


    const handleGetDeFiData = async () => {
        console.log("GETTING DATA");
        setIsLoading(true);

        try {

            if (wallet.accounts[0]) {
                setDataBeingFetched("DeFi balances");
                await handleGetDefiBalances();
            }
            if (wallet.accounts[0]) {
                setDataBeingFetched("NFTs");
                await handleGetNFTs();
            }
            setIsLoading(false);
            setDataBeingFetched("");
            setIsLoaded(false);
            setSearched(true);
        } catch (error) {
            const message = "Please connect your defi wallet to view your Defi balances";
            window.alert(message);
        }

        await consolidateData();
    };

    const handleGetThemeColor = async () => {
        console.log("GETTING USER");
        const headers = {
            "content-type":"application/json"
        }
        const data = {
            value: "green"
        }
 
        
        try {
          await axios.get("/api/theme/", {headers})
            .then((response) => {
                console.log("RESPONSE DATA", response.data);
            })
        } catch (error) {
            console.log("there was an error trying to get user data", error);
        }
    }

    const handleUpdateThemeColor = async () => {
        console.log("UPDATING THEME COLOR TO ", themeColor);
        const headers = {
            "content-type":"application/json"
        }
        const data = {
            value: themeColor
        }
 
        
        try {
          await axios.post("/api/theme/add", {headers, data})
            .then((response) => {
                console.log("RESPONSE DATA", response.data);
            })
        } catch (error) {
            console.log("there was an error trying to get user data", error);
        }
    }


    const handleFindUser = async () => {
        console.log("GETTING USER");
        const headers = {
            "content-type":"application/json"
        }
        const data = {
            "name": "metamask",
            metamask_address: "0xaC3283c87A6fF8512Ea3D90812854cdeeBF05117"
        }
        
        try {
          await axios.get("/api/users/find", {headers, data})
            .then((response) => {
                console.log("RESPONSE DATA", response.data);
            })
        } catch (error) {
            console.log("there was an error trying to get user data", error);
        }
    }

    const handleCreateUser = async () => {
        console.log("GETTING USER");
        const headers = {
            "content-type": "application/json"
        }
        const data = {
            name: "hithere234",
            metamask_address: "0xaC3283c87A6fF8512Ea3D90812854cdeeBF05117"
        }
        try {
            await axios.post("/api/users/create",{ headers, data})
                .then((response) => {
                    console.log("RESPONSE DATA", response.data);
                })
        } catch (error) {
            console.log("there was an error trying to get user data", error);
        }
    }

    const consolidateData = async () => {
        console.log("consolidating data");
        setUsdTransactions([...coinbaseTransactions, ...binanceTransactions]);
        setBalances([...coinbaseBalances, ...binanceBalances, ...defiBalances]);
    };

    const reformatDate = (dateString: string) => {
        const date = new Date(dateString);
        const day = String(date.getUTCDate()).padStart(2, "0");
        const month = String(date.getUTCMonth() + 1).padStart(2, "0");
        const year = date.getUTCFullYear();
        return `${month}-${day}-${year}`;
    };

    const coinbaseLogin = () => {
        try {
            window.location.href = coinbaseAuthURL;
        } catch (error) {
            console.error("Error:", error);
            // Display error message to the user
            throw new Error("Unable to redirect to Coinbase OAuth page.");
        }
    };
    const coinbaseLogout = async () => {
        // IF THIS FUNCTION DOES WORK USING FETCH, TRY WINDOW RDIRECT INSTEAD OF AXIOS
        console.log(" LOGGIN OUT OF COINBASE FROM LANDING");
        console.log("1.1 SEND ACCESS TOKEN TO SERVER WHICH IS STORED IN LOCAL STORAGE", localStorage.getItem("coinbaseAccessToken"));
        axios
            .get("/api/oauth/coinbase/logout", {
                headers: {
                    access_token: `${localStorage.getItem("coinbaseAccessToken")}`,
                },
            })
            .then((response) => {
                console.log("RESPONSE DATA", response.data);
                localStorage.clear();
                localStorage.setItem("coinbaseAccessToken", "");
                setCoinbaseUser(null);
                setCoinbaseUserLoggedIn(false);
                setCoinbaseAccessToken("");
            
                console.log("coinbaseUser", coinbaseUser);
            })
            .catch((error) => {
                console.log("ERROR", error);
            });
    };

    const storeToken = async () => {
        console.log("STORING TOKEN");
        const urlParams = new URLSearchParams(window.location.search);
        const accessToken: any = urlParams.get("accessToken");
        const refreshToken: any = urlParams.get("refreshToken");
        const randomState: any = urlParams.get("state");
        console.log("randomState is", randomState);

        if (accessToken !== null && randomState === coinbase_random_state) {
            try {
                const decodedAccessToken = decodeURIComponent(accessToken);
                console.log("decodedAccessToken:", decodedAccessToken);
                const decodedRefreshToken = decodeURIComponent(refreshToken);
                console.log("decodedRefreshToken:", decodedRefreshToken);

                localStorage.setItem("coinbaseAccessToken", decodedAccessToken);
                localStorage.setItem("coinbaseRefreshToken", decodedRefreshToken);
                setCoinbaseAccessToken(decodedAccessToken);
                // setCoinbaseRefreshToken(decodedRefreshToken)
                console.log("LOCAL STORAGE AFTER STORING", localStorage);
            } catch (error) {
                console.error("No token dat found in url params:", error);
            }
        } else {
            console.log("tokenDataParam is missing or empty");
        }
    };

    const clearPlatforms = () => {
        setSelectedPlatforms([]);
        console.log("selectedPlatforms", selectedPlatforms);
    };

    const checkVariables = () => {
        console.log("-----------START CHECK VARIABLES-----------");
        console.log("COINBASE USER...", coinbaseUser);
        console.log("COINBASE USER LOGGED IN...", coinbaseUserLoggedIn);
        console.log("BINANCE API KEY...", binanceApiKey);
        console.log("BINANCE API SECRET...", binanceApiSecret);
        console.log("COINBASE ACCESS TOKEN...", coinbaseAccessToken);
        console.log("WALLET...", wallet);
        console.log("WALLET ACCOUNTS LENGTH...", wallet.accounts.length);
        console.log("platforms...", platforms);
        console.log("selectedPlatforms...", selectedPlatforms);
        //    console.log("binance transactions...", binanceTransactions);
        console.log("binance accounts ...", binanceBalances);
        console.log("coinbase transactions...", coinbaseTransactions);
        console.log("coinbase accounts ...", coinbaseBalances);
        console.log("balances", balances);
        console.log("TRANSACTIONS", usdTransactions);
        console.log("ens", ens);
        console.log("defi accounts ...", defiBalances);
        console.log("defi transsactions ...", defiTransactions);
        console.log("defi nfts ...", defiNFTs);

        console.log("-----------END OF CHECK VARIABLES-----------");
    };

    const Main = styled("main", {
        shouldForwardProp: (prop) => prop !== "open",
    })<{
        open?: boolean;
    }>(({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,

        paddingLeft: `${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create("margin", {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
        }),
    }));

    interface AppBarProps extends MuiAppBarProps {
        open?: boolean;
    }

    const AppBar = styled(MuiAppBar, {
        shouldForwardProp: (prop) => prop !== "open",
    })<AppBarProps>(({ theme, open }) => ({
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        ...(open && {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: `${drawerWidth}px`,
            transition: theme.transitions.create(["margin", "width"], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
        }),
    }));

    const DrawerHeader = styled("div")(({ theme }) => ({
        display: "flex",
        alignItems: "center",
        padding: theme.spacing(0, 3),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: "flex-start",
    }));

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const handleOpenTopRightToolbar = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleConnectWallet = () => {
        console.log("HANDLE CONNECT WALLET");
        !isShowing && showDisplay();
    };
    const [showSettingsDrawer, setShowSettingsDrawer] = useState(false);
    const handleOpenSettingsDrawer = () => {
        setShowSettingsDrawer(true);
    };
    const handleCloseSettingsDrawer = () => {
        setShowSettingsDrawer(false);
    };

    const drawer = (
        <div>
            <DrawerHeader
                sx={{
                    border: "solid yellow 5px" + removeBorder,
                    display: {
                        xs: open ? "flex none" : "flex block",
                        sm: open ? "flex none" : "flex block",
                        md: "flex block",
                    },
                    width: drawerWidth,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: drawerWidth,
                        boxSizing: "border-box",
                    },
                    //  display: 'flex',  // Add this line
                    alignItems: "center", // Vertically center the content
                    justifyContent: "flex-start", // Horizontally center the content
                }}
            >
                <IconButton color="primary" aria-label="open drawer" edge="start" onClick={handleDrawerClose}>
                    <FiberNewRoundedIcon />
                </IconButton>
            </DrawerHeader>
            <Divider />

            <List>
                {[
                    { label: "Home", icon: "home" },
                    { label: "My Profile", icon: "account_circle_outlined" },
                    { label: "DeFi", icon: "currency_bitcoin" },
                    { label: "CeFi", icon: "currency_exchange" },
                    { label: "Send Crypto", icon: "move_down" },
                ].map((item, index) => (
                    <ListItem key={item.label}>
                        <ListItemButton>
                            <Icon>{item.icon}</Icon>
                            <ListItemText
                                style={{ marginLeft: "10px" }}
                                primary={
                                    <span
                                        style={{
                                            fontFamily: "roboto, sans-serif",
                                            fontSize: "16px",
                                            color: theme.typography.h5.color,
                                            fontWeight: "bolder",
                                        }}
                                    >
                                        {item.label}
                                    </span>
                                }
                            />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </div>
    );
    const settingsDrawerWidth = 200;
    const settingsDrawer = (
        <div>
            <DrawerHeader
                sx={{
                    border: "solid blue 5px" + removeBorder,
                    display: {
                        xs: open ? "flex none" : "flex block",
                        sm: open ? "flex none" : "flex block",
                        md: "flex block",
                    },
                    width: settingsDrawerWidth,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: settingsDrawerWidth,
                        boxSizing: "border-box",
                    },
                    alignItems: "center", // Vertically center the content
                    justifyContent: "flex-start", // Horizontally center the content
                }}
            >
                <Stack sx={{ width: "100%" }} direction="row" alignItems={"center"} justifyContent={"space-between"}>
                    <Typography variant="subtitle1">Settings</Typography>
                    <IconButton color="primary" aria-label="open drawer" edge="start" onClick={handleCloseSettingsDrawer}>
                        <CloseIcon />
                    </IconButton>
                </Stack>
            </DrawerHeader>
            <Divider />
            <Stack sx={{ width: "100%", padding: "15px" }} direction="column">
                <Typography variant="body1">Mode</Typography>
                <Stack direction="column" alignItems={"center"}>
                    <ToggleButtonGroup value={darkMode ? "dark" : "light"} onChange={handleThemeModeSwitch} aria-label="device" sx={{ width: "100%" }}>
                        <ToggleButton value="light" aria-label="light">
                            <Icon>light_mode</Icon>
                        </ToggleButton>
                        <ToggleButton value="dark" aria-label="dark">
                            {darkMode ? <Icon>dark_mode_outlined</Icon> : <DarkModeOutlinedIcon />}
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Stack>
            </Stack>

            {import.meta.env.DEV === true || wallet.accounts[0] && wallet.accounts[0].toLowerCase() === "0xaC3283c87A6fF8512Ea3D90812854cdeeBF05117".toLowerCase() ? (
                <Stack sx={{ width: "100%", padding: "15px" }} direction="column">
                    <Typography variant="body1">Dev Mode</Typography>
                    <Stack direction="column" alignItems={"center"}>
                        <ToggleButtonGroup value={developerMode ? true : false} aria-label="test" sx={{ width: "100%" }}>
                            <ToggleButton onClick={handleDeveloperModeChange} value={true} aria-label="dev">
                                dev {developerMode ? <Icon>developer_mode</Icon> : <Icon>developer_mode_outlined</Icon>}
                            </ToggleButton>
                            <ToggleButton onClick={handleDeveloperModeChange} value={false} aria-label="prod">
                                normal
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </Stack>
                </Stack>
            ) : null}


            {import.meta.env.DEV === true || wallet.accounts[0] && wallet.accounts[0].toLowerCase() === "0xaC3283c87A6fF8512Ea3D90812854cdeeBF05117".toLowerCase() ? (

                <Stack sx={{ width: "100%", padding: "15px" }} direction="column">
                    <Typography variant="body1">Test Mode</Typography>
                    <Stack direction="column" alignItems={"center"}>
                        <ToggleButtonGroup value={testMode ? true : false} aria-label="test" sx={{ width: "100%" }}>
                            <ToggleButton onClick={handleTestModeChange} value={true} aria-label="test">
                                Test {testMode ? <Icon>code_outlined</Icon> : <Icon>code_outlined</Icon>}
                            </ToggleButton>
                            <ToggleButton onClick={handleTestModeChange} value={false} aria-label="prod">
                                normal
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </Stack>
                </Stack>
            ) : null}
            

            {import.meta.env.DEV === true || wallet.accounts[0] && wallet.accounts[0].toLowerCase() === "0xaC3283c87A6fF8512Ea3D90812854cdeeBF05117".toLowerCase() ? (

                <Stack sx={{  padding: "15px" }} direction="column">
                    <Typography sx={{marginBottom:'10px'}} variant="body1">Theme Color</Typography>
                    <Stack direction="column" alignItems={'stretch'}>
                        <Box sx={{ paddingBottom:'20px'}}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Colors</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={themeColor}
                                    label="Colors"
                                    onChange={onThemeColorChange}
                                >

                                    {
                                       colors.map((color:any) => {
                                           return <MenuItem key={color.id} sx={{ backgroundColor: color.value, borderRadius: '0px' }} value={color.value}>{color.id}</MenuItem>
                                        })
                                    }
                                  
                                 
                                       
                                </Select>
                                <Button sx={{height:'30px', marginTop:'10px'}} onClick={handleUpdateThemeColor}>Update theme</Button>
                            </FormControl>
                        </Box>
                    </Stack>
                </Stack>
            ) : null}

            <Stack direction="column" sx={{ maxWidth: "100%", padding: "10px" }} justifyContent={"flex-start"} alignItems={"flex-start"} spacing={1}></Stack>
        </div>
    );

    return (
        <Box sx={{ display: "flex" }}>
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <Stack
                        justifyContent="space-between"
                        sx={{
                            border: "red solid 3px" + removeBorder,
                            width: "100%",
                        }}
                        alignItems="flex-start"
                        direction="row"
                        spacing={1}
                    >
                        {!open && (
                            <IconButton
                                // color="inherit"
                                color="primary"
                                aria-label="open drawer"
                                onClick={handleDrawerOpen}
                                edge="start"
                                style={{ marginRight: "10px" }}
                            >
                                <FiberNewTwoToneIcon />
                            </IconButton>
                        )}
                        <Stack direction="row" spacing={1}>
                            <div
                                style={{
                                    border: "blue solid 3px" + removeBorder,
                                }}
                            >
                                <TopRightToolbar
                                    removeBorder={removeBorder}
                                    isLoaded={isLoaded}
                                    searched={searched}
                                    performedSearch={performedSearch}
                                    coinbaseUser={coinbaseUser}
                                    tokenData={tokenData}
                                    coinbaseUserLoggedIn={coinbaseUserLoggedIn}
                                    coinbaseURL={coinbaseURL}
                                    coinbaseAuthURL={coinbaseAuthURL}
                                    coinbaseLogin={coinbaseLogin}
                                    handleBackdropSetting={handleBackdropSetting}
                                    storeToken={storeToken}
                                    coinbaseLogout={coinbaseLogout}
                                    windowWidth={windowWidth}
                                    developerMode={developerMode}
                                    testMode={testMode}
                                    darkMode={darkMode}
                                    handleThemeModeSwitch={handleThemeModeSwitch}
                                />
                            </div>

                            <SettingsChip handleOpenSettingsDrawer={handleOpenSettingsDrawer} />
                        </Stack>
                    </Stack>
                </Toolbar>
                <Divider />
            </AppBar>
            <Hidden mdDown>
                <Drawer
                    sx={{
                        border: "solid green 5px" + removeBorder,
                        display: "block",
                        width: drawerWidth,
                        flexShrink: 0,
                        "& .MuiDrawer-paper": {
                            width: drawerWidth,
                            boxSizing: "border-box",
                        },
                    }}
                    variant="persistent"
                    anchor="left"
                    open={true}
                >
                    {drawer}
                </Drawer>
            </Hidden>
            <Drawer
                sx={{
                    border: "solid yellow 5px" + removeBorder,
                    display: { xs: "block", sm: "block", md: "block" },
                    width: drawerWidth,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: drawerWidth,
                        boxSizing: "border-box",
                    },
                }}
                variant="temporary"
                anchor="left"
                open={open}
            >
                {drawer}
            </Drawer>
            <Drawer
                sx={{
                    border: "solid green 5px" + removeBorder,
                    display: { xs: "block", sm: "block", md: "block" },
                    width: drawerWidth,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: drawerWidth,
                        boxSizing: "border-box",
                    },
                }}
                variant="temporary"
                anchor="right"
                open={showSettingsDrawer}
            >
                {settingsDrawer}
            </Drawer>
            <Main open={open}>
         
                <DrawerHeader />
                <Stack
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="center"
                    spacing={3}
                    sx={{ border: "silver solid 6px" + removeBorder, width: "100%", paddingLeft: { drawerWidth } }}
                >
                    <Stack direction="column" spacing={2} style={{ padding: "0px", paddingRight: "0px", paddingLeft: "0px", border: "pink dashed 15px" + removeBorder, width: "100%", maxWidth: "1300px" }}>
                        <Stack
                            direction={{ sm: "column", md: "row" }}
                            justifyContent="flex-start"
                            alignItems="flex-start"
                            spacing={2}
                            style={{ border: "brown dashed 5px" + removeBorder }}
                            sx={{ minWidth: "100px" }}
                        >
                            {developerMode && (
                            <Stack direction="column" spacing={1} sx={{ border: "orange solid 5px" + removeBorder }}>
                              
                                    <>
                                        <Stack spacing={1} direction="row">
                                            <Button sx={{ maxHeight: "30px", textTransform: "none", fontSize: "15px", whiteSpace: "nowrap" }} onClick={() => console.log("")}>
                                                gt cefi
                                            </Button>
                                            <Button sx={{ maxHeight: "30px", textTransform: "none", fontSize: "15px", whiteSpace: "nowrap" }} onClick={handleGetDefiBalances}>
                                                gt defi
                                            </Button>

                                        </Stack>
                                        <Stack spacing={1} direction={{ xs: "column", sm: "row", md: "row" }}>
                                            <Button
                                                sx={{ maxHeight: "30px", textTransform: "none", fontSize: "15px", whiteSpace: "nowrap" }}
                                                onClick={handleGetBinanceTransactions}
                                            >
                                                gt bn tx
                                            </Button>
                                            <Button sx={{ maxHeight: "30px", textTransform: "none", fontSize: "12px", hiteSpace: "nowrap" }} onClick={handleGetBinanceBalances}>
                                                gt bn ac
                                            </Button>
                                           
                                        </Stack>
                                        <Stack spacing={1} direction="row">
                                            <Button
                                                sx={{ maxHeight: "30px", textTransform: "none", fontSize: "15px", whiteSpace: "nowrap" }}
                                                onClick={handleGetCoinbaseTransactions}
                                            >
                                                gt cb tx
                                            </Button>
                                            <Button sx={{ maxHeight: "30px", textTransform: "none", fontSize: "15px", whiteSpace: "nowrap" }} onClick={handleGetCoinbaseBalances}>
                                                gt cb ac
                                            </Button>
                                           
                                        </Stack>
                                        <Stack spacing={1} direction="row">
                   

                                            <Button sx={{ maxHeight: "30px", textTransform: "none", fontSize: "15px", whiteSpace: "nowrap" }} onClick={handleGetNFTs}>
                                                gt nfts
                                            </Button>
                                        </Stack>
                                       
                                        <Stack direction="row" spacing={1}>
                                            <Button sx={{ maxHeight: "30px", textTransform: "none", fontSize: "15px", whiteSpace: "nowrap" }} onClick={consolidateData}>
                                                consolidateData
                                            </Button>
                                            <Button sx={{ maxHeight: "30px", textTransform: "none", fontSize: "15px", whiteSpace: "nowrap" }} onClick={checkVariables}>
                                                Check Variables
                                            </Button>
                                        </Stack>
                                        <InputBase
                                            id="filled-search-input-coinbase-access-token"
                                            placeholder="Coinbase Access Token"
                                            inputProps={{ "aria-label": "search google maps" }}
                                            value={coinbaseAccessToken}
                                            type="search"
                                            onChange={handleCoinbaseAccessTokenChange}
                                            sx={{
                                                p: "4px 10px 4px 10px",
                                                minWidth: "100%",
                                                border: "1px solid darkgray",
                                                borderRadius: "10px",
                                            }}
                                        />
                                        <Stack spacing={1} direction="row">
                                            <Button sx={{ maxHeight: "30px", textTransform: "none", fontSize: "15px", whiteSpace: "nowrap" }} onClick={handleFindUser}>
                                                find user
                                            </Button>

                                             
                                            <Button sx={{ maxHeight: "30px", textTransform: "none", fontSize: "15px", whiteSpace: "nowrap" }} onClick={handleCreateUser}>
                                                create user
                                            </Button>
                                        </Stack>
                                        <ul>
                                            {selectedPlatforms.map((platform: any) => (
                                                <li key={platform.abbr}>{platform.platform}</li>
                                            ))}
                                        </ul>
                                        windowwidth: {window.innerWidth}
                                    </>
                           
                            </Stack>
                            )}
                            <Stack
                                direction={{ xs: "column", sm: "column", md: "row" }}
                                justifyContent="space-between"
                                alignItems="flex-end"
                                spacing={3}
                                sx={{
                                    border: "blue dotted 5px" + removeBorder, width:'100%',
                                    padding:'10px'
                                     
                                }}
                            
                            >
                                <Stack 
                                    justifyContent="space-between"
                                    alignItems="flex-start"
                                    spacing={3}
                                sx={{
                                    border: "red solid 5px" + removeBorder, width: '100%'

                                }} direction='column'>

                                    <Typography color={'primary'} variant='h4'>NewBalance</Typography>
                                  
                                        <Typography color={'primary'} variant='h2'>Step into Crypto Balance with New Balance</Typography>
                                  
                            
                                    <WalletsCeFi
                            
                                        windowWidth={windowWidth}
                                        coinbaseUser={coinbaseUser}
                                        binanceApiKey={binanceApiKey}
                                        binanceApiSecret={binanceApiSecret}
                                        removeBorder={removeBorder}
                                        handleBinanceApiKeyChange={handleBinanceApiKeyChange}
                                        handleBinanceApiSecretChange={handleBinanceApiSecretChange}
                                        handleBackdropSetting={handleBackdropSetting}
                                        handleGetData={handleGetCeFiData}
                                        coinbaseLogin={coinbaseLogin}
                                        handleShowErrorModalChange={handleShowErrorModalChange}
                                        showErrorModal={showErrorModal}
                                    />
                                </Stack>
                    
                               
                                <WalletsDeFi
                            
                                    windowWidth={windowWidth}
                                    coinbaseUser={coinbaseUser}
                                    removeBorder={removeBorder}
                                    handleBackdropSetting={handleBackdropSetting}
                                    handleGetData={handleGetDeFiData}
                                    coinbaseLogin={coinbaseLogin}
                                    handleShowErrorModalChange={handleShowErrorModalChange}
                                    showErrorModal={showErrorModal}
                                    wallet={wallet}
                                />
                      
                            </Stack>
                            {isLoading && (
                                <Stack direction="column">
                                    <Spinner />
                                    <Typography> Fetching {dataBeingFetched}...</Typography>
                                </Stack>
                            )}
                        </Stack>

                        <Grid
                            container
                            spacing={{ xs: 2, md: 3 }}
                            columns={{ xs: 1, sm: 1, md: 1, lg: 12 }}
                            style={{
                                padding: "0px",
                                border: "black dashed 8px" + removeBorder,
                                paddingLeft: "0px",
                                paddingRight: "0px",
                            }}
                        >
                            <Grid sx={{ maxWidth: "100%", border: "blue solid" +removeBorder }} xs={1} sm={1} md={1} lg={9}>
                                <Stack
                                    direction={{ xs: "column", sm: "column", md: "column", lg: "column", xl: "column" }}
                                    spacing={4}
                                    style={{ border: "lightblue solid 8px" + removeBorder }}
                                >
                                    {/* <ViewTab handleSelectedTabChange={handleSelectedTabChange} selectedTab={selectedTab} /> */}
                                    <FiatTransactions removeBorder={removeBorder} usdTransactions={usdTransactions} />
                                    <Balances removeBorder={removeBorder} balances={balances} />                
                                    <NFTList defiNFTs={defiNFTs} />
                                </Stack>
                            </Grid>

                            <Grid sx={{ maxWidth: "100%" }} xs={1} sm={1} md={1} lg={3}>
                                <Stack sx={{ maxWidth: "100%" }} style={{ border: "orange solid" + removeBorder }}>
                                    <Stats balances={balances} usdTransactions={usdTransactions} reformatDate={reformatDate} removeBorder={removeBorder} />
                                </Stack>
                            </Grid>
                        </Grid>
                    </Stack>
                </Stack>
            </Main>
        </Box>
    );
};

export default Navigation;
