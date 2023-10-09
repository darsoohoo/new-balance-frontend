import { defineConfig, loadEnv } from 'vite'
import react from "@vitejs/plugin-react";

  
// https://vitejs.dev/config/
export default defineConfig( ({ command, mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '')
  console.log("env issssssssssssssssss ", env)
  return {
          server: {
            proxy: {
              "/api": env.VITE_API_ENDPOINT,
            },
          },
          plugins: [react()]
    }
});
