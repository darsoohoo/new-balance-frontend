import { defineConfig, loadEnv } from 'vite'
import react from "@vitejs/plugin-react";

  
// https://vitejs.dev/config/
// export default defineConfig( ({ command, mode }) => {
//   // Load env file based on `mode` in the current working directory.
//   // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
//   const env = loadEnv(mode, process.cwd(), '')
//   console.log("command -", command)
//   console.log("mode -", mode)
// console.log("env.VITE_API_ENDPOINT", env.VITE_API_ENDPOINT)

//   return {
//           server: {
//             proxy: {
//               "/api": env.VITE_API_ENDPOINT,
//             },
//           },
//           plugins: [react()],
//           define: {
//             __APP_ENV__: JSON.stringify(env.APP_ENV),
//           },
//     }
// });
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": "https://api-newbalancefi.up.railway.app",
    },
  },
  plugins: [react()]
});