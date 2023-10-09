import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Divider from "@mui/material/Divider";
import MuiGrid from "@mui/material/Grid";
import { Stack } from "@mui/material";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

interface InfoCardProps {
  Title: string;
  Name: string;
  Logo: string;
  Amount: string;
  BuyTransactions: any;
  fromDate: Date;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const InfoCard: React.FC<InfoCardProps> = ({ Title, Name, Logo, Amount, BuyTransactions, fromDate }) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ width: "100%", borderBottom: "solid darkgray 0.8px", boxShadow: "none", marginBottom: "10px" }} elevation={0}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            <img alt="crypto" src={Logo} />
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={Title}
        subheader={Amount}
      />

      <CardContent>
        <Typography variant="body2" color="text.secondary">
          You've made {BuyTransactions.length} purchase(s) of {Name} since {fromDate}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore expand={expanded} onClick={handleExpandClick} aria-expanded={expanded} aria-label="show more">
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography variant="body1" color="text.primary" paragraph>
            Purchases:
          </Typography>
          {BuyTransactions.map((transaction: any, index: number) => {
            if (transaction.payout_at >= fromDate) {
              return (
                <Typography key={transaction.id} color="text.secondary" style={{ marginTop: "10px" }} variant="body2">
                  <Stack direction="column" spacing={2}>
                    <Stack direction="row" spacing={15}>
                      <div>
                        <b>
                          {" "}
                          {transaction.amount.amount} {Title}
                        </b>{" "}
                        for <b> @ ${transaction.unit_price.amount}</b>{" "}
                      </div>
                      <div>
                        <b>Fee:</b> ${transaction.fee.amount} <b>Subtotal:</b> ${transaction.subtotal.amount} <b>Total: </b>${transaction.total.amount}
                      </div>
                    </Stack>
                    <Stack direction="row" spacing={5}>
                      <div>
                        {" "}
                        <b>Payment method:</b> {transaction.payment_method ? transaction.payment_method.name : null}{" "}
                      </div>
                      <div>
                        <b>Date:</b> {transaction.payout_at}
                      </div>
                    </Stack>

                    {index !== BuyTransactions.length - 1 ? <Divider orientation="horizontal" flexItem /> : null}
                  </Stack>
                </Typography>
              );
            }
          })}
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default InfoCard;
