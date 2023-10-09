import { useState, useEffect } from "react";

// Custom hook for handling the count state
// 1. Create a function that returns an object with the state and the function to update the state
// 2. Use the useState hook to create the state and the function to update the state
// 3. Return the state and the function to update the state
import { DefiQueryParams } from "../components/types";

interface useDefiDataProps {
    filterDate: string;
    wallet: any;
}

const useDefiData = ( wallet: any) => {


    const [defiTransactions, setDefiTransactions] = useState<any[]>([]);
    const [defiBalances, setDefiBalances] = useState<any[]>([]);
    const [defiNFTs, setDefiNFTs] = useState<any[]>([]);

  
    useEffect(() => {


    }, [ defiTransactions, defiBalances]);

    const getDefiTransactions = async () => {
        console.log("GETTING Transactions placeholder function");
    };


    const getDefiBalances = async (account: string) => {
        console.log("2 GETTING DEFI");

        if (wallet.accounts[0] ==="") {
            const message = "Please connect your defi wallet to view your Defi balances";
            window.alert(message);
        } else {
            try {
                console.log("3 TRYING TO GET DEFIIIII");

                const queryParams: DefiQueryParams = {
                    walletAddress: account
                }
                const queryString = new URLSearchParams(
                    Object.entries(queryParams).reduce((acc, [key, value]) => {
                        acc[key] = String(value);
                        return acc;
                    }, {} as Record<string, string>)
                ).toString();

                const fetchData = async (url: string) => {
                    const response = await fetch(url, {
                        method: "GET",
                        headers: {
                            Accept: "application/json",
                            "content-type": "application/json",
                        },
                    });
                    return response.json();
                };
                const tokenBalances = await fetchData("api/defi/accounts/tokenbalances/crosschain" + "?" + queryString);
                const defiTokenBalances = await tokenBalances.map((item: any) => {
                    return {
                        item,
                        USDValue: item.TokenPrice && item.WalletBalance ? Number(item.TokenPrice) * Number(item.WalletBalance) : 0,
                        TokenPrice: item.TokenPrice ? item.TokenPrice : 0,
                        LogoURI: "",
                        TokenSymbol: item.symbol,
                        TokenName: item.name,
                        TokenAddress: item.token_address,
                        WalletBalance: item.WalletBalance,
                        NetworkName: item.NetworkName ? item.NetworkName : "N/A",
                        ExchangeName: item.ExchangeName ? item.ExchangeName : "N/A",
                        ExchangeAddress: item.ExchangeAddress ? item.ExchangeAddress : "N/A",
                        "24hrPercentChange": item["24hrPercentChange"] ? item["24hrPercentChange"] : "0",
                        Platform: "Defi",
                        PlatformType: "defi",
                        PossibleSpam: item.PossibleSpam ? item.PossibleSpam : false,
                        TableDataType: "balance",
                        AssetType: "token",
                    };
                });

                console.log("4 defiTokenBalances ", defiTokenBalances);
                setDefiBalances(defiTokenBalances);

            } catch (error) {
                console.log("ERROR", error);
            }
        }
    };

    const getNFTs = async (account: string) => {
        console.log("1 GETTING NFTS");
       

        if (account === "") {
            const message = "Please connect your defi wallet to view your NFTs";
            window.alert(message);
        } else {
        try {
            const queryParams: DefiQueryParams = {
                walletAddress: account,
            };
            const queryString = new URLSearchParams(
                Object.entries(queryParams).reduce((acc, [key, value]) => {
                    acc[key] = String(value);
                    return acc;
                }, {} as Record<string, string>)
            ).toString();
            console.log("2 TRY GETTING NFTS");
            // const nftsResponse = await fetch('api/defi/nfts/marketprice' + '?' + queryString, {
            const nftsResponse = await fetch("api/defi/nfts/lowestprice" + "?" + queryString, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            });

            console.log("3 TRY GETTING NFTS - HEADER IS SET");
            const Nfts = await nftsResponse.json();
            const nftData = await Nfts.map((item: any) => {
                return {
                    ...item,
                    amount: item.amount,
                    mediaUrl: item.mediaUrl,
                    block_number: item.block_number,
                    block_number_minted: item.block_number_minted,
                    contract_type: item.contract_type,
                    last_metadata_sync: item.last_metadata_sync,
                    last_token_uri_sync: item.last_token_uri_sync,
                    metadata: item.metadata,
                    minter_address: item.minter_address,
                    nft_name: item.nft_name,
                    owner_of: item.owner_of,
                    possible_spam: item.possible_spam,
                    symbol: item.symbol,
                    token_address: item.token_address,
                    token_hash: item.token_hash,
                    token_id: item.token_id,
                    token_uri: item.token_uri,
                    verified_collection: item.verified_collection,
                    price: item.price,
                    priceValue: item.price ? Number(item.price.amount) / 1e18 : 0,
                    TableDataType: "balance",
                    AssetType: "nft",
                };
            });
            console.log("4 NFT DATA", nftData);
            console.log("Transformed NFT Data:", nftData);
            setDefiNFTs(nftData)
        } catch (error) {
            // Handle errors here
            console.error("Error with yo NFTS:", error);
        }
    }
    };




    //PRICE SCHEMA
    // {
    //     "transaction_hash": "0x057Ec652A4F150f7FF94f089A38008f49a0DF88e",
    //     "transaction_index": "string",
    //     "token_ids": [
    //       "15",
    //       "54"
    //     ],
    //     "seller_address": "0x057Ec652A4F150f7FF94f089A38008f49a0DF88e",
    //     "buyer_address": "0x057Ec652A4F150f7FF94f089A38008f49a0DF88e",
    //     "token_address": "0x4ad3785ec7eed7589fa86538244a4530f962434f",
    //     "marketplace_address": "0x057Ec652A4F150f7FF94f089A38008f49a0DF88e",
    //     "price_token_address": "0x60e4d786628fea6478f785a6d7e704777c86a7c6",
    //     "price": "1000000000000000",
    //     "block_timestamp": "2021-06-04T16:00:15",
    //     "block_number": "13680123",
    //     "block_hash": "0x4a7c916ca4a970358b9df90051008f729685ff05e9724a9dddba32630c37cb96"
    //   }


    return {
        defiTransactions,
        getDefiTransactions,
        defiBalances,
        getDefiBalances,
        defiNFTs,
        getNFTs
        
    };
}
export default useDefiData;
