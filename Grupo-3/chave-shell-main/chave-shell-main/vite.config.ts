import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const mfeAuthUrl = env.VITE_MFE_AUTH_URL
    || env.MFE_AUTH_URL
    || process.env.VITE_MFE_AUTH_URL
    || process.env.MFE_AUTH_URL
    || 'http://localhost:4001/remoteEntry.js';

  return {
    plugins: [
      react(),
      federation({
        name: 'shell',
        remotes: {
          mfe_auth: mfeAuthUrl,
        },
        shared: [
          'react',
          'react-dom',
          '@mui/material',
          '@emotion/react',
          '@emotion/styled',
        ]
      }),
    ],
    build: {
      target: 'esnext',
      minify: false,
      cssCodeSplit: false,
    },
  };
});
