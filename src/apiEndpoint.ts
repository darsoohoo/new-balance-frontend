/// <reference types="vite/client" />

interface Window {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ethereum: any;
}

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_COINBASE_CLIENT_ID: string;
  readonly VITE_COINBASE_REDIRECT_URL: string;
  readonly VITE_API_ENDPOINT: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
  readonly VITE_COINBASE_CLIENT_ID: string;
  readonly VITE_COINBASE_REDIRECT_URL: string;
}

const apiEndpoint: any = {
  value: import.meta.env.VITE_API_ENDPOINT,
  

}
export default apiEndpoint;
