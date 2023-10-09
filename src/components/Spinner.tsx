import * as React from "react";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import "../../src/App.css";
import Typography from "@mui/material/Typography";

export default function CircularColor() {
  return (
    <Stack className="spinner-container" style={{ paddingTop: "20px" }} sx={{ color: "gray.700" }} spacing={1} direction="column">
      <Typography variant="subtitle2">Sorry... this usually takes a little while...😞</Typography>
      {/* {process.env.NODE_ENV === 'development' ? <a href='http:localhost:8000'></a>:  <a href='https://crypto-tracker-fullstack.up.railway.app/'></a>}
<br></br>
                       {process.env.REACT_APP_NODE_ENV === 'development' ? <a href='http:localhost:8000'></a>:  <a href='https://crypto-tracker-fullstack.up.railway.app/'></a>} */}

      <CircularProgress sx={{ marginTop: "30px" }} color="secondary" />
    </Stack>
  );
}
