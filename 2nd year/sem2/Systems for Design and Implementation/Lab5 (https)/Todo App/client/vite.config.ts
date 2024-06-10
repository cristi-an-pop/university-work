import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "fs";
import https from "https";

const cert = fs.readFileSync("./cert/localhost.crt");
const key = fs.readFileSync("./cert/localhost.decrypted.key");

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    https: {
      key,
      cert,
    },
  },
});
