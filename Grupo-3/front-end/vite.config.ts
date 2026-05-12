import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'mfe_auth',
      filename: 'remoteEntry.js',
      exposes: {
        './LoginPage': './src/pages/LoginPage.tsx',
        './RegisterForm': './src/pages/RegisterPage.tsx',
        './AuthContract': './src/federation/authContract.ts',
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
    assetsDir: '',
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
});
