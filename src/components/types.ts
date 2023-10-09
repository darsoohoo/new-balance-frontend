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
