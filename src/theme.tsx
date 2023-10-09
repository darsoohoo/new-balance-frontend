import { createTheme, alpha } from "@mui/material/styles";


const getTheme = (darkMode: boolean, themeColor:any) => {
const selectedColor = themeColor;
    return createTheme({
        //... rest of your theme configuration based on darkMode
        palette: {
            mode: darkMode ? "dark" : "light",
            primary: {
                main: darkMode ? selectedColor : selectedColor,
            },
            secondary: {
                main: "#371758",
            },
            text: {
                primary: darkMode ? selectedColor : selectedColor,
                secondary: darkMode ? selectedColor : selectedColor,
            },
            background: {
                default: darkMode ? "#0C1013" : "#F7F7F8",
                paper: darkMode ? "#181C1F" : "#FFFFFF",
            },
        },
        typography: {
            fontFamily: "Nunito, sans-serif", // Your custom font
            // ... other typography options
            h1: {
                color: darkMode ? "white" : "#263238",
                fontFamily: "Nunito, sans-serif", // Your custom font
                fontWeight: "bold",
            },
            h2: {
                fontSize: "25px", // Customize the font size for h2
                color: darkMode ? "white" : "#263238",
                fontFamily: "Nunito, sans-serif", // Your custom font
                fontWeight: "bold",
            },
            h3: {
                fontFamily: "Nunito, sans-serif", // Your custom font
                fontSize: "22px", // Customize the font size for h2
                color: darkMode ? selectedColor : selectedColor,
                fontWeight: "bold",
            },
            h4: {
                fontFamily: "Nunito, sans-serif", // Your custom font
                fontSize: "20px", // Customize the font size for h2
                color: darkMode ? "white" : "rgb(0, 34, 55)",
                fontWeight: "ExtraBold",
            },
            h5: {
                fontFamily: "Nunito, sans-serif", // Your custom font
                fontSize: "18px", // Customize the font size for h2
                color: darkMode ? "white" : "rgb(0, 34, 55)",
                fontWeight: "bolder",
            },
            h6: {
                fontSize: "16px", // Customize the font size for h2
                color: darkMode ? "white" : "#263238",
                fontFamily: "Nunito, sans-serif",
                fontWeight: "normal",
            },
            subtitle1: {
                // FOR TABLE COLUMN HEADERS
                fontSize: "15px", // Customize the font size for h2
                fontWeight: "bolder", // Set font weight
                fontFamily: "Nunito, sans-serif", // Your custom font
                color: darkMode ? "#C7D2DA" : "#4B5871",
            },

            body1: {
                fontSize: "14px",
                fontWeight: "normal", // Set font weight
                fontFamily: "Nunito, sans-serif", // Your custom font
                color: darkMode ? "#C7D2DA" : "#4B5871",
            },
            body2: {
                fontSize: "14px",
                fontWeight: "bold", // Set font weight
                fontFamily: "Nunito, sans-serif", // Your custom font
                color: darkMode ? "#C7D2DA" : "#4B5871",

            },
        },
        components: {
            MuiAppBar: {
                styleOverrides: {
                    root: {
                        backgroundColor: darkMode ? "#0C1013" : "#F7F7F8", // Set the background color to transpar

                        boxShadow: "none", // Remove the box shadow
                        borderRadius: "0",
                    },
                },
            },
            MuiButton: {
                styleOverrides: {
                    root: {
                        width: "100%",
                        border: 1,
                        borderRadius: "10px",
                        boxShadow: "none",
                        height: "50px",
                        padding: "7px 30px",
                        textTransform: "none",
                        disableElevation: true,
                        fontFamily: "Nunito, sans-serif", // Your custom font
                        size: "small",
                        minWidth: "50px",
                        backgroundColor: darkMode ? "#1F2328" : "#D7DCE5", // Set the background color to transparent
                        "&:hover": {
                            backgroundColor: darkMode ? alpha("#1F2328", 0.5) : alpha("#D7DCE5", 0.5), // Set the background color on hover
                        },
                    },
                },
            },
            MuiButtonBase: {
                styleOverrides: {
                    root: {
                        padding: "7px",
                        fontFamily: "Nunito, sans-serif", // Your custom font
                        width: "100%",
                        height: "55px",
                        borderRadius: "7px",
                        backgroundColor: darkMode ? "#0C1013" : "#FFF", // Set the background color to transparent
                        "&:hover": {
                            backgroundColor: darkMode ? alpha("#1F2328", 0.5) : alpha("#D7DCE5", 0.5), // Set the background color on hover
                        },
                    },
                },
            },
            MuiCardActionArea: {
                styleOverrides: {
                    root: {
                        padding: '0px',
                        fontFamily: "Nunito, sans-serif", // Your custom font
                        
                        backgroundColor: darkMode ? "#0C1013" : "#FFF", // Set the background color to transparent
                        "&:hover": {
                            backgroundColor: darkMode ? alpha("#1F2328", 0.5) : alpha("#D7DCE5", 0.5), // Set the background color on hover
                        },
                    },
                },
            },

            MuiTableCell: {
                styleOverrides: {
                    root: {
                        fontSize: "0.8rem", // Customize the font size for h2
                        color: darkMode ? "white" : "#4B5871",
                        fontFamily: "Nunito, sans-serif", // Your custom font
                    },
                    head: {
                        fontSize: "0.9rem", // Customize the font size for h2
                        color: darkMode ? "white" : "#4B5871",
                        fontWeight: "bolder", // Customize the font weight for header cells
                        whiteSpace: "nowrap",
                        fontFamily: "Nunito, sans-serif", // Your custom font
                    },
                    body: {
                        fontSize: "0.8rem", // Customize the font size for h2
                        color: darkMode ? "white" : "#4B5871",
                        fontWeight: "bold", // Customize the font weight for body cells
                        fontFamily: "Nunito, sans-serif", // Your custom font
                    },
                },
            },
            MuiChip: {
                styleOverrides: {
                    root: {
                        variant: "filled",
                        borderRadius: "10px",
                        backgroundColor: darkMode ? "#1F2328" : "#D7DCE5",
                        height: "40px",
                        width: "40px",
                        fontFamily: "Nunito, sans-serif", // Your custom font
                        "& .MuiChip-icon": {
                            marginLeft: "50%",
                        },
                        "& .MuiChip-avatar": {
                            marginLeft: "50%",
                        },
                    },
                },
            },

            MuiPaper: {
                styleOverrides: {
                    root: {
                        border: "0px",
                        borderRadius: "10px",
                        fontFamily: "Nunito, sans-serif", // Your custom font
                        elevation: darkMode ? 0:0,
                    },
                },
            },

            MuiToolbar: {
                styleOverrides: {
                    root: {
                        border: "none",
                        borderRadius: "0",
                        width: "100%",
                        backgroundColor: darkMode ? "#0C1013" : "#F7F7F8",
                        fontFamily: "Nunito, sans-serif", // Your custom font
                    },
                },
            },
            MuiIconButton: {
                styleOverrides: {
                    root: {
                        width: "40px",
                        fontFamily: "Nunito, sans-serif", // Your custom font
                        height: "40px",
                    },
                },
            },
            MuiListItemIcon: {
                styleOverrides: {
                    root: {
                        color: darkMode ? "white" : "rgb(0, 34, 55)",
                        fontFamily: "Nunito, sans-serif", // Your custom font
                    },
                },
            },
            MuiInputBase: {
                styleOverrides: {
                    root: {
                        backgroundColor: darkMode ? "#1F2328" : "#D7DCE5",
                        color: darkMode ? "white" : "rgb(0, 34, 55)",
                        fontFamily: "Nunito, sans-serif", // Your custom font
                        borderRadius: "10px",
                        padding: "5px",
                        paddingLeft: "10px",
                        width: "100%",
                        
                    },
                },
            },

            MuiDrawer: {
                styleOverrides: {
                    root: {
                        border: "none",
                        borderRadius: "0",
                        fontFamily: "Nunito, sans-serif", // Your custom font
                        borderColor: darkMode ? "#0C1013" : "#F7F7F8",
                        backgroundColor: darkMode ? "#0C1013" : "#F7F7F8",
                        "& .MuiDrawer-paper": {
                            backgroundColor: darkMode ? "#0C1013" : "#F7F7F8",
                            border: "none",
                            borderRadius: "0",
                        },
                    },
                },
            },
            MuiSelect: {
                styleOverrides: {
                    root: {
        
                        backgroundColor: darkMode ? "black" : "white",
                    },
                },
            },
            MuiMenu: {
                styleOverrides: {
                    root: {
                        color: darkMode ? "#0C1013" : "#D7DCE5",
                        fontFamily: "Nunito, sans-serif", // Your custom font
                    },
                },
            },
            MuiTabs: {
                styleOverrides: {
                    root: {
                        width:"100%",
                        fontFamily: "Nunito, sans-serif", // Your custom font
                        flexGrow: 1,
                    },
                },
            },
            MuiTab: {
                styleOverrides: {
                    root: {
                        width:"100%",
                        fontFamily: "Nunito, sans-serif", // Your custom font
                    },
                },
            },
            MuiMenuItem: {
                styleOverrides: {
                    root: {
                        border: "none",
                        height: "55px",
                        width: "375px",
                        fontFamily: "Nunito, sans-serif", // Your custom font
                        backgroundColor: darkMode ? "#0C1013" : "white",
                        // color: darkMode ? "#1F2328" : "#D7DCE5",
                        color: darkMode ? "white" : "rgb(0, 34, 55)",
                        

                        paddingRight: "10px",
                        paddingLeft: "10px",
                        "&:hover": {
                            backgroundColor: darkMode ? "#0C1013" : "white",
                        },
                    },
                },
            },
            MuiList: {
                styleOverrides: {
                    root: {
                        backgroundColor: darkMode ? "#0C1013" : "#F7F7F8",
                    },
                },
            },
            MuiListItem: {
                styleOverrides: {
                    root: {
                        border: "none",
                        backgroundColor: darkMode ? "#0C1013" : "#F7F7F8",
                        borderRadius: "0",
                        fontFamily: "Nunito, sans-serif", // Your custom font
                        paddingRight: "10px",
                        paddingLeft: "10px",
                    },
                },
            },
            MuiListItemButton: {
                styleOverrides: {
                    root: {
                        border: "none",
                        backgroundColor: darkMode ? "#0C1013" : "#F7F7F8",
                        fontFamily: "Nunito, sans-serif", // Your custom font
                        borderRadius: "7px",
                        paddingRight: "10px",
                        paddingLeft: "10px",
                        "&:hover": {
                            backgroundColor: darkMode ? "#32383D" : "#D7DCE5",
                            variant: "filled",
                        },
                    },
                },
            },
        },
        // ... other theme configurations
    });
}

export default getTheme;
