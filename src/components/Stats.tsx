import * as React from "react";
import MuiGrid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import ComponentBox from "./ComponentBox";

export interface StatsProps {
  balances: any;
 usdTransactions: any;
  reformatDate: any;


  // networth: number;
  removeBorder: string;
}

const Grid = styled(MuiGrid)(({ theme }) => ({
  width: "100%",
  ...theme.typography.body2,
  '& [role="separator"]': {
    margin: theme.spacing(0, 2),
  },
}));

const Stats: React.FC<StatsProps> = ({
  balances,
  usdTransactions,
  reformatDate,

  // networth,
  removeBorder,
}) => {

  const formatNumberWithVariableDecimals = (number: number) => {
    const decimals = (number.toString().split(".")[1] || "").length;
    return decimals > 0 ? number.toFixed(decimals) : number.toString();
  };
  const TOKENBALANCES = balances.filter((token: any) => {
    if (token.USDValue > 0 && typeof token.USDValue === "number" && false === token.PossibleSpam) {
      return token;
    }
  });
  let amountBought: number = 0;
  let amountDeposited: number = 0;
  let amountWithdrawn: number = 0;
  let amountInvested: number = 0;
  let totalAssetValue: number = 0;


  const networth = TOKENBALANCES.reduce((acc: any, item: any) => acc + (item["USDValue"] || 0), 0);
  usdTransactions.forEach((transaction: any) => {
    // console.log("transaction", transaction)

    if (transaction.resource === "buy") {
      amountBought = amountBought + Number(transaction.total.amount);
    }

    if (transaction.resource === "deposit") {
      amountDeposited += Number(transaction.dollar_amount);
    }

    if (transaction.resource === "withdrawal") {
      amountWithdrawn += Number(transaction.dollar_amount);
    }
  });

  // AGGREGATE CEFI BALANCES
  balances
    .filter((item: any) => item.PlatformType === "cefi")
    .forEach((token: any) => {
      if (token.USDValue > 0 && typeof token.USDValue === "number") {
        totalAssetValue += token.USDValue;
      }
    });
  // AGGREGATE DEFI BALANCES
  balances
    .filter((item: any) => item.PlatformType === "defi")
    .forEach((token: any) => {
      if (token.PossibleSpam !== true && token.USDValue > 0 && typeof token.USDValue === "number") {
        totalAssetValue += Number(token.USDValue);
      }
    });
  amountInvested = amountBought + amountDeposited - amountWithdrawn;
  return (
    <ComponentBox>
      <Grid style={{ paddingLeft: "5px" }}>
        <Paper style={{ padding: "0px", height: "80px" }} variant="outlined">
          <Stack direction="column">
            <Typography variant="h6">Networth </Typography>
            <Typography variant="h5">
              <b>${networth.toFixed(2)}</b>
            </Typography>
          </Stack>
        </Paper>
        <span>
          
            <Typography variant="body1">
              <b>Amount Invested </b> equal to the amount of money you invested in the crypto market. This is the total amount of money you put in.
            </Typography>
          
          <Divider>
            <div style={{ textAlign: "center", paddingTop:'10px', paddingBottom:'10px' }}>
              <Typography variant="subtitle1">$ {amountInvested.toFixed(2)}</Typography>
            </div>
          </Divider>
        </span>

        <span>
          
            <Typography variant="body1">
              {" "}
              <b>Amount Bought</b> is equal to the amount of crypto you have purchased via bank transfer, credit card, or debit card.
            </Typography>
          
          <Divider>
            {" "}
            <div style={{ textAlign: "center", paddingTop:'10px', paddingBottom:'10px' }}>
              <Typography variant="subtitle1">$ {amountBought.toFixed(2)}</Typography>
              </div>
          </Divider>
        </span>
        <span>
          
            <Typography variant="body1">
              {" "}
              <b>Amount Deposited</b> is equal to the amount of money you have deposited into your USD wallet via bank transfer, credit card, or debit card.
            </Typography>
          
          <Divider>
            {" "}
            <div style={{ textAlign: "center", paddingTop:'10px', paddingBottom:'10px' }}>
              <Typography variant="subtitle1"> ${amountDeposited.toFixed(2)}</Typography>
              </div>
          </Divider>
        </span>
        <span>
          
            <Typography variant="body1">
              {" "}
              <b>Amount Withdrawn</b> is equal to the amount of money you have withdrawn from your USD wallet and back into your bank.
            </Typography>
          
          <Divider>
            {" "}
            <div style={{ textAlign: "center", paddingTop:'10px', paddingBottom:'10px' }}>
              <Typography variant="subtitle1">${amountWithdrawn.toFixed(2)}</Typography>
              </div>
          </Divider>
        </span>
        <div style={{ marginLeft: "auto", fontSize: "14px", color: "gray" }}>
          You put $<b>{amountInvested.toFixed(2)}</b> of cash into crypto <b></b>
        </div>
      </Grid>
    </ComponentBox>
  );
};

export default Stats;
