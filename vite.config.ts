import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

  
const apiEndpoint = process.env.VITE_API_ENDPOINT || "http://localhost:8000";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": apiEndpoint
    },
  },
  plugins: [react()]
});
