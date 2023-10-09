import { useState, useEffect } from "react";

// Custom hook for handling the count state
// 1. Create a function that returns an object with the state and the function to update the state
// 2. Use the useState hook to create the state and the function to update the state
// 3. Return the state and the function to update the state
import { BinanceQueryParams } from "../components/types";

interface useBinanceDataProps {
    filterDate: string;
    binanceApiKey: string | undefined;
    binanceApiSecret: string | undefined;
}

const useBinanceData = (filterDate: string, binanceApiKey: string | undefined, binanceApiSecret: string | undefined) => {


    const [binanceTransactions, setBinanceTransactions] = useState<any[]>([]);
    const [binanceBalances, setBinanceBalances] = useState<any[]>([]);

    useEffect(() => {

    }, [binanceTransactions, binanceBalances]);



    const getBinanceTransactions = async () => {
        const queryParams: BinanceQueryParams = {
            filterDate: filterDate,
            apiKey: binanceApiKey,
            apiSecret: binanceApiSecret,
        };
        const queryString = new URLSearchParams(
            Object.entries(queryParams).reduce((acc, [key, value]) => {
                acc[key] = String(value);
                return acc;
            }, {} as Record<string, string>)
        ).toString();

        try {
            const transactionResponse = await fetch(import.meta.env.VITE_API_ENDPOINT +"/api/cefi/transactions/bin" + "?" + queryString, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
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
            console.log("BINANCE TRANSACTIONS", transactionData);
            setBinanceTransactions(transactionData);
        } catch (error) {
            // Handle the error here
            return { transactionData: [] };
        }
    };


    const getBinanceBalances = async () => {
        const queryParams: BinanceQueryParams = {
            filterDate: filterDate,
            apiKey: binanceApiKey,
            apiSecret: binanceApiSecret,
        };
        const queryString = new URLSearchParams(
            Object.entries(queryParams).reduce((acc, [key, value]) => {
                acc[key] = String(value);
                return acc;
            }, {} as Record<string, string>)
        ).toString();

        try {
            const balancesResponse = await fetch(import.meta.env.VITE_API_ENDPOINT +"/api/cefi/accounts/bin" + "?" + queryString, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
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
            console.log("2. GOT BINANCE ACCOUNTS", balanceData);
            setBinanceBalances(balanceData);
            return balanceData;
        } catch (error) {
            // Handle the error here
            return { balanceData: [] };
        }


    };

    return {
        binanceTransactions,
        getBinanceTransactions,
        binanceBalances,
        getBinanceBalances

    };
}
export default useBinanceData;


/*

            const transactionData = await Transactions.map((item: any) => {
                return {
                    ...item,
                    CreatedAt: item.created_at,
                    Type: item.resource,
                    Platform: item.platform,
                    PlatformType: "cefi",
                    PossibleSpam: false,
                    TableDataType: "transaction",
                    AssetType: "token",
                    TotalAmountCurrency: item.total_amount ? item.total_amount.currency : "",
                    UnitPrice: item.unit_price.amount,
                    TotalAmount: item.total_amount && item.total_amount.amount ? item.total_amount.amount:null,
                    DollarAmount: item.dollar_amount,
                    Fee: item.fee.amount,
                    SubTotalAmount: item.subtotal.amount,


                };
            });

*/