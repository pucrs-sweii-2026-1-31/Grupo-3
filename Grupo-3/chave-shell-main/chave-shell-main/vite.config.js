import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

// Define a URL do MFE. No Docker, o compose passará essa variável.
const MFE_AUTH_URL = process.env.MFE_AUTH_URL || "http://localhost:4001/remoteEntry.js";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "shell",
      remotes: {
        // O nome 'mfe_auth' deve bater com o 'name' definido no config do front-end
        mfe_auth: MFE_AUTH_URL,
      },
      shared: ["react", "react-dom"],
    }),
  ],
  build: {
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
  server: {
    port: 3000,
    host: true,
  },
  preview: {
    port: 3000,
    host: true,
  },
});