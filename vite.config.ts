import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import apiEndpoint from "./src/apiEndpoint";
  
// https://vitejs.dev/config/

export default defineConfig(({ command, mode, ssrBuild }) => {
  if (command === 'serve') {
    return {
      // dev specific config
    server: {
      proxy: {
        "/api": "http://localhost:8000",
      },
    },
    plugins: [react()]


    }
  } else {
    // command === 'build'
    return     {
      server: {
        proxy: {
          "/api": "https://api-newbalancefi.up.railway.app",
        },
      },
      plugins: [react()]
    }
  }
})
  
