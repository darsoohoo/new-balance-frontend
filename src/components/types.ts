// types.ts
export interface QueryParams {
  filterDate: string;
  walletAddress: string | null;
  apiKey: string | undefined;
  apiSecret: string | undefined;
}
export interface BinanceQueryParams {
  filterDate: string;
  apiKey: string | undefined;
  apiSecret: string | undefined;
}

export interface CoinbaseQueryParams {
  filterDate: string;
}

export interface DefiQueryParams {
  walletAddress: string | null;
}

export interface LocationState {
  userData: string | null;
}

export interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_COINBASE_CLIENT_ID: string;
  readonly VITE_COINBASE_REDIRECT_URL: string;
  readonly VITE_API_ENDPOINT: string;
  // more env variables...
}

export interface ImportMeta {
  readonly env: ImportMetaEnv;
  readonly VITE_COINBASE_CLIENT_ID: string;
  readonly VITE_COINBASE_REDIRECT_URL: string;
  readonly VITE_API_ENDPOINT: string;
}
