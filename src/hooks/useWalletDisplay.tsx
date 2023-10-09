// This will be replaced with content from the tutorial
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, createContext, PropsWithChildren, useContext, useCallback } from "react";


interface WalletDisplayContextData {
  isShowing: boolean;
  showDisplay: () => void;
  hideDisplay: () => void;
}

const WalletDisplayContext = createContext<WalletDisplayContextData>({} as WalletDisplayContextData);

export const WalletDisplayContextProvider = ({ children }: PropsWithChildren) => {
  const [isShowing, setIsShowing] = useState(true);

  const _updateShowDisplay = useCallback(async (show: boolean) => {
    console.log("updating show display");
    console.log("1 show", show);
    if (show === true) {
      setIsShowing(true);
    } else {
      setIsShowing(false);
    }
  }, []);

  const showDisplay = useCallback(() => _updateShowDisplay(true), [_updateShowDisplay]);
  const hideDisplay = useCallback(() => _updateShowDisplay(false), [_updateShowDisplay]);


  return (
    <WalletDisplayContext.Provider
      value={{
        isShowing,
        showDisplay,
        hideDisplay,
      }}
    >
      {children}
    </WalletDisplayContext.Provider>
  );
};

export const useWalletDisplay = () => {
  const context = useContext(WalletDisplayContext);
  if (context === undefined) {
    throw new Error('useWalletDisplay must be used within a "UseWalletDisplayContextProvider"');
  }
  return context;
};
