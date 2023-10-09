import * as React from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import Typography from "@mui/material/Typography";
import ComponentBox from "./ComponentBox";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
interface NFTListProps {
    defiNFTs: any;
}

const NFTList: React.FC<NFTListProps> = ({ defiNFTs }) => {
    return (
   <>
    <Stack direction="row" sx={{ width: "100%", height:'100%', paddingTop:'10px', paddingBottom:'10px', pl:3 }}>
                <Typography variant="h5">NFTs</Typography>
            </Stack>
            <Grid
                container
                spacing={1}
                columns={{ xs: 1, sm: 3, md: 4 }}
                sx={{

                     maxHeight: "750px", // Set your desired height here

                     overflowY: "auto", // Enable vertical scrolling
                    width: "100%",
                    pl:1,
                    pr:1,
            

                }}
            >
                {defiNFTs.map((NFT: any) => (
                    <Grid key={NFT.id} xs={1} sm={1} md={1} sx={{ mt:1, mb:1, mr:3, ml:3 }}>
                        <Card sx={{ width: "110%", minHeight:"220px"}}>
                            <CardActionArea>
                                <CardMedia component="img" width="100%" height="100px" image={NFT.mediaUrl} alt={NFT.symbol? NFT.symbol : "undefined"}/>
                                <CardContent>
                                    <Typography   variant="subtitle1" component="div">
                                           { NFT.network ?  NFT.network : "undefined"}
                                
                                    </Typography>
                                    <Typography variant="body2" color="text.primary">
                                        {NFT.symbol ? NFT.symbol : "undefined"}

                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
   
   
   </>
           

    );
};

export default NFTList;
