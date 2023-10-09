import { useState, useEffect } from "react";

// Custom hook for handling the count state
// 1. Create a function that returns an object with the state and the function to update the state
// 2. Use the useState hook to create the state and the function to update the state
// 3. Return the state and the function to update the state
import { CoinbaseQueryParams } from "../components/types";

interface useCoinbaseDataProps {
    filterDate: string;
}

const useCoinbaseData = (filterDate:string, coinbaseAccessToken: string | undefined) => {


    const [coinbaseTransactions, setCoinbaseTransactions] = useState<any[]>([]);
    const [coinbaseBalances, setCoinbaseBalances] = useState<any[]>([]);
  
    useEffect(() => {

    }, [ coinbaseTransactions, coinbaseBalances]);

 

    const getCoinbaseTransactions = async () => {
        const queryParams: CoinbaseQueryParams = {
            filterDate: filterDate
        };
        const queryString = new URLSearchParams(
            Object.entries(queryParams).reduce((acc, [key, value]) => {
                acc[key] = String(value);
                return acc;
            }, {} as Record<string, string>)
        ).toString();

        try {
            const transactionResponse = await fetch("api/cefi/transactions/cb" + "?" + queryString, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    access_token: coinbaseAccessToken ? coinbaseAccessToken : "",
                },
            });
            const Transactions = await transactionResponse.json();
            const transactionData = await Transactions.map((item: any) => {
                return {
                    ...item,
                    Platform: item.platform,
                    PlatformType: "cefi",
                    PossibleSpam: false,
                    TableDataType: "transaction",
                    AssetType: "token",
                };
            });
            console.log("coinbase TRANSACTIONS", transactionData);
            setCoinbaseTransactions(transactionData);
        } catch (error) {
            // Handle the error here
            return { transactionData: [] };
        }
    };


    const getCoinbaseBalances = async () => {
        const queryParams: CoinbaseQueryParams = {
            filterDate: filterDate
        };
        const queryString = new URLSearchParams(
            Object.entries(queryParams).reduce((acc, [key, value]) => {
                acc[key] = String(value);
                return acc;
            }, {} as Record<string, string>)
        ).toString();

        try {
            const balancesResponse = await fetch("api/cefi/accounts/cb" + "?" + queryString, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    access_token: coinbaseAccessToken ? coinbaseAccessToken : "",
                },
            });
            const Balances = await balancesResponse.json();
            const balanceData = await Balances.map((item: any) => {
                return {
                    item,
                    USDValue: item.price && item.balance ? Number(item.price) * Number(item.balance) : 0,
                    TokenPrice: item.price === undefined ? 0 : Number(item.price),
                    LogoURI: item.logoURI,
                    TokenSymbol: item.currency,
                    Platform: item.platform.charAt(0) + item.platform.slice(1),
                    PlatformType: "cefi",
                    TokenName: item.name,
                    TokenAddress: item.token_address,
                    WalletBalance: item.balance ? Number(item.balance) : 0,
                    NetworkName: item.NetworkName,
                    PossibleSpam: false,
                    TableDataType: "balance",
                };
            });
            console.log("2. GOT Coinbase ACCOUNTS", balanceData); 
            setCoinbaseBalances(balanceData);
            return balanceData;
        } catch (error) {
            // Handle the error here
            return { balanceData: [] };
        }

        
    };

    return {
        coinbaseTransactions,
        getCoinbaseTransactions,
        coinbaseBalances,
        getCoinbaseBalances
        
    };
}
export default useCoinbaseData;
