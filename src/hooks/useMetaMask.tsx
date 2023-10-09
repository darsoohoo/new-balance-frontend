// This will be replaced with content from the tutorial
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, createContext, PropsWithChildren, useContext, useCallback } from "react";
import detectEthereumProvider from "@metamask/detect-provider";
import { formatBalance } from "../utils";
import { DefiQueryParams } from "../components/types";
import axios from "axios";


interface WalletState {
  accounts: any[];
  balance: string;
  chainId: string;

}

interface MetaMaskContextData {
  wallet: WalletState;
  hasProvider: boolean | null;
  error: boolean;
  errorMessage: string;
  isConnecting: boolean;
  connectMetaMask: () => void;
  clearError: () => void;
  ens: string | null;
}

const disconnectedState: WalletState = { accounts: [], balance: "", chainId: "" };

const MetaMaskContext = createContext<MetaMaskContextData>({} as MetaMaskContextData);

export const MetaMaskContextProvider = ({ children }: PropsWithChildren) => {

  const [hasProvider, setHasProvider] = useState<boolean | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const clearError = () => setErrorMessage("");
  const [wallet, setWallet] = useState(disconnectedState);
  const [ens, setEns] = useState( localStorage.getItem("ens"));

  // useCallback ensures that you don't uselessly recreate the _updateWallet function on every render
  const _updateWallet = useCallback(async (providedAccounts?: any) => {
    const accounts = providedAccounts || (await window.ethereum.request({ method: "eth_accounts" }));

    if (accounts.length === 0) {
      // If there are no accounts, then the user is disconnected
      localStorage.setItem("walletAddress", accounts[0]);
      setWallet(disconnectedState);
      return;
    }

    const balance = formatBalance(
      await window.ethereum.request({
        method: "eth_getBalance",
        params: [accounts[0], "latest"],
      }),
    );
    const chainId = await window.ethereum.request({
      method: "eth_chainId",
    });


    setWallet({ accounts, balance, chainId });
 
 
    const handleGetEns = async () => {
      try {
         const ensResponse = await getEns().then((response:any) => {
          localStorage.setItem("ens", response);
          localStorage.setItem("walletAddress", wallet.accounts[0]);
          console.log("walletaddress", localStorage.getItem("walletAddress"));
            setEns(response);
  
         })
         
        
         return ensResponse
      } catch (error) {
          console.log("there was an error trying to get defi balances", error);
      }
     
    };
     
    if(wallet.accounts[0] && (ens === null || ens === "")) {
      handleGetEns();
      }


  


    
    
  }, [ens]);

  const updateWalletAndAccounts = useCallback(() => _updateWallet(), [_updateWallet]);
  const updateWallet = useCallback((accounts: any) => _updateWallet(accounts), [_updateWallet]);

  /**
   * This logic checks if MetaMask is installed. If it is, some event handlers are set up
   * to update the wallet state when MetaMask changes. The function returned by useEffect
   * is used as a "cleanup": it removes the event handlers whenever the MetaMaskProvider
   * is unmounted.
   */
  useEffect(() => {
    const getProvider = async () => {
      const provider = await detectEthereumProvider({ silent: true });
      setHasProvider(Boolean(provider));

      if (provider) {
        updateWalletAndAccounts();
        window.ethereum.on("accountsChanged", updateWallet);
        window.ethereum.on("chainChanged", updateWalletAndAccounts);
      }
    };

    getProvider();

  
    return () => {
      window.ethereum?.removeListener("accountsChanged", updateWallet);
      window.ethereum?.removeListener("chainChanged", updateWalletAndAccounts);
    };

  }, [updateWallet, updateWalletAndAccounts]);

  const connectMetaMask = async () => {
    setIsConnecting(true);

    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      clearError();
      updateWallet(accounts);
    } catch (err: any) {
      setErrorMessage(err.message);
    }
    setIsConnecting(false);
  };

  const getEns = async () => {
    if(wallet.accounts[0] === undefined) {
      return
    }
    try {
      const queryParams: DefiQueryParams = {
        walletAddress: wallet.accounts[0],
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
      const ensResponse = await fetchData("api/defi/accounts/ens?" + queryString).then((response: any) => {
       return response.name
      })
    
     
return await ensResponse

    } catch (err: any) {
      setErrorMessage(err.message);
    }

   }

  const handleFindUser = async () => {
    console.log("GETTING USER");
    const options ={
      method: "GET",
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
      },
      data: {
        metamask_address: wallet.accounts[0]
      }
    }
  
    try {
      await fetch("/api/users/find",  options)
        .then((response) => {
          console.log("Does user exist?", response);
        })
    } catch (error) {
      console.log("there was an error trying to get user data", error);
    }
  }

  const handleCreateUser = async () => {
    console.log("GETTING USER");
    const options = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
      },
      data: {
        metamask_address: wallet.accounts[0]
      }
    }
    try {
      await fetch("/api/users/find", options)
        .then((response) => {
          console.log("Does user exist?", response);
        })
    } catch (error) {
      console.log("there was an error trying to get user data", error);
    }
  }

  return (
    <MetaMaskContext.Provider
      value={{
        wallet,
        hasProvider,
        error: !!errorMessage,
        errorMessage,
        isConnecting,
        connectMetaMask,
        clearError,
     
        ens
      }}
    >
      {children}
    </MetaMaskContext.Provider>
  );
};

export const useMetaMask = () => {
  const context = useContext(MetaMaskContext);
  if (context === undefined) {
    throw new Error('useMetaMask must be used within a "MetaMaskContextProvider"');
  }
  return context;
};
