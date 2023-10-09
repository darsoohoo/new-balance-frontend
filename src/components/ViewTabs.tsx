import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

export interface TabProps {
  handleSelectedTabChange: (newValue: string) => void;
  selectedTab: string;
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const ViewTab: React.FC<TabProps> = ({ handleSelectedTabChange }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    const tabs = ["Overview","Portfolio", "NFTs"];
    handleSelectedTabChange(tabs[newValue]);
  };

  return (
    <Stack direction="row" sx={{ width: '100%'}}>
      <Tabs variant="fullWidth"
        sx={{ flexGrow: 1 }} // Set flexGrow to 1 to make tabs stretch
        role="tabs"
        value={value}
        onChange={handleChange}
        aria-label="basic tabs example"
      >
        <Tab label="Overview" {...a11yProps(0)} />
        <Tab label="Porfolio" {...a11yProps(1)} />
        <Tab label="NFTs" {...a11yProps(2)} />
       
      </Tabs>
    </Stack>
  );
};

export default ViewTab;
