/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Essencial para o Material UI v6 funcionar com o Next.js 15
  transpilePackages: ['@mui/material', '@emotion/react', '@emotion/styled'],
};

module.exports = nextConfig;